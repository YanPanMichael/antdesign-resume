import React, { Component } from "react";
import PropTypes from "prop-types";

import { Route, Link } from "react-router-dom";

import BackgroundContent from "./BackgroundContent.js";
import { Layout, Menu, Icon } from "antd";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class Background extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectMenu: 'summary',
    };
    this.handleChangeMenuFromUrl = this.handleChangeMenuFromUrl.bind(this);
  }

  componentWillMount() {
    this.setState({
      selectMenu: this.getOpenedMenuFromUrl() || 'summary',
    })
  }
  
  componentWillUpdate(nextProps, nextState) {
    this.setState({
      selectMenu: this.getOpenedMenuFromUrl() || 'summary',
    })
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.selectMenu !== this.state.selectMenu
  }
  
  getOpenedMenuFromUrl() {
    return window.location.hash.split('/')[2];
  }

  handleChangeMenuFromUrl() {
    this.setState({
      selectMenu: this.getOpenedMenuFromUrl() || 'summary',
    })
  }

  render() {
    const { selectMenu } = this.state;
    return (
      <Layout style={{ height: "100%" }}>
        <Sider width={200} style={{ background: "#fff" }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={[selectMenu]}
            selectedKeys={[selectMenu]}
            style={{ height: "100%", borderRight: 0 }}
            onClick={this.handleChangeMenuFromUrl}
          >
            <Menu.Item key="summary" >
                <Icon type="user" />
                <span>
                  <Link to="/background/summary/1">Summary</Link>
                </span>
            </Menu.Item>
            <Menu.Item key="education">
              <Icon type="laptop" />
              <span>
                <Link to="/background/education/1">Education</Link>
              </span>
            </Menu.Item>
            <Menu.Item key="experience">
              <Icon type="notification" />
              <span>
                <Link to="/background/experience/1">Experience</Link>
              </span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ paddingLeft: "2px" }}>
          <Content
            style={{
              background: "#fff",
              padding: 10,
              margin: 0,
              minHeight: 280
            }}
          >
            <Route exact path="/background/:menu/:page" component={BackgroundContent} />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

Background.propTypes = {};

export default Background;
