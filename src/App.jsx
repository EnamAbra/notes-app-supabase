import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import DashboardLayout from "./layout/DashboardLayout";
import AddNote from "./pages/AddNote";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import { AuthContextProvider } from "../context/AuthContext";
import supabase from "./config/SupabaseClient";
import NoteEditor from "./pages/NoteEditor";


function App() {
  return (
    <AuthContextProvider>
    <Router>
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        
        <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard/>} />
         
          <Route path="add" element={<AddNote />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="noteeditor" element={<NoteEditor/>} />
        </Route>

      </Routes>
    </Router>
    </AuthContextProvider>
  );
}

export default App;

