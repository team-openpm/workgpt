export type ChatMessageRole = 'user' | 'system' | 'assistant'

export interface ChatMessage {
  role: ChatMessageRole
  content: string
}

export interface UserChatMessage extends ChatMessage {
  role: 'user'
}
