import { Button, Form, Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
import { login } from "../../api/sso";
import ErrorBoundary from "../../components/errorBoundary";
import { userDetailsKey } from "../../constants";

interface UserDetails{
  email: string;
  password: string
}

export default function LoginPage(){
    const [form] = Form.useForm();
    const nav = useNavigate();


async function loginUser(userDetails: UserDetails) {
  try {
    const { email, password } = userDetails;
    const response = await login(email, password);
    const res = await response.json();


    if (!res.success) {
      setErrorMessage(res.message);
      return;
    }
    sessionStorage.setItem(userDetailsKey, JSON.stringify(res.user));
    nav("/", { replace: true });
  } catch (e) {
    setErrorMessage("User not found");
  }
}


    const [errorMessage, setErrorMessage]= useState("");

    return (
       <div>
          <div className="flex flex-col">
            <Form name="login" labelCol={{ span: 6 }} wrapperCol={{span: "auto"}} form={form} onSubmitCapture={(e)=>{
                const result = form.getFieldsValue();
                console.log(result, "REsult")
            }}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email address!",
                  },
                  {
                    type: "email",
                    message: "Please enter a valid email address",
                  },
                ]}
                validateDebounce={1000}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                  {
                    min: 8,
                    message:
                      "Please enter your password more than 8 characters",
                  },
                ]}
                validateDebounce={1000}
              >
                <Input.Password />
              </Form.Item>
              {errorMessage ? <ErrorBoundary message={errorMessage} /> : ("")}
              <Form.Item label={null}>
                <div className="flex gap-5">
                <Button type="primary" htmlType="submit" onClick={()=>{
                    loginUser(form.getFieldsValue())
                }}>
                  Submit
                </Button>
                <Button type="default" htmlType="button" onClick={(e)=>{
                    nav("/sign-up", {replace: true})
                }}>
                  Sign Up
                </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
          </div>
    );
}