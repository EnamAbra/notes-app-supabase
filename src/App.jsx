import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import DashboardLayout from "./layout/DashboardLayout";
import AddNote from "./pages/AddNote";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";


function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        
        <Route path="/dashboard" element={<DashboardLayout />}>
         
          <Route path="add" element={<AddNote />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;

