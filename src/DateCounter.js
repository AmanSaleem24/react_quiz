import { useReducer } from "react";

function countReducer(state, action) {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + state.step };
    case "decrement":
      return { ...state, count: state.count - state.step };
    case "setCount":
      return { ...state, count: action.value };
    case "setStep":
      return { ...state, step: action.value };
    case "reset":
      return {count: 0, step: 1}
    default:
      throw new Error();
  }
}

function DateCounter() {
  const initialState = { count: 0, step: 1 };
  const [state, dispatch] = useReducer(countReducer, initialState);


  // This mutates the date object.
  const date = new Date("may 13 2025");
  date.setDate(date.getDate() + state.count);

  const dec = function () {
    dispatch({ type: "decrement" });
  };

  const inc = function () {
    dispatch({ type: "increment" });
  };

  const defineCount = function (e) {
    dispatch({ type: "setCount", value: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: "setStep", value: Number(e.target.value) });
  };

  const reset = function () {
    // dispatch({type: "setCount", value: 0})
    // dispatch({type: "setStep", value: 1})
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={state.step}
          onChange={defineStep}
        />
        <span>{state.step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={state.count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
