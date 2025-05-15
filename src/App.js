import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/ui/login";
import AppContent from "./components/ui/appContent";
import "./App.css";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/app/*" element={<AppContent />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
