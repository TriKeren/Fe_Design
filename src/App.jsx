import { Route, Routes, BrowserRouter } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import DetailPage from "./pages/DetailPage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import MembershipPage from "./pages/Membership"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/product/:title" element={<DetailPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/membership" element={<MembershipPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
