import "./peopleList.css"
import {participantCategories, type ParticipantCategory, type ParticipantsByCategory} from "../types/draw.ts";

function PeopleList({categoryLabels, participants}: {
    categoryLabels: Record<ParticipantCategory, string>,
    participants: ParticipantsByCategory
}) {
    return (
        <details className="participants-list">
            <summary>Afficher la liste des participants</summary>
            <div className="participant-groups">
                {participantCategories.map((category) => (
                    <div key={category}>
                        <h2>{categoryLabels[category]}</h2>
                        <ul>
                            {participants[category].map((person) => (
                                <li key={person}>{person}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </details>
    );
};

export default PeopleList;