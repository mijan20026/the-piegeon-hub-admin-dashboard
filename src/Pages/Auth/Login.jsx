import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import FormItem from "../../components/common/FormItem";
import image4 from "../../assets/image4.png";
import googleIcon from "../../assets/google-icon.png";
// import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    navigate("/");
    // Cookies.set('token', token, { expires: 7 })
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-[35px] font-semibold mb-[10px] mt-[20px] text-white">
          Log In
        </h1>
      </div>
      <Form onFinish={onFinish} layout="vertical" requiredMark={false}>
        <Form.Item
          name="email"
          label={
            <p style={{ color: "#ffffff", fontWeight: 500 }}>Email Address</p>
          }
          rules={[
            {
              required: true,
              message: "Please input your Email!",
              type: "email", // optional: validates email format
            },
          ]}
        >
          <Input
            type="email"
            placeholder="Enter your email"
            style={{
              height: 50,
              border: "1px solid #ffffff",
              outline: "none",
              boxShadow: "none",
              borderRadius: 5,
              backgroundColor: "transparent", // ✅ transparent background
              color: "#ffffff", // optional: make text white
            }}
          />
        </Form.Item>

        <Form.Item
          name="password"
          label={<p style={{ color: "#ffffff", fontWeight: 500 }}>Password</p>}
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            type="password"
            placeholder="Enter your password"
            style={{
              height: 50,
              border: "1px solid #ffffff",
              outline: "none",
              boxShadow: "none",
              borderRadius: 5,
              backgroundColor: "transparent", // ✅ transparent background
              color: "#ffffff", // ✅ white text
            }}
          />
        </Form.Item>

        <div className="flex items-center justify-between">
          <Form.Item
            style={{ marginBottom: 0 }}
            name="remember"
            valuePropName="checked"
          >
            {/* <Checkbox>Remember me</Checkbox> */}
          </Form.Item>

          <a
            className="login-form-forgot text-[#ffffff] hover:text-primary rounded-md font-semibold"
            href="/auth/forgot-password"
          >
            Forgot password
          </a>
        </div>

        <Form.Item style={{ marginBottom: 0 }}>
          <button
            htmlType="submit"
            type="submit"
            style={{
              width: "100%",
              height: 45,
              color: "white",
              fontWeight: "400px",
              fontSize: "18px",
              marginTop: 20,
              borderRadius: "5px",
            }}
            className="flex items-center justify-center bg-primary hover:bg-[#1f2682] transition rounded-lg"
          >
            Sign in
          </button>
        </Form.Item>
      </Form>
      {/* <Form.Item style={{ marginBottom: 0 }}>
          <button
            htmlType="submit"
            type="submit"
            style={{
              width: "100%",
              height: 45,
              color: "#1E1E1E",
              fontWeight: "400px",
              fontSize: "18px",
              marginTop: 20,
              borderRadius: "200px",
              border: "1px solid #3FAE6A",
            }}
            className="flex items-center justify-center rounded-lg"
          >
            <img src={googleIcon} alt="Google logo" className="mr-[12px]" />
            Sign in with Google
          </button>
        </Form.Item> */}
      {/* <div className="mt-[20px]">
        <p className="text-center text-[#1E1E1E]">
          Don't have an account?{" "}
          <a
            href="/auth/register"
            className="text-[#3FAE6A] hover:text-[#1E1E1E] font-semibold"
          >
            Sign Up
          </a>
        </p>
      </div> */}
    </div>
  );
};

export default Login;
