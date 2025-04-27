import React from "react";
import PropTypes from "prop-types";
import "./Counter.css";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.initialValue,
    };
  }
  increment = () => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };
  decrement = () => {
    this.setState((prevState) => ({ count: prevState.count - 1 }));
  };
  render() {
    return React.createElement(
      "div",
      { className: "counter" },
      React.createElement(
        "button",
        { onClick: this.decrement, "aria-label": "Decrease count" },
        "Decrement"
      ),
      React.createElement("p", null, `Count: ${this.state.count}`),
      React.createElement(
        "button",
        { onClick: this.increment, "aria-label": "Increase count" },
        "Increment"
      )
    );
  }
}

Counter.defaultProps = {
  initialValue: 0,
}

Counter.propTypes = {
  initialValue: PropTypes.number,
}

export default Counter;
