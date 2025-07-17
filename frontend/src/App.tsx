import { BrowserRouter, Route, Routes } from "react-router";
import { AuthProvider } from "./context/AuthRouter";
import { LoadingRouter } from "./context/LoadingRouter";
import { Layout } from "./pages/Layout";
import Interview from "./pages/candidate/interview";
import { Home } from "./pages/home";
import InterviewUI2 from "./pages/interviewV2";
import AddJob from "./pages/recruiter/createJobPosting";
import SSO from "./pages/sso/sso";
import ViewJob from "./pages/viewJob";

function App() {
  return (
    <BrowserRouter>
    <LoadingRouter>
      <AuthProvider>
        <Routes>
          <Route path="login" element={<SSO />} />
          <Route path="sign-up" element={<SSO />} />

          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="add" element={<AddJob />} />
            <Route path="job/:jobId" element={<ViewJob />} />
            <Route path="/interview" element={<Interview/>}/>
          </Route>
          <Route path ="/interview/:interviewId" element={<InterviewUI2/>}/>
        </Routes>
      </AuthProvider>
      </LoadingRouter>
    </BrowserRouter>
  );
}

export default App
