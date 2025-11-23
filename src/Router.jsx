import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard";
import Stats from "./stats";
export function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/code/:code" element={<Stats />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
