import { defineStore } from 'pinia'
import { io } from "socket.io-client";
import chat from '@/services/chat';
const baseUrl = import.meta.env.VITE_WS_API_URL;

import emitter from '@/utils/emitter';

export const useChatStore = defineStore('chat', {
  state: () => ({
    list: [],
    chat: {},
    messages: [],
    events: [],
    agent: {
      status: 'idle',
      message: ''
    },
    conversationId: null,
    socket: null,
    baseUrl: baseUrl,
    commands: []
  }),
  actions: {
    async init() {
      const res = await chat.list()
      this.list = res.results || [];
    },
    initConversation(conversationId) {
      // Close existing socket if it exists
      if (this.socket) {
        this.socket.close();
      }

      this.messages = [];
      this.conversationId = conversationId;
      this.chat.conversationId = conversationId;
      const baseUrl = import.meta.env.VITE_WS_API_URL || 'ws://localhost:3000';
      console.log('initConversation', conversationId);
      this.socket = io(baseUrl, {
        path: '/socket.io/',
        transports: ['websocket'],
        query: {
          latest_event_id: -1,
          conversation_id: conversationId,
          EIO: 4,
          transport: 'websocket'
        }
      });

      this.socket.on('oh_event', (data) => {
        // console.log('oh_event', data);
        const { source, message, action, observation } = data;
        if (source === 'environment') {
          this.handleEnvironmentEvent(data);
          return;
        }
        if (action === 'recall') {
          // 过滤不显示的信息
          return;
        }
        if (observation && observation === 'agent_state_changed') {
          return;
        }
        if (source === 'user' && action === 'run') {
          // 命令执行
          const value = {
            type: 'command',
            content: data.args.command,
          }
          emitter.emit('terminal', value);
          this.commands.push(value);
          return;
        }
        if (source === 'user' && observation) {
          if (observation == 'run') {
            const value = {
              type: 'observation',
              content: data.content
            }
            emitter.emit('terminal', value);
            this.commands.push(value);
          }
          return;
        }
        this.events.push(data);
        if (source === 'user' || source === 'agent') {
          Object.assign(data, {
            role: source,
          });
          this.messages.push(data);
          this.onMessageEvent(data);
        }
      });
    },
    onMessageEvent(data) {
      // this.socket.emit('oh_event', data);
      const { source, message } = data;
      console.log('onMessageEvent', data);
    },
    handleEnvironmentEvent(data) {
      const { source, message, action, args = {} } = data;
      if (action === 'change_agent_state') {
        const { agent_state } = args;
        console.log('agent.args', args, message);
        this.agent.status = agent_state;
        this.agent.message = message;
      }
    },
    // 创建新会话
    async createConversation(conversationId) {
      const result = await chat.create(conversationId);
      return result;
    },
    // 发送消息
    sendMessage(message) {
      const actionOptions = {
        action: "message",
        args: {
          content: message,
          image_urls: [],
          timestamp: new Date().toISOString()
        }
      }
      console.log('sendMessage', actionOptions);
      this.socket.emit('oh_user_action', actionOptions);
    },
    async removeConversation(conversationId) {
      if (this.socket) {
        this.socket.close();
      }
      const result = await chat.remove(conversationId);
      let index = this.list.findIndex(item => item.conversation_id === conversationId);
      if (index !== -1) {
        this.list.splice(index, 1);
      }
      return result;
    }
  },
  persist: true,
})
