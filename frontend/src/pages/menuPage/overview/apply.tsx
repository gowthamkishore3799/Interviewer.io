import { InboxOutlined } from "@ant-design/icons";
import { Button, Upload, message, type UploadProps } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
import { applyJob } from "../../../api/jobs";

const { Dragger } = Upload;

export default function ResumeUploader({jobId, userId}: {jobId: string, userId: string}) {
  const [file, setFile] = useState<any>(null);
  const nav = useNavigate()
  const [messageApi, contextHolder] = message.useMessage();

  const props: UploadProps = {
    name: "file",
    multiple: false,
    customRequest: ({ onSuccess }: any) => {
      onSuccess("ok")
    },
    beforeUpload: (file) => {
      setFile(file); 
      return false; 
    },
    onChange(info) {
      const { status } = info.file;
      console.log("Selected file:", info.file);
      if (status === "done") {
        messageApi.success({
            content: `${info.file.name} uploaded successfully`
        });
      } else if (status === "error") {
        messageApi.error({
            content: `${info.file.name} upload failed`
        });
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handleApply = async () => {
    if (!file) {
        messageApi.error({
            content: "Please upload your resume first."
        });
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("userId", userId);
    formData.append("jobId", jobId);

    try {
      const response = await applyJob(formData)
      

      if (!response.ok) throw new Error("Upload failed");

      messageApi.success({
        content: "Resume uploaded and application submitted! Redirecting to Home automatically",
        duration: 3
      });
    setTimeout(()=>{
        nav("/")
    }, 2000)
    } catch (err) {
      console.error(err);
      message.error("Upload failed. Try again.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
        {contextHolder}
      <Dragger {...props} fileList={file ? [file] : []}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag your resume here to upload
        </p>
      </Dragger>

      <div className="w-full flex justify-center">
        <Button type="primary" onClick={handleApply}>
          Apply
        </Button>
      </div>
    </div>
  );
}
