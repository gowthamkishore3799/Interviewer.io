import { Button, Form, Input, Select, message } from "antd";
import { useNavigate } from "react-router";
import { createJob } from "../../../api/jobs";


export default function AddJob(){
    const nav = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const options = [{
        label: "Full time",
        value: "Full time"
    }, {
        label: "Part time", 
        value: "Part time",
    },{
        lable: "Internship",
        value: "Internship"
    }]

    const handleSubmit = async () => {
      try {
        const input = form.getFieldsValue();
        let formData = new FormData();
        for (let key of Object.keys(input)) {
          formData.append(key, input[key]);
        }
        const response = await createJob(formData);
        if(!response.ok){
            throw new Error("Error in creating job")
        }
        messageApi.success('Job Posted Successfully, Navigating to home in sec');
        setTimeout(()=>{
            nav("/");
        }, 1000)
      } catch (e) {
        console.log(e, "error in creating job");
      }
    };

    // const validateUserInput = (): boolean | undefined =>{
    //   console.log(form.validateFields())
    //   return true;
    // }
    return (
      <div className="h-full flex-col m-10">
        {contextHolder}
        <div>
          <h1 className="text-5xl font-display"> Post a job</h1>
        </div>
        <div className="text-2xl my-10 font-display">
          <p>Tell us about your job</p>
        </div>
        <div>
          <Form form={form} labelCol={{ span: 8 }} onFinish={handleSubmit} autoComplete="off">
            <Form.Item
              label={"Job Title"}
              required={true}
              name="title"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={"Org Name"}
              required={true}
              name="orgName"
              rules={[{ required: true, message: "Please enter the org name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={"Department"}
              required={true}
              name="department"
              rules={[
                { required: true, message: "Please enter department name" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={"Job type"}
              required={true}
              name="roleType"
              rules={[{ required: true, message: "Please enter job type" }]}
            >
              <Select options={options} />
            </Form.Item>
            <Form.Item
              label={"Location"}
              required={true}
              name="location"
              rules={[{ required: true, message: "Please enter job type" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={"Role"}
              required={true}
              name="role"
              rules={[{ required: true, message: "Please enter job role" }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label={"Qualifications"}
              required={true}
              name="qualification"
              rules={[
                { required: true, message: "Please enter the qualification" },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item label={"About the team"} required={false} name={"about"}>
              <Input.TextArea />
            </Form.Item>
            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
}