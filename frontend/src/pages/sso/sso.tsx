import { useLocation } from "react-router";
import LoginPage from "./login";
import { SignInPage } from "./signIn";


export default function SSOPage(){
    const {pathname} = useLocation();
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl z-2">
          <div className="flex flex-col items-center gap-4 m-8">
            <h1 className="text-2xl font-bold text-blue-900 tracking-wide">
              Interviewer.io
            </h1>
            <p className="text-sm text-gray-500">
              AI-Powered Interviewing Assistant
            </p>
          </div>
          {pathname == "/login" ?  <LoginPage/>:  <SignInPage/>}
        </div>
      </div>
    );
}