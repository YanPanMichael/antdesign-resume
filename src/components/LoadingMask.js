import React, { Component } from 'react';
import PropTypes from 'prop-types';

import loadingStyle from '../css/LoadingMask.scss';

class LoadingMask extends Component {
  render() {
    return (
      <div className={loadingStyle.loadingMask} style={{display: this.props.loadswitch?"block":"none"}}>
        <div className={loadingStyle.loadEffect}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }
}

LoadingMask.propTypes = {

};

export default LoadingMask;