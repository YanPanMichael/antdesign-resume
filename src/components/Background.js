import React, { Component } from "react";
import PropTypes from "prop-types";

import { Route, Link, Switch } from "react-router-dom";

import BackgroundContent from "./BackgroundContent.js";
import BackgroundDetail from "./BackgroundDetail.js";
import { Layout, Menu, Icon } from "antd";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class Background extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectMenu: 'summary',
    };
    // this.handleChangeMenuFromUrl = this.handleChangeMenuFromUrl.bind(this);
  }

  // componentWillMount() {
  //   this.setState({
  //     selectMenu: this.getOpenedMenuFromUrl() || 'summary',
  //   })
  // }
  
  // componentWillUpdate(nextProps, nextState) {
  //   this.setState({
  //     selectMenu: this.getOpenedMenuFromUrl() || 'summary',
  //   })
  // }
  
  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextState.selectMenu !== this.state.selectMenu
  // }
  
  getOpenedMenuFromUrl() {
    return window.location.hash.split('/')[2];
  }

  // handleChangeMenuFromUrl() {
  //   this.setState({
  //     selectMenu: this.getOpenedMenuFromUrl() || 'summary',
  //   })
  // }

  render() {
    // const { selectMenu } = this.state;
    return (
      <Layout style={{ height: "100%" }}>
        <Sider width={200} style={{ background: "#fff" }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={[this.getOpenedMenuFromUrl()]}
            selectedKeys={[this.getOpenedMenuFromUrl()]}
            style={{ height: "100%", borderRight: 0 }}
            // onClick={this.handleChangeMenuFromUrl}
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
            {/* <Route path="/background/:menu/:page" component={BackgroundContent} /> */}
            {/* 在匹配路由规则的时候，这里提供了两个参数 */}
            {/* 如果想要从 路由规则中，提取 参数，需要使用 this.props.match.params */}
            {/* /movie/detail/2158490 */}
            {/* 注意：哪怕为 路由启用了 exact 精确匹配模式，也会从上到下，把所有的 路由规则匹配一遍 */}
            <Switch>
              {/* 使用 路由中的 Switch 组件，能够指定，如果前面的路由规则优先匹配到了，则放弃匹配后续的路由 */}
              <Route exact path="/background/detail/:id" component={BackgroundDetail}></Route>
              {/* <Route exact path="/background/:menu/:page" component={BackgroundContent}></Route> */}
              <Route exact path="/background/:menu/:page" render={(props) => (<BackgroundContent footerRefHeight={this.props.footerRefHeight} {...props}/>)}></Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

Background.propTypes = {};

export default Background;
