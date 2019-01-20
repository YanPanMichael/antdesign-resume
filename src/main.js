// 是项目的JS打包入口文件
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";

// 导入项目的根组件
import App from "./components/App.js";

ReactDOM.render(<HashRouter>
    <App />
  </HashRouter>,
  document.getElementById("antD-resume-root"));
