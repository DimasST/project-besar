import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/PagesAdmin";
import HomePage from "./pages/PagesHome";
import LoginPages from "./pages/PagesLogin";
import KasirPages from "./pages/PagesKasir";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/HomeAdmin" element={<AdminPage />} />
        <Route path="/HomeKasir" element={<KasirPages />} />
        <Route path="/Login" element={<LoginPages />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
