import React from "react";
import "./Counter.css";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.initialValue || 0,
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
      React.createElement("button", { onClick: this.decrement }, "Decrement"),
      React.createElement("p", null, `Count: ${this.state.count}`),
      React.createElement("button", { onClick: this.increment }, "Increment")
    );
  }
}
export default Counter;
