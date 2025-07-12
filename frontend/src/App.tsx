import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "./pages/homePage";
import { SSOPage } from "./pages/sso";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="login" element={<SSOPage/>} />
        <Route path="sign-up" element={<SSOPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
