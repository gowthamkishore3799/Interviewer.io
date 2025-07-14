import { Button, Form, Input, Radio, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
import { signUp } from "../../api/sso";
import type { UserSignIn } from "../../interface/user.types";

export function SignInPage(){
    const [form] = Form.useForm();
    const nav = useNavigate();
    const [userType, setUserType] = useState("candidate")
    const [messageApi, contextHolder] = message.useMessage();

    async function createUser(formValues: UserSignIn){
        try {
            const { email, password, candidateType, name } = formValues;


            messageApi.open({
                type: 'loading',
                content: 'Action in progress..',
                duration: 0,
             });
            const response = await signUp(name, email, password, candidateType);
            const res = await response.json();
        

            messageApi.destroy()
            if (!res.success) {
                messageApi.open({
                  type: "error",
                  content: "Failed to create user",
                  duration: 3,
                });
              return;
            }

            messageApi.open({
                type: 'success',
                content: 'User Created Successfully, Redirecting in 3sec ',
                duration: 3,
             })

             setTimeout(()=>{
                nav("/login", { replace: true });
             }, 3000)
          } catch (e) {
            messageApi.open({
                type: "error",
                content: "Failed to create user",
                duration: 3
            })
          }
    }

    return (
      <div>
        {contextHolder}
        <Form
          form={form}
          labelCol={{ span: "9", offset: "1" }}
          wrapperCol={{ span: "auto" }}
          labelAlign="right"
        >
          <Form.Item
            label={"Name"}
            rules={[{ required: true, message: "Please enter your name" }]}
            required={true}
            name="name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[
              { required: true, message: "Please enter your email" },
              {
                type: "email",
                message: "Please enter a valid email address",
              },
            ]}
            required={true}
            label="Email"
            name="email"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"Password"}
            rules={[{ required: true, message: "Please enter your password" }, {min: 8, message: "Please enter password more than 8 characters"}]}
            required={true}
            name="password"
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label={"Confirm Password"}
            rules={[
              { required: true, message: "Please enter your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
            required={true}
            name={"confirmPassword"}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label={null}
            rules={[
              { required: true, message: "Please select one of the option" },
            ]}
            required={true}
            name={"candidateType"}
          >
            <Radio.Group
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              options={[
                { value: "Candidate", label: "Candidate" },
                { value: "Recruiter", label: "Recruiter" },
              ]}
            />
          </Form.Item>
          <Form.Item label={null}>
            <div className="flex gap-5">
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => {
                  createUser(form.getFieldsValue());
                }}
              >
                Sign Up
              </Button>
              <Button
                type="default"
                htmlType="button"
                onClick={()=>nav("/login", { replace: true })}
              >
                Login
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    );
}