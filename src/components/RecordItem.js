import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Rate } from 'antd';

import styles from './RecordItem.scss';

class RecordItem extends Component {
  render() {
    const {images, title, directors, rating, year, genres} = this.props;
    return (
      <div className={styles.itemStyle}>
        <img className={styles.itemImg} src={images.small.replace('img1','img3')} />
        <h4 className={styles.itemTitle}>{title}</h4>
        <h4 className={styles.itemDirector}>{directors.map(el=>el.name).join(', ')}</h4>
        <h4 className={styles.itemYear}>{year}</h4>
        <h4 className={styles.itemGenres}>{genres.join(', ')}</h4>
        <Rate disabled defaultValue={Math.floor(rating.average/2)} />
      </div>
    );
  }
}

RecordItem.propTypes = {

};

export default RecordItem;