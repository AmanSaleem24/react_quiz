import { useEffect, useReducer } from "react";

import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextQuestion from "./NextQuestion";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";
import Footer from "./Footer";
import Timer from "./Timer";


export default function App() {
  const SECS_PER_QUES = 15;
  const initialState = {
    questions: [],
    status: "loading", //"loading", "error", "active", "ready", "finished"
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    secondsRemaining: null,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "dataRecieved":
        return { ...state, questions: action.payload, status: "ready" };
      case "dataError":
        return { ...state, status: "error" };
      case "start":
        return {
          ...state,
          status: "active",
          secondsRemaining: state.questions.length * SECS_PER_QUES,
        };
      case "answerRecorded":
        const question = state.questions.at(state.index);
        return {
          ...state,
          answer: action.payload,
          points:
            action.payload === question.correctOption
              ? state.points + question.points
              : state.points,
        };
      case "nextQuestion":
        return { ...state, index: state.index + 1, answer: null };
      case "finished":
        return {
          ...state,
          status: "finished",
          highscore:
            state.points > state.highscore ? state.points : state.highscore,
        };
      case "restart":
        return { ...initialState, questions: state.questions, status: "ready" };
        case "tick":
          return {...state, secondsRemaining: state.secondsRemaining - 1, status: state.secondsRemaining === 0 ? "finished": state.status}
      default:
        throw new Error("Action Unknown");
    }
  }

  const [{ questions, status, index, answer, points, highscore, secondsRemaining }, dispatch] =
    useReducer(reducer, initialState);

  const maxQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (maxPoints, current) => maxPoints + current.points,
    0
  );
  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => dispatch({ type: "dataError" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen len={maxQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              maxQuestions={maxQuestions}
              maxPoints={maxPossiblePoints}
              points={points}
              answer={answer}
            />
            <Questions
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining}>

              </Timer>

              <NextQuestion
                dispatch={dispatch}
                answer={answer}
                index={index}
                maxQuestions={maxQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            points={points}
            maxPoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
