import React from "react";

export default React.createClass({
  getInitialState: function () {
    return {
      count: 0,
    };
  },

  componentDidMount: function () {
    this.tick();
  },

  tick: function () {
    this.setState({
      count: this.state.count + 1
    });
    setTimeout(this.tick, 1000);
  },

  render: function() {
    return (
      <div className="greeting">
        Hello, {this.props.name}.
        I'm {this.state.count} seconds old.
      </div>
    );
  },
});