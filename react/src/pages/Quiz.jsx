import { useEffect, useState } from "react";
import { getQuestions, saveScore } from "../services/quizApi";

import QuizQuestion from "../components/QuizQuestion";
import QuizAnswers from "../components/QuizAnswers";
import QuizProgress from "../components/QuizProgress";
import QuizResult from "../components/QuizResult";

import "../assets/css/style_quizz.css";


function Quiz() {

    const [questions, setQuestions] = useState([]);

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [score, setScore] = useState(0);

    const [answered, setAnswered] = useState(false);

    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const [finished, setFinished] = useState(false);

    const [timeLeft, setTimeLeft] = useState(15);
    const [timeOut, setTimeOut] = useState(false);


    // Chargement des questions
    useEffect(() => {

        async function loadQuestions() {

            const data = await getQuestions(1, 10);

            setQuestions(data);

        }

        loadQuestions();

    }, []);

    useEffect(() => {

        if (answered) return;

        if (timeLeft <= 0) {

            setAnswered(true);
            setTimeOut(true);

            return;
        }

        const timer = setTimeout(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);

    }, [timeLeft, answered]);


    // Quand le joueur clique sur une réponse
    function handleAnswer(index) {

        if (answered) return;

        setAnswered(true);
        setSelectedAnswer(index);


        if (index === questions[currentQuestion].answer) {

            setScore(score + 1);

        }

    }


    // Bouton suivant
    async function nextQuestion() {

        if (currentQuestion < questions.length - 1) {

            setCurrentQuestion(currentQuestion + 1);
            setAnswered(false);
            setSelectedAnswer(null);
            setTimeLeft(15);
            setTimeOut(false);

        }
        else {

            setFinished(true);

            await saveScore(
                score,
                questions.length,
                1
            );

        }

    }


    function restartQuiz() {

        window.location.reload();

    }


    // Chargement
    if (questions.length === 0) {

        return (
            <main className="quiz-page">
                <p>Chargement du quiz...</p>
            </main>
        );

    }


    // Résultat
    if (finished) {

        return (
            <main className="quiz-page">
                <QuizResult
                    score={score}
                    total={questions.length}
                    restart={restartQuiz}
                />
            </main>
        );

    }


    const question = questions[currentQuestion];


    return (

        <main className="quiz-page">

            <h1>🎯 Quiz Otaku</h1>

            <QuizProgress
                current={currentQuestion}
                total={questions.length}
            />

            {timeOut ? (
                <div className="time-out-message">
                    ⏰ Temps écoulé !
                </div>
            ) : (
                <div className="quiz-timer">
                    ⏱️ {timeLeft}s
                </div>
            )}

            <div id="quiz-container">

                <QuizQuestion
                    question={question.question}
                />


                <QuizAnswers
                    choices={question.choices}
                    correctAnswer={question.answer}
                    selectedAnswer={selectedAnswer}
                    answered={answered}
                    onAnswer={handleAnswer}
                />


                {answered && (

                    <button
                        className="btn-primary"
                        onClick={nextQuestion}
                    >
                        Suivant
                    </button>

                )}

            </div>

        </main>

    );

}


export default Quiz;