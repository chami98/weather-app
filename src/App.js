import { useEffect, useState } from "react";
import "./App.css";
import clear from "./assets/clear.jpg";
import cloudy from "./assets/cloudy.jpg";
import overcast from "./assets/overcast.jpg";
import rainy from "./assets/rainy.jpg";
import snow from "./assets/snow.jpg";

function App() {
  const [place, setplace] = useState("Colombo");
  const [placeInfo, setplaceInfo] = useState({});

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = () => {
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=0d50a5b833b84b7bb5080226220807&q=${place}&days=1&aqi=no&alerts=no`
    )
      .then((response) => response.json())
      .then((data) =>
        setplaceInfo({
          name: data.location.name,
          country: data.location.country,
          farenheit: {
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
    <div
      className="app"
      style={
        placeInfo.condition?.toLowerCase() === "clear" ||
        placeInfo.condition?.toLowerCase() === "sunny"
          ? { backgroundImage: `url(${clear})` }
          : placeInfo.condition?.toLowerCase().includes("cloudy")
          ? { backgroundImage: `url(${cloudy})` }
          : placeInfo.condition?.toLowerCase.includes("rainy")
          ? { backgroundImage: `url(${rainy})` }
          : placeInfo.condition?.toLowerCase().includes("snow")
          ? { backgroundImage: `url(${snow})` }
          : { backgroundImage: `url(${overcast})` }
      }
    >
      <div className="search_input">
        <input
          type="text"
          value={place}
          onChange={(e) => setplace(e.target.value)}
        ></input>

        <button onClick={handleFetch}>Search</button>
      </div>

      <div className="weather-container">
        <div className="top-part">
          <h1>{placeInfo.farenheit?.current}</h1>
          <div className="condition-high-low">
            <h1>{placeInfo.condition}</h1>
            <h1>{placeInfo.farenheit?.high}</h1>
            <h1>{placeInfo.farenheit?.low}</h1>
          </div>
        </div>
        <h2>
          {placeInfo.name}
          {place.country}
        </h2>
      </div>
    </div>
  );
}

export default App;
