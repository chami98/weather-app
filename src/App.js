import { useState } from "react";
import "./App.css";

function App() {
  const [place, setplace] = useState("Colombo");
  const [placeInfo, setplaceInfo] = useState({});

  const handleFetch = () => {
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=0d50a5b833b84b7bb5080226220807&q=${place}&days=1&aqi=no&alerts=no`
    )
      .then((response) => response.json())
      .then((data) =>
        setplaceInfo({
          name: data.location.name,
          country: data.location.country,
          farenhiet: {
            current: data.current.temp_f,
            high: data.forecast.forecastday[0].day.maxtemp_f,
            low: data.forecast.forecastday[0].day.mintemp_f,
          },
          condition: data.current.condition.text,
        })
      );
  };

  console.log(placeInfo);

  return (
    <div className="App">
      <div className="search_input">
        <input
          type="text"
          value={place}
          onChange={(e) => setplace(e.target.value)}
        ></input>

        <button onClick={() => handleFetch()}>Search</button>
      </div>

      <div className="weather-container"></div>
    </div>
  );
}

export default App;
