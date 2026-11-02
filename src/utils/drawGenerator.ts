import {
  type Draw,
  type ParticipantCategory,
  type ParticipantsByCategory,
} from '../types/draw'

export function generateDraws(
  participants: ParticipantsByCategory,
): Draw[] {
  const seenPeople = new Set<string>()
  const numberDraw = 7
  function shuffleCategory(category: ParticipantCategory): string[] {
    const people = [...participants[category]]

    if (people.length !== numberDraw) {
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

    return people
  }

  const shuffledGroups: ParticipantsByCategory = {
    app: shuffleCategory('app'),
    web: shuffleCategory('web'),
    others: shuffleCategory('others'),
  }

  return Array.from({ length: numberDraw }, (_, index): Draw => [
    { category: 'app', name: shuffledGroups.app[index] },
    { category: 'web', name: shuffledGroups.web[index] },
    { category: 'others', name: shuffledGroups.others[index] },
  ])
}
