export const participantCategories = ['app', 'web', 'others'] as const

export type ParticipantCategory = (typeof participantCategories)[number]

export interface ParticipantsByCategory {
  app: string[]
  web: string[]
  others: string[]
}

export interface DrawnParticipant {
  category: ParticipantCategory
  name: string
}

export interface DrawHistory {
  id: string
  createdAt: string
  participants: DrawnParticipant[]
}
