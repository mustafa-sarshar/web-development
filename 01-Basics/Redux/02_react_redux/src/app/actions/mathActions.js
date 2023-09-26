const addNumber = (number) => {
  return {
    type: "ADD",
    payload: number,
  };
};

const subtractNumber = (number) => {
  return {
    type: "SUBTRACT",
    payload: number,
  };
};

export { addNumber, subtractNumber };
