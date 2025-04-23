import { BrowserRouter as Router, Routes, Route,Navigate} from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ProtectedRoute from "./components/Protectedroute";
import ReceiptUpload from "./pages/ReceiptUpload";
import MainPage from "./pages/Mainpage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mainpage/*" element={<ProtectedRoute><MainPage/></ProtectedRoute>} />
        <Route path='/upload' element={<ProtectedRoute><ReceiptUpload/></ProtectedRoute>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
