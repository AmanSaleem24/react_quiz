function NextQuestion({ dispatch, answer, index, maxQuestions }) {
  if (answer === null) return;

  if (index !== maxQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next Ques
      </button>
    );
  if (index === maxQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finished" })}
      >
        Finish
      </button>
    );
}

export default NextQuestion;
