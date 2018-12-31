import React, { Component } from 'react';
import { Provider, observer, inject } from 'mobx-react';
import { observable, action, computed } from 'mobx';
import { List, Input, Button } from 'antd';

import TagSelector from './tagSelector';
import AppState from './store/appState';
import { FILM_TYPES, FILM_TAG } from './types';

/**
 * @augments {Component<{appState: AppState}, {}>}
 */
@inject('appState')
@observer
class ScriptEditor extends Component {
  constructor() {
    super();
  }

  onOrigNameChange = e => {
    this.props.appState.currentScript.OrigName = e.target.value;
  }

  onNameAdd = e => {
    this.props.appState.currentScript.Name.push("");
  }

  onNameChange = e => {
    let idx = parseInt(e.target.dataset.key);
    if (e.target.value == "") {
      this.props.appState.currentScript.Name.splice(idx, 1);
      return;
    }

    this.props.appState.currentScript.Name[idx] = e.target.value;
  }

  onTypeChange = val => {
    this.props.appState.currentScript.Type = val;
  }

  onTagChange = val => {
    this.props.appState.currentScript.Tags = val;
  }

  render() {
    let { appState } = this.props;
    console.log(appState.currentScript);
    if (typeof appState.currentScript.Name === "string") {
      appState.currentScript.Name = [appState.currentScript.Name];
    }
    return (
      <div style={{ ...this.props.style }}>
        原名 <Input value={appState.currentScript.OrigName} onChange={this.onOrigNameChange} />
        名稱 <Button icon="plus" size="small" type="primary" onClick={this.onNameAdd} />
        {appState.currentScript.Name.map((o, i) => <Input key={i} value={o} data-key={i} onChange={this.onNameChange} />)}

        片型
        <TagSelector tag={FILM_TYPES} value={appState.currentScript.Type} onChange={this.onTypeChange} />

        標籤
        <TagSelector tag={FILM_TAG} value={appState.currentScript.Tags} onChange={this.onTagChange} />

        角色

        <Button type="primary" onClick={appState.sendScriptUpdate}>儲存</Button>
      </div>
    );
  }
}
export default ScriptEditor;