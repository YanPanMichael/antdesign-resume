import React, { Component } from "react";
import PropTypes from "prop-types";
import fetchJsonp from 'fetch-jsonp';

// http://api.douban.com/v2/movie/top250?start=25&count=25
import { Spin, Alert, Pagination } from "antd";
import RecordItem from './RecordItem';
import top250Data from "../mockData/top250_data.js";
const comingSoonData = require("../mockData/coming_soon_data.json");
const intheatersData = require("../mockData/in_theaters_data.json");

class BackgroundContent extends Component {
  constructor(props) {
    super(props);
    this.mockData = intheatersData;
    this.state = {
      isLoading: true,
      dataList: [],
      currentMenu: props.match.params.menu,
      currentPage: parseInt(props.match.params.page) || 1,
      pagePerCount: 10,
      total: 0,
    };
    this.changePagation = this.changePagation.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.match.params.menu !== this.props.match.params.menu) {
      this.switchMockDataSource(nextProps.match.params.menu);
      this.setState({
        currentMenu: nextProps.match.params.menu,
        currentPage: 1,
      });
    } else if(nextProps.match.params.page !== this.props.match.params.page) {
      this.setState({
        currentPage: parseInt(nextProps.match.params.page) || 1,
      });
    } else {
      return;
    }
  }
  
  switchMockDataSource(nextMenu) {
    switch (nextMenu) {
      case 'in_theaters':
      this.mockData = intheatersData;
      break;
      case 'coming_soon':
      this.mockData = comingSoonData;
      break;
      case 'top250':
      this.mockData = top250Data;
      break;
    }
  }
  
  componentWillMount() {
    this.loadDataFromServices();
  }

  loadDataFromServices() {
    const {currentPage, currentMenu, pagePerCount} = this.state;
    setTimeout(() => {
      this.setState({
        isLoading: false,
        dataList: this.mockData.subjects,
        total: this.mockData.total,
      });
    }, 2000);
    // fetchJsonp(`http://api.douban.com/v2/movie/${currentMenu}?start=${(currentPage-1)*pagePerCount}&count=${pagePerCount}`)
    //   .then(function(response) {
    //     return response.json();
    //   })
    //   .then(function(data) {
    //     console.log("parsed json", data);
    //     this.setState({
    //       isLoading: false,
    //       dataList: data.subjects || [],
    //       total: data.total,
    //     });
    //   })
    //   .catch(function(err) {
    //     console.log("parsing failed", err);
    //   });
  }

  changePagation() {

  }

  renderBackgroundContentPart() {
    const { dataList, isLoading, currentPage, total, pagePerCount } = this.state;
    if(isLoading) {
      return <article style={{flex: '1'}}>
        <Spin tip="Loading..." >
          <Alert
            message="Centent is Loading..."
            description="Detail will comming soon..."
            type="info"
          />
        </Spin>
      </article>
    } else {
      return dataList && (
        <React.Fragment>
          <article style={{display: 'flex', flexWrap: 'wrap'}}>
            {dataList.map(item => (
              <RecordItem key={item.id} {...item} />
            ))}
          </article>
          <Pagination current={currentPage} defaultCurrent={1} defaultPageSize={10} pageSize={pagePerCount} total={total} onChange={this.changePagation} />
        </React.Fragment>
      )
    }
  }

  render() {
    return (
      <section>
        {this.renderBackgroundContentPart()}
      </section>
    );
  }
}

BackgroundContent.propTypes = {};

export default BackgroundContent;
