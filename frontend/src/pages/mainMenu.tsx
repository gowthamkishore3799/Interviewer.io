import { HomeFilled, PlusCircleOutlined } from "@ant-design/icons/lib/icons";
import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { SiGooglemeet } from "react-icons/si";
import { Outlet, useLocation, useNavigate } from "react-router";
import { ROUTE_PATH } from "../constants";
import { useAuth } from "../context/AuthRouter";

export function MenuPage() {

  const nav = useNavigate();
  const { pathname } = useLocation();
  const [selectedMenu, setSelectedMenu] = useState(["home"])

  
  useEffect(() => {

    const root = pathname.split('/')[1] == "" ? ["home"] : [pathname.split('/')[1]];
    setSelectedMenu([...root])
  }, [location.pathname]);

  const {user} = useAuth();
 
  const [menu, setMenu] = useState([{
    key: `home`,
    icon: <HomeFilled />,
    label: `Home`,
  }])

  useEffect(() => {
    const candidateMenu = [
      {
        key: "interview",
        icon: <SiGooglemeet />,
        label: "Interview",
      },
    ];

    const recruiterMenu = [
      {
        key: "add",
        icon: <PlusCircleOutlined />,
        label: "Add Job",
      },
    ];

    const menuToAdd =
      user?.candidateType === "Candidate" ? candidateMenu : recruiterMenu;

      setMenu((prevMenu) => {
        const existingKeys = new Set(prevMenu.map((item) => item.key));
        const filteredNewItems = menuToAdd.filter((item) => !existingKeys.has(item.key));
        return [...prevMenu, ...filteredNewItems];
      });
  }, [user?.candidateType]);


  
  return (
    <>
      <Layout className="h-full">
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "sticky",
            insetInlineStart: 0,
            bottom: 0,
            top: 0,
          }}
        >
          <div className="demo-logo-vertical" />
          <div className="flex gap-4 m-4 items-center justify-center bg-gray-750">
            <span className="text-red-500 text-white ">Interviewer.io</span>
          </div>
          <Menu
            theme="dark"
            defaultSelectedKeys={selectedMenu}
            selectedKeys={selectedMenu}
            mode="inline"
            items={menu}
            className="m-40"
            onClick={(e)=>{
              nav(ROUTE_PATH[e.key])
            }}
          />
        </Sider>
        <Layout>
          <Content>
            <div className="h-full p-10 border-2 border-gray-500 bg-gray-100">
              <Outlet/>
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
