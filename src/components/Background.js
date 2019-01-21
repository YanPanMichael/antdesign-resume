import React, { Component } from "react";
import PropTypes from "prop-types";

import { Route, Link } from "react-router-dom";

import BackgroundContent from "./BackgroundContent.js";
import { Layout, Menu, Icon } from "antd";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class Background extends Component {
  render() {
    return (
      <Layout style={{ height: "100%" }}>
        <Sider width={200} style={{ background: "#fff" }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: "100%", borderRight: 0 }}
          >
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <Link to="/background/summary/1">Summary</Link>
                </span>
              }
            >
              <Menu.Item key="1">option1</Menu.Item>
              <Menu.Item key="2">option2</Menu.Item>
              <Menu.Item key="3">option3</Menu.Item>
              <Menu.Item key="4">option4</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="laptop" />
                  <Link to="/background/education/1">Education</Link>
                </span>
              }
            />
            <SubMenu
              key="sub3"
              title={
                <span>
                  <Icon type="notification" />
                  <Link to="/background/experience/1">Experience</Link>
                </span>
              }
            />
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
            <Route path="/background/:menu/:page" exact component={BackgroundContent} />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

Background.propTypes = {};

export default Background;
