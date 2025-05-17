import "./App.css";
import { useEffect } from "react";
import { httpGetPlanets } from "./requests";
function App() {
  useEffect(() => {
    const test = httpGetPlanets();
    console.log(test);
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
