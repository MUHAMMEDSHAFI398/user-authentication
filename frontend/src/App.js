import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import ErrorPage from "./Pages/ErrorPage";
import HomePage from "./Pages/HomePage";
import FileProcessingPage from "./Pages/FileProcessingPage.";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/file-process" element={<FileProcessingPage />} />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
