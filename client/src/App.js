import { useEffect, useState } from "react";
import { httpGetPlanets } from "./requests";

function App() {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await httpGetPlanets();
        console.log("Received:", data);
        setPlanets(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      {planets.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <>
          {planets.map((planet, index) => (
            <div key={index}>{planet.keplerName}</div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
