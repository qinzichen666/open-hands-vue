<template>
  <div ref="terminalRef" class="terminal-container"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Terminal } from '@xterm/xterm'
import '@xterm/xterm/css/xterm.css'

const terminalRef = ref(null)
let terminal = null
let currentLine = ''
let commandHistory = []
let historyIndex = -1

// 从 localStorage 加载历史记录
const loadHistory = async () => {
  try {
    // 从服务器获取历史记录
    const history = [{
      command: "ls",
      response: "2048.html       gomoku.html     hello.sh        resume.html     snake.html      time_server.py"
    }, {
      command: "pwd",
      response: "/Users/gy/Language/LLM/OpenHands/workspace"
    }];

    // 渲染历史记录到终端
    history.forEach(record => {
      terminal.writeln(`$ ${record.command}`)
      terminal.writeln(record.response)
    })

    // 更新本地历史记录
    commandHistory = history.map(record => record.command)
    historyIndex = commandHistory.length

    // 显示新的命令提示符
    terminal.write('$ ')
  } catch (error) {
    console.error('Failed to load history:', error)
    terminal.writeln('Error loading history from server')
  }
}

// 保存历史记录到 localStorage
const saveHistory = () => {
  console.log('commandHistory', commandHistory)
  localStorage.setItem('terminalHistory', JSON.stringify(commandHistory))
}

// 处理命令的函数
const handleCommand = async (command) => {
  switch (command.trim()) {
    case 'help':
      terminal.writeln('Available commands:')
      terminal.writeln('  help     - Show this help message')
      terminal.writeln('  clear    - Clear the terminal')
      terminal.writeln('  echo     - Echo the input')
      terminal.writeln('  history  - Show command history')
      terminal.writeln('  server   - Send command to server')
      break
    case 'clear':
      terminal.clear()
      break
    case 'history':
      commandHistory.forEach((cmd, index) => {
        terminal.writeln(`${index + 1}  ${cmd}`)
      })
      break
    case '':
      break
    default:
      if (command.startsWith('echo ')) {
        terminal.writeln(command.slice(5))
      } else if (command.startsWith('server ')) {
        try {
          const serverCommand = command.slice(7)
          const response = await sendToServer(serverCommand)
          terminal.writeln(response)
        } catch (error) {
          terminal.writeln(`Error: ${error.message}`)
        }
      } else {
        terminal.writeln(`Command not found: ${command}`)
      }
  }
  saveHistory()
}

// 添加与服务器通信的方法
const sendToServer = async (command) => {
  try {
    const response = await fetch('/api/terminal/command', { // 替换为实际的API端点
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ command })
    })

    if (!response.ok) {
      throw new Error('Server response was not ok')
    }

    const result = await response.json()
    return result.response
  } catch (error) {
    throw new Error(`Failed to communicate with server: ${error.message}`)
  }
}

onMounted(() => {
  terminal = new Terminal({
    cursorBlink: true,
    fontSize: 14,
    fontFamily: 'Menlo, Monaco, "Courier New", monospace',
    theme: {
      background: '#1e1e1e'
    }
  })

  terminal.open(terminalRef.value)
  terminal.write('Welcome to the terminal!\r\n')

  // Load history after terminal is initialized
  loadHistory()

  // 处理键盘输入
  terminal.onKey(({ key, domEvent }) => {
    const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey

    if (domEvent.keyCode === 13) { // Enter
      terminal.write('\r\n')
      handleCommand(currentLine)
      commandHistory.push(currentLine)
      historyIndex = commandHistory.length
      currentLine = ''
      terminal.write('$ ')
    } else if (domEvent.keyCode === 8) { // Backspace
      if (currentLine.length > 0) {
        currentLine = currentLine.slice(0, -1)
        terminal.write('\b \b')
      }
    } else if (domEvent.keyCode === 38) { // Up arrow
      if (historyIndex > 0) {
        historyIndex--
        currentLine = commandHistory[historyIndex]
        terminal.write('\r\x1b[K$ ' + currentLine)
      }
    } else if (domEvent.keyCode === 40) { // Down arrow
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++
        currentLine = commandHistory[historyIndex]
        terminal.write('\r\x1b[K$ ' + currentLine)
      } else {
        historyIndex = commandHistory.length
        currentLine = ''
        terminal.write('\r\x1b[K$ ')
      }
    } else if (printable) {
      currentLine += key
      terminal.write(key)
    }
  })
})
</script>

<style lang="scss" scoped>
.terminal-container {
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: #1e1e1e;
}
</style>