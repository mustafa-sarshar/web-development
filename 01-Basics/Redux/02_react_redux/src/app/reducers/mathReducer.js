const initialStateMathReducer = {
  result: 1,
  lastValues: [],
};

const mathReducer = (state = initialStateMathReducer, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        result: state.result + action.payload,
        lastValues: [...state.lastValues, action.payload],
      };
    case "SUBTRACT":
      return {
        ...state,
        result: state.result - action.payload,
        lastValues: [...state.lastValues, action.payload],
      };
    default:
      return state;
  }
};

export default mathReducer;
