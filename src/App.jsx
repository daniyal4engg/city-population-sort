import { useState } from "react";
import "./App.css";
import { AllRoutes } from "./AllRoutes";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>hello</h1>
      <AllRoutes />
    </div>
  );
}

export default App;
