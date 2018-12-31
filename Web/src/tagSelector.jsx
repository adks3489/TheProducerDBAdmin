import React, { Component } from 'react';
import { Provider, observer, inject } from 'mobx-react';
import { observable, action, computed } from 'mobx';
import { Select } from 'antd';

@observer
class TagSelector extends Component {
  constructor() {
    super();
  }

  onChange = value => {
    this.props.onChange(value);
  }

  render() {
    console.log(this.props)
    if (Array.isArray(this.props.value)) {
      var mode = "multiple";
    }
    else {
      var mode = "default";
    }
    return (
      <Select
        mode={mode}
        style={{ width: '100%' }}
        placeholder="Please select"
        value={this.props.value}
        onChange={this.onChange}
      >
        {this.props.tag.map((o, i) => <Select.Option key={i} title={o} value={i} >{o}</Select.Option>)}
      </Select>
    );
  }
}
export default TagSelector;