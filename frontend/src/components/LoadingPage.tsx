import { Spin } from "antd";

export function GlobalLoader() {
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <Spin tip="Loading" size="large"/>
      </div>
    </>
  );
}