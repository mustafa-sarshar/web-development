import React from "react";
import { connect } from "react-redux";
import { setAge, setName, setParents, setBirth } from "../actions/userActions";
import { addNumber, subtractNumber } from "../actions/mathActions";

// Import Custom Components
import UserView from "../components/UserView";
import MathView from "../components/MathView";

// Stateful Component
class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  render() {
    return (
      <>
        <UserView
          user={this.props.user}
          dispatchers={{
            setName: this.props.setName,
            setAge: this.props.setAge,
            setParents: this.props.setParents,
            setBirth: this.props.setBirth,
          }}
        />
        <MathView math={this.props.math} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
    math: state.mathReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setName: (name) => {
      dispatch(setName(name));
    },
    setAge: (age) => {
      dispatch(setAge(age));
    },
    setParents: (father, mother) => {
      dispatch(setParents(father, mother));
    },
    setBirth: (birth_date) => {
      dispatch(setBirth(birth_date));
    },
    addNumber: (number) => {
      dispatch(addNumber(number));
    },
    subtractNumber: (number) => {
      dispatch(subtractNumber(number));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
