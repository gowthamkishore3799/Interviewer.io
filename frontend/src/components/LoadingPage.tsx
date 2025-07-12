import { Spin } from "antd";

export function LoadingScreen(){

    return(
    <>
    <div className="h-screen">
    <Spin tip="Loading" size="small">
        {"Loading"}
      </Spin>
    </div>
    </>
    )
}