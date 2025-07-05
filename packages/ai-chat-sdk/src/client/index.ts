export { ChatWidget } from "./components/custom/chat.widget";
export type { ChatWidgetProps, ChatMessage } from "./components/custom/chat.widget";

// Global window integration for HTML embedding
declare global {
  interface Window {
    ChatWidget: {
      init: (config: GlobalChatConfig) => void
      destroy: () => void
    }
  }
}

interface GlobalChatConfig {
  sessionId: string
  documentId: string
  theme?: "light" | "dark"
  title?: string
  placeholder?: string
  botName?: string
  width?: number | string
  height?: number | string
  bubbleText?: string
  bubbleIcon?: string
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
  mountId?: string
  onClose?: () => void
  onNewMessage?: (message: any) => void
}

// Only run in browser environment
if (typeof window !== "undefined") {
  let chatInstance: any = null
  let mountElement: HTMLElement | null = null

  window.ChatWidget = {
    init: (config: GlobalChatConfig) => {
      // Dynamic import to avoid SSR issues
      import("react").then((React) => {
        import("react-dom/client").then((ReactDOM) => {
          import("./components/custom/chat.widget").then(({ ChatWidget }) => {
            const { mountId = "chat-widget-root", ...chatProps } = config

            // Find or create mount element
            mountElement = document.getElementById(mountId)
            if (!mountElement) {
              mountElement = document.createElement("div")
              mountElement.id = mountId
              document.body.appendChild(mountElement)
            }

            // Create React root and render
            const root = ReactDOM.createRoot(mountElement)
            chatInstance = root

            root.render(
              React.createElement(ChatWidget, {
                ...chatProps,
                onClose: () => {
                  config.onClose?.()
                  window.ChatWidget.destroy()
                },
              }),
            )
          })
        })
      })
    },

    destroy: () => {
      if (chatInstance && mountElement) {
        chatInstance.unmount()
        if (mountElement.parentNode) {
          mountElement.parentNode.removeChild(mountElement)
        }
        chatInstance = null
        mountElement = null
      }
    },
  }
}
