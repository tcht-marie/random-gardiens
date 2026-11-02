export const participantCategories = ['app', 'web', 'others'] as const

export type ParticipantCategory = (typeof participantCategories)[number]

export interface ParticipantsByCategory {
  app: string[]
  web: string[]
  others: string[]
}

export interface DrawnParticipant<Category extends ParticipantCategory> {
  category: Category
  name: string
}

export type Draw = readonly [
  DrawnParticipant<'app'>,
  DrawnParticipant<'web'>,
  DrawnParticipant<'others'>,
]

export interface DrawHistory {
  id: string
  participants: Draw
}
