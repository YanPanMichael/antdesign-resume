import React, { Component } from "react";
import PropTypes from "prop-types";
import fetchJsonp from 'fetch-jsonp';

import { Spin, Alert, Pagination } from "antd";
import RecordItem from './RecordItem';
import top250Data from "../mockData/top250_data.js";
const comingSoonData = require("../mockData/coming_soon_data.json");
const intheatersData = require("../mockData/in_theaters_data.json");

class BackgroundContent extends Component {
  constructor(props) {
    super(props);
    this.mockData = intheatersData || {};
    this.state = {
      isLoading: true,
      dataList: [],
      currentMenu: props.match.params.menu || 'summary',
      currentPage: parseInt(props.match.params.page) || 1,
      pagePerCount: 10,
      total: 0,
    };
    this.changePagation = this.changePagation.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.match.params.menu !== this.props.match.params.menu) {
      // this.switchMockDataSource(nextProps.match.params.menu);
      this.setState({
        isLoading: true,
        currentMenu: nextProps.match.params.menu,
        currentPage: 1,
      }, () => {
        this.loadDataFromServices();
      });
    }else if(nextProps.match.params.page !== this.props.match.params.page) {
      this.setState({
        isLoading: true,
        currentPage: parseInt(nextProps.match.params.page) || 1,
      }, () => {
        this.loadDataFromServices();
      });
    } else {
      return;
    }
  }
  
  switchMockDataSource(nextMenu) {
    switch (nextMenu) {
      case 'summary':
      this.mockData = intheatersData;
      break;
      case 'education':
      this.mockData = comingSoonData;
      break;
      case 'experience':
      this.mockData = top250Data;
      break;
    }
  }

  mapMenuToUrlType(nextMenu) {
    switch (nextMenu) {
      case 'summary':
      return 'in_theaters';
      case 'education':
      return 'coming_soon';
      case 'experience':
      return 'top250';
    }
  }
  
  componentWillMount() {
    this.loadDataFromServices();
  }

  loadDataFromServices() {
    const {currentPage, currentMenu, pagePerCount} = this.state;
    // setTimeout(() => {
    //   // const mockData = require(`../mockData/${currentMenu}.json`);
    //   this.switchMockDataSource(currentMenu);
    //   this.setState({
    //     isLoading: false,
    //     dataList: this.mockData.subjects,
    //     total: this.mockData.total,
    //   });
    // }, 0);

    const menuTemp = this.mapMenuToUrlType(currentMenu);
    fetchJsonp(`http://api.douban.com/v2/movie/${menuTemp}?start=${(currentPage-1)*pagePerCount}&count=${pagePerCount}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log("parsed json", data);
        this.setState({
          isLoading: false,
          dataList: data.subjects || [],
          total: data.total,
        });
      })
      .catch((err) => {
        console.log("parsing failed", err);
      });
  }

  changePagation(page) {
    // Method 1: window.loaction.href
    // console.log(`/#/background/${this.state.currentMenu}/${page}`);
    // window.location.href = `/#/background/${this.state.currentMenu}/${page}`;

    // Method 2: this.props.history.push
    this.props.history.push(`/background/${this.state.currentMenu}/${page}`);
  }

  renderBackgroundContentPart() {
    const { dataList, isLoading, currentPage, total, pagePerCount, currentMenu } = this.state;
    if(isLoading) {
      return <article style={{flex: '1'}}>
        <Spin tip="Loading..." >
          <Alert
            message="Centent is Loading..."
            description={`Detail of ${currentMenu} will comming soon...`}
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
          <Pagination current={currentPage} defaultCurrent={currentPage} defaultPageSize={pagePerCount} pageSize={pagePerCount} total={total} onChange={this.changePagation} />
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
