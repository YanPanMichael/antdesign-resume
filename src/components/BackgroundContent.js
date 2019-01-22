import React, { Component } from 'react';
import PropTypes from 'prop-types';

import data from '../mockData/mockData.js';

class BackgroundContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loadComplate: false
    }
  }
  
  componentWillMount() {
    console.log("OKKK");
    
    fetch('https://www.baidu.com/home/msg')
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