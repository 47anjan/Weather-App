import React from "react";
import { CloudRain, Sun, Sunset } from "react-feather";
import styled from "styled-components";
import { useEffect } from "react";
import { useState } from "react";

const WeatherCard = ({
  temp,
  humidity,
  pressure,
  weathermood,
  name,
  speed,
  country,
  sunset,
}) => {
  const [weatherState, setWeatheState] = useState("");

  useEffect(() => {
    if (weathermood) {
      switch (weathermood) {
        case "Clouds":
          setWeatheState("wi-day-cloudy");
          break;
        case "Haze":
          setWeatheState("wi-fog");
          break;
        case "Clear":
          setWeatheState("wi-day-sunny");
          break;
        case "Mist":
          setWeatheState("wi-dust");
          break;

        default:
          setWeatheState("wi-day-sunny");
          break;
      }
    }
  }, [weathermood]);

  // converting the seconds into time
  let sec = sunset;
  let date = new Date(sec * 1000);
  let timeStr = `${date.getHours()}:${date.getMinutes()}`;

  return (
    <Wrapper>
      <div className="top-box">
        <i className={`wi ${weatherState}`}></i>
      </div>
      <div className="middle-box">
        <div className="info">
          <div className="temp">
            <span>{temp}&deg;</span>
          </div>
          <div className="location">
            <div className="somke">{weathermood}</div>
            <div className="country">
              {name}, <span>{country}</span>
            </div>
          </div>
        </div>
        <div className="times">
          <span className="date"> {new Date().toLocaleString()} </span>
        </div>
      </div>

      <div className="bottom-box">
        <div className="top-icon-box">
          <div className="icons">
            <Sunset size={30} />
            <div className="icon-info">
              <span>{timeStr} PM</span>
              <span>Sunset</span>
            </div>
          </div>
          <div className="icons">
            <i className={"wi wi-humidity"}></i>
            <div className="icon-info">
              <span>{humidity}</span>
              <span>Humidity</span>
            </div>
          </div>
        </div>

        <div className="bottom-icon-box">
          <div className="icons">
            <CloudRain size={30} />
            <div className="icon-info">
              <span>{pressure}</span>
              <span>Pressure</span>
            </div>
          </div>
          <div className="icons">
            <i className={"wi wi-strong-wind"}></i>
            <div className="icon-info">
              <span>{speed}</span>
              <span>Speed</span>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-family: poppins;
  box-shadow: 0 4px 10px #2f2f2f;
  overflow: hidden;
  border-radius: 4px;
  cursor: pointer;

  .top-box {
    text-align: center;
    padding-block: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    i {
      font-size: 110px;
      color: #222;
      &:hover {
      }
    }
  }
  .middle-box {
    display: flex;
    align-items: center;
    height: 130px;
    @media (max-width: 585px) {
      flex-direction: column;
      height: 220px;
    }
  }
  .temp {
    font-size: 65px;
    margin-right: 40px;
  }
  .info {
    display: flex;
    align-items: center;
    flex-basis: 70%;
    @media (max-width: 585px) {
      flex-basis: 100%;
      width: 100%;
      padding-block: 0.5rem;
      justify-content: center;
    }
    flex-shrink: 1000;
    background-color: #222;
    color: white;
    height: 100%;
    padding-inline: 1rem;
  }
  .country {
    font-size: 16px;
    font-weight: 500;
  }
  .somke {
    font-size: 22px;
    line-height: 1.4;
  }
  .times {
    font-size: 26px;
    flex-basis: 30%;
    display: grid;

    place-content: center;
    @media (max-width: 585px) {
      flex-basis: 100%;
      width: 100%;
      padding-block: 1rem;
      span {
        line-height: 1.4;
      }
    }
    font-weight: 800;
    align-items: center;
    flex-shrink: 50;
    color: white;
    justify-content: center;
    background-color: #0cb90c;
    height: 100%;
    padding-inline: 1rem;
  }
  .date {
    display: block;
    margin-left: 0.5rem;
  }
  .bottom-box {
    display: flex;
    align-items: center;
    padding: 2rem 1.5rem;
    color: #222;
    font-weight: 500;
    @media (max-width: 585px) {
      flex-direction: column;
      gap: 2rem;
    }
  }
  .icons {
    display: flex;
    align-items: center;
    gap: 1.1rem;
    i {
      font-size: 30px;
      color: #222;
    }
    transition: scale 0.3s linear;
  }
  .icon-info {
    display: flex;
    flex-direction: column;
    span {
      line-height: 1.25;
    }
  }
  .top-icon-box,
  .bottom-icon-box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    @media (max-width: 585px) {
      gap: 3rem;
    }
    .icons {
      flex: 1;
      justify-content: center;
      align-items: center;
    }
  }
`;

export default WeatherCard;
