import React, { Component } from 'react';
import { Provider, observer, inject } from 'mobx-react';
import { observable, action, computed } from 'mobx';
import { List, Input, Icon } from 'antd';
import ScriptEditor from './scriptEditor';

@inject('appState')
@observer
class Scripts extends Component {
  @observable scriptFilter = null;

  constructor() {
    super();
  }

  onScriptFilterChange = e => {
    this.scriptFilter = e.target.value;
  }

  onScriptFilterClear = e => {
    this.scriptFilter = null;
    this.Filter.focus();
  }

  onItemClick = (e) => {
    this.props.appState.currentScriptKey = e.target.dataset.key;
  }

  @computed get filteredScripts() {
    if(this.scriptFilter) {
      return this.props.appState.scripts.filter(o=>{
        if(o.OrigName?.includes(this.scriptFilter)){
          return true;
        }
        if(Array.isArray(o.Name)){
          for(let name of o.Name){
            if(name.includes(this.scriptFilter)){
              return true;
            }
          }
          return false;
        }
        else{
          return o.Name?.includes(this.scriptFilter);
        }
      });
    }
    else {
      return this.props.appState.scripts;
    }
  }

  render() {
    let { appState } = this.props;
    return (
      <div style={{ ...this.props.style }}>
        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ width: "240px", height: "100%" }}>
            <Input value={this.scriptFilter} onChange={this.onScriptFilterChange} placeholder="過濾"
              ref={o=>{this.Filter=o}} suffix={<Icon type="close-circle" onClick={this.onScriptFilterClear} />}
            />
            <List
              style={{ height: "calc(100% - 40px)", overflowY: "auto" }}
              size="small"
              itemLayout="horizontal"
              dataSource={this.filteredScripts}
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
          <div style={{ flex: 1, height: "100%", overflowY: "auto" }}>
            {appState.currentScriptKey && <ScriptEditor />}
          </div>
        </div>
      </div>
    );
  }
}
export default Scripts;