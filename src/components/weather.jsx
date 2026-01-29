import { useState } from "react";
import "./Weather.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "1d9cabd5a48a1eeb67ad9177a4de7be0";

  const getWeather = async () => {
    if (!city) {
      setError("Please enter a city");
      return;
    }

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      const result = await res.json();

      if (result.cod !== 200) {
        setError("City not found");
        setData(null);
        return;
      }

      setData(result);
      setError("");
    } catch {
      setError("Something went wrong");
    }
  };

  return (
    <div className="weather-container">
      <div className="weather-icon">🌦️Weather</div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city / state / country"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && getWeather()}
        />
        <button onClick={getWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {data && (
        <div className="weather-info">
          <h2>{data.name}, {data.sys.country}</h2>
          <div className="temp">{data.main.temp}°C</div>
          <div className="desc">{data.weather[0].main}</div>

          <div className="extra">
            <span>💧 {data.main.humidity}%</span>
            <span>🌬️ {data.wind.speed} m/s</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;