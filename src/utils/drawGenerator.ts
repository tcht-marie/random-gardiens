import {
  participantCategories,
  type DrawnParticipant,
  type ParticipantsByCategory,
} from '../types/draw'

export function generateDraws(
  participants: ParticipantsByCategory,
): DrawnParticipant[][] {
  const seenPeople = new Set<string>()
  const shuffledGroups = participantCategories.map((category) => {
    const people = [...participants[category]]

    if (people.length !== 7) {
      throw new Error(
        `La catégorie ${category} doit contenir exactement 7 participants pour générer les 7 tirages.`,
      )
    }

    for (const person of people) {
      if (!person.trim() || seenPeople.has(person)) {
        throw new Error(
          'Chaque participant doit avoir un nom non vide et apparaître dans une seule catégorie, une seule fois.',
        )
      }
      seenPeople.add(person)
    }

    for (let index = people.length - 1; index > 0; index--) {
      const randomIndex = Math.floor(Math.random() * (index + 1))
      ;[people[index], people[randomIndex]] = [people[randomIndex], people[index]]
    }

    return { category, people }
  })

  return Array.from({ length: 7 }, (_, index) =>
    shuffledGroups.map(({ category, people }) => ({
      category,
      name: people[index],
    })),
  )
}
