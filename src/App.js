import React, { Component } from "react";
import { TodoBanner } from "./TodoBanner";
import { TodoCreator } from "./TodoCreator";
import { TodoRow } from "./TodoRow";
import { VisibilityControl } from "./VisibilityControl";

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
      showCompleted: true
    };
  }

  updateNewTextValue = e => {
    this.setState({ newItemText: e.target.value });
  };

  createNewToDo = task => {
    if (!this.state.todoItems.find(item => item.action === task)) {
      this.setState(
        {
          todoItems: [...this.state.todoItems, { action: task, done: false }]
        },
        () => localStorage.setItem("todos", JSON.stringify(this.state))
      );
    }
  };

  toggleTodo = todo =>
    this.setState({
      todoItems: this.state.todoItems.map(item =>
        item.action === todo.action ? { ...item, done: !item.done } : item
      )
    });

  todoTableRows = doneValue =>
    this.state.todoItems
      .filter(item => item.done === doneValue)
      .map(item => (
        <TodoRow key={item.action} item={item} callback={this.toggleTodo} />
      ));

  componentDidMount = () => {
    let data = localStorage.getItem("todos");
    this.setState(
      data != null
        ? JSON.parse(data)
        : {
            userName: "JC",
            todoItems: [
              { action: "Read React book", done: false },
              { action: "Fix Grid Issues", done: false },
              { action: "Add modal functionality", done: false },
              { action: "Add back the header/footer", done: false }
            ],
            showCompleted: true
          }
    );
  };

  render = () => (
    <div>
      <div className="todo-item-container">
        <TodoBanner name={this.state.userName} tasks={this.state.todoItems} />
        <div className="todo-item">
          <TodoCreator callback={this.createNewToDo} />
        </div>
        <table className="table-todo">
          <thead>
            <tr>
              <th>Description</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>{this.todoTableRows(false)}</tbody>
        </table>
        <div className="completed-tasks">
          <VisibilityControl
            description="Completed Tasks"
            isChecked={this.state.showCompleted}
            callback={checked => this.setState({ showCompleted: checked })}
          />
        </div>

        {this.state.showCompleted && (
          <table className="table-complete">
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>{this.todoTableRows(true)}</tbody>
          </table>
        )}
      </div>
    </div>
  );
}
