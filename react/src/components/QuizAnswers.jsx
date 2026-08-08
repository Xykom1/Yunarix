function QuizAnswers({
    choices,
    correctAnswer,
    selectedAnswer,
    answered,
    onAnswer
}) {

    return (

        <div id="answers-box">

            {choices.map((choice, index) => {

                let className = "";

                if (answered) {

                    if (index === correctAnswer) {
                        className = "correct";
                    }
                    else if (index === selectedAnswer) {
                        className = "wrong";
                    }

                }


                return (

                    <button
                        key={index}
                        onClick={() => onAnswer(index)}
                        disabled={answered}
                        className={className}
                    >
                        {choice}
                    </button>

                );

            })}

        </div>

    );

}


export default QuizAnswers;