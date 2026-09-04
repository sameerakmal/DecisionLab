import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateDecision from "./pages/CreateDecision";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/decisions" element={<Dashboard />} />
        <Route path="/decisions/new" element={<CreateDecision />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
