import React, { Component } from "react";

export class TodoCreator extends Component {
  constructor(props) {
    super(props);
    this.state = { newItemText: "" };
  }

  updateNewTextValue = e => {
    this.setState({ newItemText: e.target.value });
  };

  createNewTodo = () => {
    this.props.callback(this.state.newItemText);
    this.setState({ newItemText: "" });
  };

  render = () => (
    <div className="new-todo">
      <input
        className="form-control"
        value={this.state.newItemText}
        onChange={this.updateNewTextValue}
      />
      <button className="add-button" onClick={this.createNewTodo}>
        Add
      </button>
    </div>
  );
}
