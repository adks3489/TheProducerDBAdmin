import React, { Component } from 'react';
import { Provider, observer, inject } from 'mobx-react';
import { observable, action, computed, autorunAsync, autorun } from 'mobx';
import { Tabs } from 'antd';
import Scripts from './scripts';

import AppState from './store/appState';

let appState = new AppState();

@observer
class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Provider appState={appState}>
        <div style={{ width: "100%", height: "100%" }}>
          <Tabs activeKey={appState.CurrentTabKey} onChange={appState.onTabChange} size="small" style={{ width: "100%", height: "100%" }}>
            <Tabs.TabPane tab="電影" key="1">
              <Scripts style={{ height: "calc(100vh - 55px)" }} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="演員" key="2">
              <div style={{ height: "calc(100vh - 55px)" }} />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </Provider>
    );
  }
}
export default App;