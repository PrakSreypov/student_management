import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import styles from "./LoginPage.module.css";
import { request } from '../../utils/request';
import { setAccessToken, setIsLogin, setRefreshToken, setUser } from "../../utils/service";

const LoginPage = () => {
  const [msg, setMsg] = useState('');

  const onFinish = async (values) => {
    console.log("Received valuess of form: ", values);

    const param = {
      Username: values.username,
      Password: values.password,
    };

    try {
      const res = await request('user/login', 'post', param);
      console.log('Response:', res);

      // if (res && res.user && res.user.Username) {
      //   setMsg(`Welcome, ${res.user.Username}!`);
      // } else if (res && res.msg) {
      //   setMsg(res.msg);
      // } else {
      //   setMsg('Login failed. Please try again.');
      // }
      if(res.msg){
        setMsg(res.msg);
        setUser(JSON.stringify(res.user)); 
        setIsLogin('1');
        setAccessToken(res.access_token);
        setRefreshToken(res.refresh_token);
        window.location.href = '/admin';
      } else if (res.error){
        if(res.error.Username) setMsg(res.error.Username);
        else setMsg(res.error.Password)
      } 
    } catch (error) {
      console.error('Login failed:', error);
      setMsg('Login failed. Please try again.');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1>Login: {msg}</h1>
      <Form
        name="normal_login"
        className="login-form"
        initialValue={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          <a href="/register" className={styles.register_link}>register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
