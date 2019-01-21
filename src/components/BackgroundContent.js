import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BackgroundContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loadComplate: false
    }
  }
  
  componentWillUnmount() {
    console.log("OKKK");
    
    fetch('http://127.0.0.1:5500/')
    .then(response => {
      return response.json()
    })
    .then(data => console.log(data)
    )
  }

  render() {
    return (
      <div>
        BackgroundContent --- {this.props.match.params.menu + this.props.match.params.page}
      </div>
    );
  }
}

BackgroundContent.propTypes = {

};

export default BackgroundContent;