import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { observable, action, computed, autorunAsync, autorun } from 'mobx';
import { Tabs } from 'antd';

@inject('appState')
@observer
class App extends Component {
  render() {
    return (
      <div>
        Init Page
      </div>
    );
  }
}
export default App;