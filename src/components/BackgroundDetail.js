import React, { Component } from "react";
import PropTypes from "prop-types";

import { Button, Icon, Spin, Alert } from "antd";

import fetchJSONP from "fetch-jsonp";

class BackgroundDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {}, // 电影信息对象
      isloading: true
    };
    this.goBackToPreviewsList = this.goBackToPreviewsList.bind(this);
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    fetchJSONP(
      "https://api.douban.com/v2/movie/subject/" + id
    )
    .then(res => res.json())
    .then(data => {
      this.setState({
        info: data,
        isloading: false
      });
    })
    .catch(err => {
      this.setState({
        info: {title: "", images: {large: ""}, summary: 
          (<Alert
            message="Error"
            description="This is an error message about Detail page."
            type="error"
            showIcon
            closable
            onClose={this.goBackToPreviewsList}
          />)
        },
        isloading: false
      });
    })
  }
  
  // 实现返回按钮的功能
  goBackToPreviewsList() {
    this.props.history.go(-1);
  };

  renderInfo() {
    if (this.state.isloading) {
      return (
        <Spin tip="Loading...">
          <Alert
            message="Loading data..."
            description="精彩内容，马上呈现....."
            type="info"
          />
        </Spin>
      );
    } else {
      const { title, images, summary } = this.state.info;
      return (
        <article>
          {title && <Button type="primary" onClick={this.goBackToPreviewsList}>
            <Icon type="left" />
            Go back
          </Button>}
          <div style={{ textAlign: "center" }}>
            {title && <h2>{title}</h2>}
            {images.large && <img
              src={images.large.replace("img1", "img3")}
              alt=""
            />}
          </div>
          <div style={{ textIndent: "2em", lineHeight: "30px", marginTop: "20px" }}>
            {summary}
          </div>
        </article>
      );
    }
  };

  render() {
    return (
      <section>
        {this.renderInfo()}
      </section>
    );
  }
}

BackgroundDetail.propTypes = {};

export default BackgroundDetail;

