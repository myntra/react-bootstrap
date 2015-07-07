var React = require('react');
var superagent = require('superagent');

var Greeting = React.createClass({
  getInitialState: function () {
    return {
      data: undefined
    };
  },

  componentDidMount: function () {
    superagent.get('/api/style/790880', (err, res) => {
      if (err) {
        return console.log(err);
      };

      this.setState({
        data: res.body.data
      });
    });
  },

  render: function() {    
    if (this.state.data) {
      return (
        <div>
          <img src={this.state.data.styleImages.default.imageURL} width={200} />
          <div>{this.state.data.productDisplayName}</div>
          <div>Rs. {this.state.data.discountedPrice}</div>
        </div>
      );      
    } else {
      return <div>"Loading..."</div>;
    }
  },

});

module.exports = Greeting;