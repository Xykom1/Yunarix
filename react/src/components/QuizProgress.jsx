function QuizProgress({ current, total }) {

    const percent = ((current + 1) / total) * 100;

    return (

        <>

            <div id="progress">
                Question {current + 1} / {total}
            </div>


            <div id="progress-bar">

                <div
                    id="progress-fill"
                    style={{
                        width: `${percent}%`
                    }}
                ></div>

            </div>

        </>

    );

}

export default QuizProgress;