const setName = (name) => {
  return {
    type: "SET_NAME",
    payload: name,
  };
};

const setAge = (age) => {
  return {
    type: "SET_AGE",
    payload: age,
  };
};

const setParents = (father, mother) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: "SET_PARENTS",
        payload: [father, mother],
      });
    }, 2000);
  };
};

const setBirth = (birth_date) => {
  return {
    type: "SET_BIRTH",
    payload: new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(birth_date);
      }, 1500);
    }),
  };
};

export { setName, setAge, setParents, setBirth };
