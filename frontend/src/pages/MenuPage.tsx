import { HomeFilled } from "@ant-design/icons/lib/icons";
import { Button, Image, Layout, Menu, Tag } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { JOB_ROLE, JOB_ROLE_TYPE, userDetailsKey } from "../constants";

interface JOB_POSTING{
    "role": string,
    "org": string,
    "icon": string,
    "id": string,
    "jobRole": JOB_ROLE_TYPE,
}
export function MenuPage() {

  const nav = useNavigate();
  const [ userType, setUserType] = useState(null);
  const [collapsed, setCollapsed] = useState(true);

  const recruiterMenu = [{
    key: `Home`,
    icon: <HomeFilled />,
    label: `Home`,
  },{
    key: `Home`,
    icon: <HomeFilled />,
    label: `Home`,
  }]

  useEffect(()=>{

    try{
      let session = sessionStorage.getItem(userDetailsKey) || ""

      if(!session){
        nav("/", {replace: true});
      }

      let userIno = JSON.parse(session)
      setUserType(userIno.candidateType)
    }catch(e){
      console.log(e, "Error in finding candidate type");
    }
   
  }, [])


  const jobs: JOB_POSTING[] = [{
    "role": "Software Engineer",
    "org": "OpenAi",
    "icon": "https://picsum.photos/100",
    "id":"123",
    "jobRole": JOB_ROLE_TYPE.FULL_TIME,
  },{
    "role": "Software Engineer- II",
    "org": "OpenAi",
    "icon": "https://picsum.photos/100",
    "id":"2343",
    "jobRole": JOB_ROLE_TYPE.PART_TIME,
  },{
    "role": "Software Engineer- II",
    "org": "OpenAi",
    "icon": "https://picsum.photos/100",
    "id":"2343",
    "jobRole": JOB_ROLE_TYPE.FULL_TIME,
  },{
    "role": "Software Engineer- II",
    "org": "OpenAi",
    "icon": "https://picsum.photos/100",
    "id":"2343",
    "jobRole": JOB_ROLE_TYPE.INTERNSHIP,
  },{
    "role": "Software Engineer- II",
    "org": "OpenAi",
    "icon": "https://picsum.photos/100",
    "id":"2343",
    "jobRole": JOB_ROLE_TYPE.INTERNSHIP,
  }]
  return (
    <>
      <Layout className="h-full">
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{ overflow: 'auto',
          height: '100vh',
          position: 'sticky',
          insetInlineStart: 0,
          bottom: 0,
          top: 0
          }}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["Home"]}
            mode="inline"
            items={recruiterMenu}
            className="m-40"
          />
        </Sider>
        <Layout>
          <Content>
            <div className="h-full p-10 border-2 border-gray-500 bg-gray-100">
              <div>
                <h3 className="font-display font-bold text-3xl">Listed Jobs</h3>
              </div>
              <div className="flex flex-col">
                {jobs.map((element) => (
                  <div className="mt-5 mb-5 border shadow-xl p-5 rounded-2xl grid grid-cols-[max-content_max-content_max-content] gap-10 hover:border-sky-400 border" onClick={(e)=>{ console.log(e, "Clicked..")}}>
                    <div>
                      <Image
                        src={element.icon}
                        className="rounded-xl"
                      />
                    </div>
                    <div>
                      <div><p className="font-display font-bold text-2xl">{element.role}</p></div>
                      <div><p className="font-display text-xl">{element.org}</p></div>
                    </div>
                    <div className="gap-4">
                      <div className="m-4"><Tag color={JOB_ROLE[element.jobRole].color}>{element.jobRole}</Tag></div>
                      <div><Button type="primary">View</Button></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
