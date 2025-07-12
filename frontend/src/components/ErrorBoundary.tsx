import { Alert } from "antd";

export default function ErrorBoundary({message}: {message: string}){
    return (
        <div className="mb-4">
            <Alert className="" message={message} type="error" />
        </div>
    )
}