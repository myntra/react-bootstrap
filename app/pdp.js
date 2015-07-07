var React = require('react');
var superagent = require('superagent');

var PDP = React.createClass({
  getInitialState: function () {
    return {
      data: undefined
    };
  },

  fetch: function (styleid) {
    if (!styleid) {
      return;
    };

    superagent.get('/api/style/'+styleid, (err, res) => {
      if (err) {
        return console.log(err);
      };

      this.setState({
        data: res.body.data
      });
    });
  },

  componentDidMount: function () {
    this.fetch(this.props.id);
  },

  componentWillReceiveProps: function (nextProps) {
    this.fetch(nextProps.id);
  },

  addToCart: function () {
    alert('added to cart: ' + this.state.data.id);
  },

  sizeSelected: function (e) {
    console.log(e.target.value);
  },

  renderSize: function (size) {
    return (
      <option value={size.skuId}>{size.value}</option>
    );
  },

  render: function() {    
    if (this.state.data) {
      return (
        <div>
          <img src={this.state.data.styleImages.default.imageURL} height={60} />
          <div>{this.state.data.productDisplayName}</div>
          <div>Rs. {this.state.data.discountedPrice}</div>
          <select onChange={this.sizeSelected}>
            {this.state.data.styleOptions.map(this.renderSize)}
          </select>
          <button onClick={this.addToCart}>Add to cart</button>
        </div>
      );      
    } else {
      return <div>Loading...</div>;
    }
  },

});

module.exports = PDP;