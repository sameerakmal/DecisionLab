import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateDecision from "./pages/CreateDecision";
import DecisionDetails from "./pages/DecisionDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/decisions" element={<Dashboard />} />
        <Route path="/decisions/new" element={<CreateDecision />} />
        <Route path="/decisions/:id" element={<DecisionDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
