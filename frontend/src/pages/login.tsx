import { Button, Form, Input } from "antd";


export default function LoginPage(){
    const [form] = Form.useForm();

    // handleSubmit
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl z-2">
          <div className="flex flex-col items-center gap-4 m-8">
            <h1 className="text-2xl font-bold text-blue-900 tracking-wide">
              Interviewer.io
            </h1>
            <p className="text-sm text-gray-500">
              AI-Powered Interviewing Assistant
            </p>
          </div>
          <div className="flex flex-col">
            <Form name="login" labelCol={{ span: 6 }} wrapperCol={{span: "auto"}} form={form} onSubmitCapture={(e)=>{
                const result = form.getFieldsValue();
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
              <Form.Item label={null}>
                <div className="flex gap-5">
                <Button type="primary" htmlType="submit" onClick={()=>{
                    console.log("submit..asdasds")
                }}>
                  Submit
                </Button>
                <Button type="default" htmlType="button" onClick={(e)=>{
                    console.log("Default..")
                }}>
                  Sign Up
                </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
}