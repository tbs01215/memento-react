import styled from "styled-components";
import { useEffect, useState } from "react";
import { getWeatherData } from "./../../APIs/weatherMap";

const WeatherContainer = styled.section`
  display: flex;
`;
const Img = styled.img`
  height: 80px;
`;
export default function Weather() {
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude: lat, longitude: lon } = pos.coords;

          const weatherData = await getWeatherData([lat, lon]);
          // console.log(weatherData);
          setIsLoading(false);
          const currentWeather = weatherData.weather[0].main;
          const currentTemp = weatherData.main.temp - 273.15;
          const weatherIcon = weatherData.weather[0].icon;
          setWeatherData({ currentWeather, currentTemp, weatherIcon });
        },
        (err) => {
          alert(
            "위치 추적을 허용하지 않았거나 크롬 브라우저가 아닌 경우 날씨가 표시되지 않을 수 있습니다."
          );
          console.error(err);
        }
      );
    }
  }, []);

  return (
    <WeatherContainer>
      {isLoading ? (
        "~ Loading ~"
      ) : (
        <>
          <div>
            <div>{weatherData.currentWeather}</div>
            <div>{Math.round(weatherData.currentTemp)}°C</div>
          </div>
          <Img
            src={`http://openweathermap.org/img/wn/${weatherData.weatherIcon}@2x.png`}
          ></Img>
        </>
      )}
    </WeatherContainer>
  );
}
