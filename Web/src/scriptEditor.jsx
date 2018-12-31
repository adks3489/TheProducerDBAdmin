import React, { Component } from 'react';
import { Provider, observer, inject } from 'mobx-react';
import { observable, action, computed } from 'mobx';
import { List, Input, Button } from 'antd';

import TagSelector from './tagSelector';
import OptionalSelector from './optionalSelector';
import AppState from './store/appState';
import { FILM_TYPES, FILM_TAG, POSITION, CHARA_TAG, GENDER, CHARA_NATION, CHARA_FACTION, CHARA_TYPE } from './types';

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

  onStarChange = e => {
    this.props.appState.currentScript.Star = e.target.value;
  }

  onTypeChange = val => {
    this.props.appState.currentScript.Type = val;
  }

  onTagChange = val => {
    this.props.appState.currentScript.Tags = val;
  }

  onCharaNameChange = e => {
    let idx = parseInt(e.target.dataset.key)
    this.props.appState.currentScript.Characters[idx][0] = e.target.value;
  }

  onCharaPosChange = (idx, val) => {
    this.props.appState.currentScript.Characters[idx][1] = val;
  }

  onCharaTagChange = (idx, val) => {
    this.props.appState.currentScript.Characters[idx][2] = val;
  }

  onCharaGenderChange = (idx, val) => {
    this.props.appState.currentScript.Characters[idx][4] = val;
  }

  onCharaNationChange = (idx, val) => {
    this.props.appState.currentScript.Characters[idx][5] = val;
  }

  onCharaFactionChange = (idx, val) => {
    this.props.appState.currentScript.Characters[idx][6] = val;
  }

  onCharaTypeChange = (idx, val) => {
    this.props.appState.currentScript.Characters[idx][7] = val;
  }

  render() {
    let { appState } = this.props;
    let { currentScript } = appState;
    console.log(currentScript);
    if (typeof currentScript.Name === "string") {
      currentScript.Name = [currentScript.Name];
    }
    return (
      <div style={{ ...this.props.style }}>
        原名 <Input size="small" value={currentScript.OrigName} onChange={this.onOrigNameChange} />
        名稱 <Button icon="plus" size="small" type="primary" onClick={this.onNameAdd} />
        {currentScript.Name.map((o, i) => <Input key={i} size="small" style={{ width: "150px" }} value={o} data-key={i} onChange={this.onNameChange} />)}
        <br />
        <span style={{ marginRight: "10px" }}>
          星級
          <Input maxLength={2} style={{ width: "50px" }} value={currentScript.Star} onChange={this.onStarChange} />
        </span>
        <span>
          片型
          <TagSelector style={{ width: "100px" }} tag={FILM_TYPES} value={currentScript.Type} onChange={this.onTypeChange} />
        </span><br />

        標籤
        <TagSelector tag={FILM_TAG} value={currentScript.Tags} onChange={this.onTagChange} />
        GENDER, CHARA_NATION, CHARA_FACTION, CHARA_TYPE
        角色
        {
          currentScript.Characters.map((o, i) =>
            <div key={i} style={{marginBottom: "5px", borderBottom: "1px solid gray"}}>
              <Input data-key={i} style={{ width: "120px" }} value={o[0]} onChange={this.onCharaNameChange} />
              <TagSelector style={{ width: "100px" }} tag={POSITION} value={o[1]} onChange={this.onCharaPosChange.bind(null, i)} />
              <TagSelector tag={CHARA_TAG} value={o[2]} onChange={this.onCharaTagChange.bind(null, i)} />
              要求：
              <OptionalSelector style={{width:"100px"}} tag={GENDER} value={o[4]} onChange={this.onCharaGenderChange.bind(null, i)} />
              <OptionalSelector style={{width:"100px"}} tag={CHARA_NATION} value={o[5]} onChange={this.onCharaNationChange.bind(null, i)} />
              <OptionalSelector style={{width:"100px"}} tag={CHARA_FACTION} value={o[6]} onChange={this.onCharaFactionChange.bind(null, i)} />
              <OptionalSelector style={{width:"100px"}} tag={CHARA_TYPE} value={o[7]} onChange={this.onCharaTypeChange.bind(null, i)} />
            </div>)
        }

        <Button type="primary" onClick={appState.sendScriptUpdate}>儲存</Button>
      </div>
    );
  }
}
export default ScriptEditor;