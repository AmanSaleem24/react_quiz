function Progress({index, maxQuestions, maxPoints, points, answer}) {
    return (
        <header className="progress">
            <progress max={maxQuestions} value={index  + Number(answer !== null)} />
            <p><strong>{index + 1}</strong>/{maxQuestions}</p>
            <p><strong>{points}</strong>/{maxPoints}</p>
        </header>
    )
}

export default Progress
