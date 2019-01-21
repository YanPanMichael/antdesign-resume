import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BackgroundContent extends Component {
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