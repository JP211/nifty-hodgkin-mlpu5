import React, { Component } from "react";

export class TodoBanner extends Component {
  render = () => (
    <h4 className="title">
      {this.props.name}'s To Do List (
      {this.props.tasks.filter(t => !t.done).length} items to do)
    </h4>
  );
}
