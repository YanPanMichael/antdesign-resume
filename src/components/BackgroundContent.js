import React, { Component } from "react";
import PropTypes from "prop-types";

// http://api.douban.com/v2/movie/top250?start=25&count=25
import mockdata from "../mockData/mockData.js";

import fetchJsonp from 'fetch-jsonp';
import { Spin, Alert } from "antd";

class BackgroundContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadComplate: false,
      dataList: [],
    };
  }

  componentWillMount() {
    console.log("OKKK " + new Date());
    this.loadDataFromServices();
  }

  loadDataFromServices() {
    setTimeout(() => {
      console.log("fff "+new Date());
      this.setState({
        loadComplate: true,
        dataList: mockdata.subjects,
      });
    }, 2000);
    // fetchJsonp("http://api.douban.com/v2/movie/top250?start=25&count=25")
    //   .then(function(response) {
    //     return response.json();
    //   })
    //   .then(function(json) {
    //     console.log("parsed json", json);
    //   })
    //   .catch(function(ex) {
    //     console.log("parsing failed", ex);
    //   });
  }

  render() {
    const { menu, page } = this.props.match.params;
    const { dataList, loadComplate } = this.state;
    return (
      <React.Fragment>
        <div>
          {loadComplate && `BackgroundContent --- ${menu} ${page}`}
          {dataList && dataList.map(item => (
            <div key={item.id}>{item.title}</div>
          ))}
          {!loadComplate && (
            <Spin tip="Loading...">
              <Alert
                message="Please wait a while..."
                description="Detail is comming..."
                type="info"
              />
            </Spin>
          )}
        </div>
      </React.Fragment>
    );
  }
}

BackgroundContent.propTypes = {};

export default BackgroundContent;
