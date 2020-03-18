import React, { Component } from "react";

import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "JC",
      todoItems: [
        { action: "Read React book", done: false },
        { action: "Fix Grid Issues", done: false },
        { action: "Add modal functionality", done: false },
        { action: "Add back the header/footer", done: false }
      ],
      newItemText: ""
    };
  }

  updateNewTextValue = e => {
    this.setState({ newItemText: e.target.value });
  };

  createNewToDo = () => {
    if (
      !this.state.todoItems.find(item => item.action === this.state.newItemText)
    ) {
      this.setState({
        todoItems: [
          ...this.state.todoItems,
          { action: this.state.newItemText, done: false }
        ],
        newItemText: ""
      });
    }
  };

  toggleTodo = todo =>
    this.setState({
      todoItems: this.state.todoItems.map(item =>
        item.action === todo.action ? { ...item, done: !item.done } : item
      )
    });

  todoTableRows = () =>
    this.state.todoItems.map(item => (
      <tr key={item.action}>
        <td>{item.action}</td>
        <td>
          <input
            className="done"
            type="checkbox"
            checked={item.done}
            onChange={() => this.toggleTodo(item)}
          />
        </td>
      </tr>
    ));

  render() {
    return (
      <div>
        <h4 className="title">
          {this.state.userName}'s To Do List (
          {this.state.todoItems.filter(t => !t.done).length} items to do)
        </h4>
        <div className="todo-item-container">
          <div className="todo-item">
            <input
              className="form-control"
              value={this.state.newItemText}
              onChange={this.updateNewTextValue}
            />
            <button className="button-add" onClick={this.createNewToDo}>
              Add
            </button>
          </div>
          <table className="table-todo">
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>{this.todoTableRows()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
