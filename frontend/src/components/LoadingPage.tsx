import { Spin } from "antd";
import { useLoading } from "../context/LoadingRouter";

export function GlobalLoader() {
  const { loading } = useLoading();
  if (!loading) return null;
  return (
    <>
      <div className="h-screen">
        <Spin tip="Loading" size="small">
          {"Loading"}
        </Spin>
      </div>
    </>
  );
}