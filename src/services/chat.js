import http from "@/utils/http.js";

const service = {
  async list() {
    const uri = "/api/conversations";
    const res = await http.get(uri);
    return res.data || {};
  },
  async create(message) {
    const uri = "/api/conversations";
    const response = await http.post(uri, {
      initial_user_msg: message,
      image_urls: []
    });
    return response.data || {};
  },
  async get(conversationId) {
    const uri = `/api/conversations/${conversationId}`;
    const response = await http.get(uri);
    return response.data || {};
  },
  async remove(conversationId) {
    const uri = `/api/conversations/${conversationId}`;
    const response = await http.del(uri);
    return response.data || {};
  }
}

export default service;