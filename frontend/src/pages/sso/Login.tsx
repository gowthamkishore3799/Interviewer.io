import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router";
import { ssoLogin } from "../../api/sso";
import { useAuth } from "../../context/AuthRouter";
import type { UserLogin } from "../../interface/user.types";

export default function LoginPage() {
  const [form] = Form.useForm();
  const nav = useNavigate();
  const { login } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();

  async function loginUser(userDetails: UserLogin) {
    try {
      const { email, password } = userDetails;
      const response = await ssoLogin(email, password);
      if (!response.ok) {
        throw new Error("Error in finding user")
      }
      const res = await response.json();
      login(res.user);
      nav("/", { replace: true });
    } catch (e) {
      messageApi.error({
        content: (
          <span>
            Account not found. Please{" "}
            <a href="/sign-up" style={{ textDecoration: "underline" }}>
              sign up
            </a>{" "}
            or try a different email.
          </span>
        ),
        duration: 2,
      });
    }
  }

  return (
    <div>
      {contextHolder}
      <div className="flex flex-col">
        <Form
          name="login"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: "auto" }}
          form={form}
        >
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
                message: "Please enter your password more than 8 characters",
              },
            ]}
            validateDebounce={1000}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item label={null}>
            <div className="flex gap-5">
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => {
                  loginUser(form.getFieldsValue());
                }}
              >
                Submit
              </Button>
              <Button
                type="default"
                htmlType="button"
                onClick={() => {
                  nav("/sign-up", { replace: true });
                }}
              >
                Sign Up
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
