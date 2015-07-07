var React = require('react');
var superagent = require('superagent');
var PDP = require('./pdp');

var SearchResults = React.createClass({
  getInitialState: function () {
    return {
      results: null,
      selectedProduct: null
    };
  },

  renderProduct: function (product) {


    var style = {
        display: 'inline-block',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: (this.state.selectedProduct === product.styleid) ? 'blue' : 'white'
      };

    return (
      <div style={style} onClick={() => {this.setState({selectedProduct: product.styleid})}}>
        <img src={product.search_image} style={{
          width: 30,
        }} />
      </div>
    );
  },

  componentDidMount: function () {
    superagent.get('/api/search/data/jeans', (err, res) => {
      if (err) {
        return console.log(err);
      };

      this.setState({
        results: res.body.data.results.products
      });
    });

  },

  render: function() {
    return (
      <div>
        {this.state.results ? this.state.results.map(this.renderProduct) : 'Loading...'}
        <PDP id={this.state.selectedProduct} />
      </div>
    );
  },
});

module.exports = SearchResults;