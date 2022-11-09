import { useState, useEffect } from "react";
import styled from "styled-components";
import WeatherCard from "./Components/WeatherCard";
import "./weather-icons.css";

function App() {
  const [input, setInput] = useState("Dhaka");

  const [weather, setWeather] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Input can not be empty");
    }
  };

  const getWeather = async () => {
    console.log(input);
    try {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      );

      const response = await data.json();

      const { temp, humidity, pressure } = response.main;
      const { main: weathermood } = response.weather[0];
      const { name } = response;
      const { speed } = response.wind;
      const { country, sunset } = response.sys;

      const weatherResponse = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      setWeather(weatherResponse);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <MainWrapper>
      <div>
        <Wrapper onSubmit={handleSubmit}>
          <SearchBox
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Enter a city name"
          />

          <Button onClick={getWeather} type="submit" value="Search" />
        </Wrapper>
      </div>
      <WeatherCard
        sunset={weather.sunset}
        humidity={weather.humidity}
        pressure={weather.pressure}
        speed={weather.speed}
        temp={weather.temp}
        country={weather.country}
        weathermood={weather.weathermood}
        name={weather.name}
      />
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  font-family: poppins;
  max-width: 650px;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 3rem;
`;

const Wrapper = styled.form`
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.016) 0px 1.1px 1.2px,
    rgba(0, 0, 0, 0.024) 0px 2.5px 2.9px, rgba(0, 0, 0, 0.03) 0px 4.8px 5.4px,
    rgba(0, 0, 0, 0.035) 0px 8.5px 9.6px, rgba(0, 0, 0, 0.043) 0px 15.9px 18px,
    rgba(0, 0, 0, 0.06) 0px 38px 43px;
  border-radius: 4px;
  overflow: hidden;
  max-width: 720px;
`;
const SearchBox = styled.input`
  flex: 1;
  font-size: 1.125rem;
  border: none;
  color: hsl(229, 14%, 15%);
  padding: 8px;
  text-indent: 5px;
  /* @media (max-width: 550px) {
    padding: 4px;
    font-size: 0.875rem;
    width: 100px;
  } */
`;
const Button = styled.input`
  align-items: center;
  background-color: #222;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  font-size: 0.875rem;
  font-weight: 600;
  justify-content: center;
  letter-spacing: 1px;
  text-transform: uppercase;
  width: 130px;

  /* @media (max-width: 550px) {
    width: 80px;
    font-size: 0.75rem;
  } */
  transition: all 0.2s linear;

  &:hover {
    background-color: #0cb90c;
  }
`;

export default App;
