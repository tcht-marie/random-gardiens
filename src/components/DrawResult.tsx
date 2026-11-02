import "./drawResult.css"
import type {DrawHistory, ParticipantCategory} from "../types/draw.ts";

export default function DrawResult({history, categoryLabels}: {
    history: DrawHistory[], categoryLabels: Record<ParticipantCategory, string>
}) {
    return (
        <ol className="draw-history">
            {history.map((draw, index) => (
                <li key={draw.id}>
                    <article className="draw-card">
                        <header className="draw-card-header">
                            <h3>Tirage {index + 1}</h3>
                        </header>
                        <ul className="draw-participants">
                            {draw.participants.map(({category, name}) => (
                                <li key={category}>
                                    <span>{categoryLabels[category]}</span>
                                    {name}
                                </li>
                            ))}
                        </ul>
                    </article>
                </li>
            ))}
        </ol>
    );
}
