import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Link } from "react-router-dom";

import { Layout, Menu, Icon } from "antd";
const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

import Home from "./Home";
import Resume from "./Resume";
import Background from "./Background";

import styles from "../css/App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      footerRefHeight: 0
    }
  }

  componentDidMount() {
    this.setState({
      footerRefHeight: this.footerRef.getBoundingClientRect().height || 0
    })
  }

  render() {
    return (
      <Layout className={styles.layout}>
        <Header>
          <div className={styles.logo} />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[window.location.hash.split('/')[1]]}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item key="home"><Link to="/home">Home</Link></Menu.Item>
            <Menu.Item key="resume"><Link to="/resume">Resume</Link></Menu.Item>
            <Menu.Item key="background"><Link to="/background/summary/1">Background</Link></Menu.Item>
          </Menu>
        </Header>
        <Content style={{ backgroundColor: '#fff', flex: 1 }}>
          <Route path="/home" component={Home} />
          <Route path="/resume" component={Resume} />
          {/* <Route path="/background" component={Background} /> */}
          <Route path="/background" render={(props) => (<Background footerRefHeight={this.state.footerRefHeight} {...props}/>)} />
        </Content>
        <footer ref={(el) => (this.footerRef = el)}>
          <Footer style={{ textAlign: "center" }}>
            Yan Pan ©2019 Created by AntD
          </Footer>
        </footer>
      </Layout>
    );
  }
}

export default App;
