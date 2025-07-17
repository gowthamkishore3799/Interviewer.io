import { Button, Drawer } from "antd";
import { useState } from "react";
import { ROOT_URL } from "../../constants";
import type { Application } from "../../interface/application.types";
import { UserReport } from "./report";

export default function JobApplications({applications}: {applications: Application[]}){

    const [open, setOpen] = useState(false);
    const [selectedType, setSelectedType] = useState("Report");


    const showDrawer = (appType: string) => {
      setOpen(true);
      setSelectedType(appType)
    };
  
    const onClose = () => {
      setOpen(false);
    }

    console.log(applications, "Applications")
    return (
      <div className="flex flex-col gap-5">
        {applications.length > 0 &&
          applications.map((element: Application) => (
            <div
              data-userid={element.userId}
              className="mt-5 mb-5 border border-gray-100 shadow-xl p-5 rounded-2xl grid grid-cols-[1fr_max-content_max-content] gap-10 hover:border-sky-400 border"
            >
              <div>
                <div>
                  <p className="font-display text-xl">{element.name}</p>
                  <a
                    className="font-display text-sm"
                    href={"mailto:" + element.email}
                  >
                    {element.email}
                  </a>
                </div>
              </div>
              <div className="p-4 flex flex-col gap-4 right">
                <div className="w-full text-center">
                  <Button
                    type="primary"
                    className="w-full"
                    onClick={()=>{showDrawer("Report")}}
                  >
                    View Report
                  </Button>
                </div>
              </div>
              <div className="p-4 flex flex-col gap-4 right">
                <div className="w-full text-center">
                  <Button
                    type="primary"
                    className="w-full"
                    onClick={()=>showDrawer("Resume")}
                  >
                    View Resume
                  </Button>
                </div>
              </div>
              <Drawer
                title={selectedType}
                closable={{ "aria-label": "Close Button" }}
                open={open}
                onClose={onClose}
                width={"50%"}
                height={"auto"}
              >
                {selectedType == "Resume" && (<iframe
                  src={ROOT_URL + "/" + element.resume}
                  width="100%"
                  height="100%"
                  title="Resume Viewer"
                  style={{ border: "1px solid #ccc" }}
                />)}
                {selectedType == "Report" && <UserReport analysis={element.atsScore} interviewReport={element.feedback} interviewMetaData={element.interviewMetaData}/>}
              </Drawer>
            </div>
          ))}
      </div>
    );
}