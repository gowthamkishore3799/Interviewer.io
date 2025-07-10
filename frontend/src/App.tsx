import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./pages/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="login" element={<LoginPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
