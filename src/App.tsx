import { useState } from 'react'
import participantsData from './data/participants.json'
import {
  type DrawHistory,
  type ParticipantCategory,
  type ParticipantsByCategory,
} from './types/draw'
import { generateDraws } from './utils/drawGenerator'
import './App.css'
import DrawResult from "./components/DrawResult.tsx";
import PeopleList from "./components/PeopleList.tsx";

const participants: ParticipantsByCategory = {
  app: participantsData.people.devs.app,
  web: participantsData.people.devs.web,
  others: participantsData.people.others,
}

const participantCount = Object.values(participants).reduce(
  (total, category) => total + category.length,
  0,
)

const categoryLabels: Record<ParticipantCategory, string> = {
  app: 'APP',
  web: 'WEB',
  others: 'BA / TEST',
}

function App() {
  const [history, setHistory] = useState<DrawHistory[]>([])
  const [error, setError] = useState<string | null>(null)

  function handleDraw() {
    try {
      const draws: DrawHistory[] = generateDraws(participants).map((draw) => ({
        id: crypto.randomUUID(),
        participants: draw,
      }))

      setHistory(draws)
      setError(null)
    } catch (drawError) {
      setError(
        drawError instanceof Error
          ? drawError.message
          : 'Le tirage n’a pas pu être effectué.',
      )
    }
  }

  return (
    <>
      <section id="center">
        <h1>Gardiens de la prod</h1>
        <div className="draw-form">
          <p>
            {participantCount} participants répartis entre APP, WEB et BA / TEST.
          </p>
          <p>Chaque tirage sélectionne une personne de chaque catégorie.</p>
          <p>
            Chaque clic génère 7 tirages : chaque participant apparaît exactement
            une fois dans la série, indépendamment de la série précédente.
          </p>

          <PeopleList categoryLabels={categoryLabels} participants={participants}/>

          <button type="button" onClick={handleDraw}>
            Générer les 7 tirages
          </button>
        </div>
      </section>

      <div className="ticks" aria-hidden="true"></div>

      <section id="next-steps" aria-live="polite">
        <div className="draw-results">
          <h2>Historique des tirages</h2>
          <p className="draw-message">
            Les 7 derniers tirages sont affichés dans cette liste.
          </p>
          {error && (
            <p className="draw-message draw-error" role="alert">
              {error}
            </p>
          )}
          {history.length === 0 ? (
            <p className="draw-message">Aucun tirage pour le moment.</p>
          ) : (
              <DrawResult history={history} categoryLabels={categoryLabels}/>
          )}
        </div>
      </section>

      <div className="ticks" aria-hidden="true"></div>
      <section id="spacer" aria-hidden="true"></section>
    </>
  )
}

export default App
