import React, { Component } from 'react';
import { Provider, observer, inject } from 'mobx-react';
import { observable, action, computed } from 'mobx';
import { List, Input } from 'antd';
import ScriptEditor from './scriptEditor';

@inject('appState')
@observer
class Scripts extends Component {
  constructor() {
    super();
  }

  onItemClick = (e) => {
    this.props.appState.currentScriptKey = e.target.dataset.key;
  }

  render() {
    let { appState } = this.props;
    return (
      <div style={{ ...this.props.style }}>
        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ width: "240px", height: "100%" }}>
            <Input />
            <List
              style={{ height: "calc(100% - 40px)", overflowY: "auto" }}
              size="small"
              itemLayout="horizontal"
              dataSource={appState.scripts}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={<a data-key={item.key} onClick={this.onItemClick}>{item.OrigName}</a>}
                    description={<a data-key={item.key} onClick={this.onItemClick}>{Array.isArray(item.Name) ? item.Name.join(', ') : item.Name}</a>}
                  />
                </List.Item>
              )}
            />
          </div>
          <div>
            {appState.currentScriptKey && <ScriptEditor />}
          </div>
        </div>
      </div>
    );
  }
}
export default Scripts;