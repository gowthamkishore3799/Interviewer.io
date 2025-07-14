import { BrowserRouter, Route, Routes } from "react-router";
import { AuthProvider } from "./context/AuthRouter";
import { LoadingRouter } from "./context/LoadingRouter";
import { Layout } from "./pages/Layout";
import AddJob from "./pages/menuPage/overview/addJob";
import { Home } from "./pages/menuPage/overview/home";
import ViewJob from "./pages/menuPage/overview/viewJob";
import SSO from "./pages/sso/sso";

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
          </Route>
        </Routes>
      </AuthProvider>
      </LoadingRouter>
    </BrowserRouter>
  );
}

export default App
