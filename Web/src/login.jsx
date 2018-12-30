import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { observable, action, computed, autorunAsync, autorun } from 'mobx';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import MD5 from 'md5.js';

@inject('appState')
@observer
class Login extends Component {
  constructor() {
    super();

  }

  handleSubmit = (e) => {
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      const password = fieldsValue['password'];
      const md5Password = new MD5().update(password).digest('hex');
      fieldsValue['password'] = md5Password;
      this.props.form.setFieldsValue({password:md5Password});
    });
  }

  componentDidMount() {

    this.props.form.setFieldsValue({username:"adks3489", password:"mogirls923"});
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{width:"240px", height:"100%"}}>
        <Form onSubmit={this.handleSubmit} className="login-form" action="http://localhost/login" method="POST">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input name="username" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input name="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            <a className="login-form-forgot" href="">Forgot password</a>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedLogin = Form.create()(Login);

export default WrappedLogin;