import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { observable, action, computed, autorunAsync, autorun } from 'mobx';
import { Tabs } from 'antd';

@inject('appState')
@observer
class App extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    if (!this.props.appState.checkLogin()) {
      document.location.href = 'login';
    }
  }
  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <Tabs activeKey={this.props.appState.CurrentTabKey} onChange={this.props.appState.onTabChange} size="small" style={{ width: "100%", height: "100%" }}>
          <Tabs.TabPane tab="電影" key="1">
            <div style={{ height: "calc(100vh - 55px)" }} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="演員" key="2">
            <div style={{ height: "calc(100vh - 55px)" }} />
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}
export default App;