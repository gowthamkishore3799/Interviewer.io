import { Button, Card, Empty, List, Modal, Tag, Typography, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { createInterviewId, findAppliedJobs } from "../../api/jobs";
import { GlobalLoader } from "../../components/LoadingPage";
import { INTERVIEW_STATUS, INTERVIEW_STATUS_COLOR_CODES, type Application } from "../../constants";
import { useAuth } from "../../context/AuthRouter";

const { Title, Text: AntText } = Typography;




export default function AppliedJobsList() {

    const [applications, setApplications] = useState<Application[]>([]);
    const {user} = useAuth();
    const nav = useNavigate();

    const [modal, contextHolder] = Modal.useModal();
    const [messageApi, ctxHolder] = message.useMessage();

    if(!user){
        return <GlobalLoader/>
    }

    const {userId} = user

    useEffect(()=>{
        fetchAppliedJobs();
    }, [])

    async function fetchAppliedJobs(){
        try{
            const response = await findAppliedJobs(userId)
            if(!response.ok){
                throw new Error("Error in fetching applied jobs")
            }

            const data = await response.json();
            const interviews: Application[] = data.interviews;
            setApplications(interviews);
        }catch(e){
            console.log(e, "Error in fetching jobs")
        }
        
    }

    const startInterview = async (jobId: string, userId: string) =>{
      try{
        const response = await createInterviewId(jobId, userId)

        if(!response.ok){
          throw new Error("Error in creating interview")
        }

        const data = await response.json();

        countDown(data.interviewId)
      } catch(e){
        console.log(e, "error")
        messageApi.error({
          content: "Failed to create interview",
          duration: 4
        })
      }
      
    }

    const countDown = (interviewId: string) => {
        let secondsToGo = 5;
    
        const instance = modal.success({
          title: 'Good Luck!',
          content: `Your interview will begin in ${secondsToGo} second.`,
          okButtonProps: { style: { display: 'none' } }
        });
    
        const timer = setInterval(() => {
          secondsToGo -= 1;
          instance.update({
            content: `Your interview will begin in  ${secondsToGo} second.`,
          });
        }, 1000);
    
        setTimeout(() => {
          clearInterval(timer);
          instance.destroy();
          nav(`/interview/${interviewId}`)
        }, secondsToGo * 1000);
        
      };

  return (
    <>
   {contextHolder}
   {ctxHolder}
    <Card
      title={<Title level={4}>Your Job Applications</Title>}
      className="shadow-md"
    >
      <List
        itemLayout="vertical"
        dataSource={applications}
        locale={{
          emptyText: (
            <Empty description="You haven't applied for any jobs yet." />
          ),
        }}
        renderItem={(item) => (
          <List.Item key={item._id}>
            <List.Item.Meta
              title={
                <div className="flex flex-row sm:flex-row sm:items-center sm:justify-between">
                  <AntText strong>{item.title}</AntText>
                  <div>
                  <Tag color={INTERVIEW_STATUS_COLOR_CODES[item.status].color || INTERVIEW_STATUS_COLOR_CODES[INTERVIEW_STATUS.INTERVIEW_PENDING].color }>
                    {INTERVIEW_STATUS_COLOR_CODES[item.status].label}
                  </Tag>
                  {item.status == INTERVIEW_STATUS.INTERVIEW_PENDING && (
                    <Button type="primary" onClick={()=> {
                      startInterview(item.jobId, userId)
                    }}>Start Interview</Button>
                  )}
                  </div>
                </div>
              }
              description={
                <>
                  <AntText>{item.orgName}</AntText> &nbsp;·&nbsp;
                  <AntText type="secondary">{item.roleType}</AntText>
                </>
              }
            />
          </List.Item>
        )}
      />
    </Card>
    </>
  );
}
