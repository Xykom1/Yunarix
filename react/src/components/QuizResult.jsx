function QuizResult({ score, total, restart }) {

    return (

        <div className="result-box">

            <h2>🎉 Résultat</h2>

            <p>
                Score : <strong>{score} / {total}</strong>
            </p>

            <button
                className="btn-primary"
                onClick={restart}
            >
                Rejouer
            </button>

        </div>

    );

}

export default QuizResult;