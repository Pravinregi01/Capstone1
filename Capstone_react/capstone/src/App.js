import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage/Homepage";
import Dashboard from "./DashBoard/Main";
import Chart from "./DashBoard/Chart";

function App() {
  return (

      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/:stateName" element={<Dashboard/>}></Route>
        <Route path="/chart" element={<Chart/>}></Route>
      </Routes>

  );
}

export default App;
