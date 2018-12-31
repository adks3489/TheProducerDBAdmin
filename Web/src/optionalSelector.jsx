import React, { Component } from 'react';
import { Provider, observer, inject } from 'mobx-react';
import { observable, action, computed } from 'mobx';
import { Select } from 'antd';

@observer
class OptionalSelector extends Component {
  constructor() {
    super();
  }

  onChange = value => {
    this.props.onChange(value);
  }

  render() {
    return (
      <Select
        mode="default"
        style={{ width: '100%', ...this.props.style }}
        placeholder="Please select"
        value={this.props.value}
        onChange={this.onChange}
      >
        <Select.Option key={-1} title="不限制" value={null}>不限制</Select.Option>
        {this.props.tag.map((o, i) => <Select.Option key={i} title={o} value={i} >{o}</Select.Option>)}
      </Select>
    );
  }
}
export default OptionalSelector;