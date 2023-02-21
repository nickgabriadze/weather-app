"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppSelector } from "../(store)/store";
import contentstyle from "../(styles)/content.module.css";
import Image from "next/image";
import windPowerIcon from "public/wind-power-icon.svg";
import precipitationIcon from "public/precipitation-icon.svg";
import descriptionIcon from "public/description-icon.svg";
import LoadingPage from "./loadingPage";

const icons: { [key: string]: string } = {
  "clear-day": "/weather/clear-day.svg",
  "clear-night": "/weather/clear-night.svg",
  cloudy: "/weather/cloudy.svg",
  fog: "/weather/fog.svg",
  hail: "/weather/hail.svg",
  "partly-cloudy-day": "/weather/partly-cloudy-day.svg",
  "partly-cloudy-night": "/weather/partly-cloudy-night.svg",
  "rain-snow-showers-day": "/weather/rain-snow-showers-day.svg",
  "rain-snow-showers-night": "/weather/rain-snow-showers-night.svg",
  rain: "/weather/rain.svg",
  "showers-day": "/weather/showers-day.svg",
  "showers-night": "/weather/showers-night.svg",
  sleet: "/weather/sleet.svg",
  "snow-showers-day": "/weather/snow-showers-day.svg",
  "snow-showers-night": "/weather/snow-showers-night.svg",
  snow: "/weather/snow.svg",
  "thunder-rain": "/weather/thunder-rain.svg",
};

const weekDays: { [key: number]: string } = {
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thur",
  5: "Fri",
  6: "Sat",
  7: "Sun",
};

const Content = () => {
  const [weatherData, setWeatherData] = useState<any>();
  const [error, setError] = useState<string>();
  const [loadingPhase, setLoadingPhase] = useState<boolean>(true);
  const city = useAppSelector((state) => state.weather.city);
  const [expand, setExpand] = useState<boolean>(false);

  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=hours&key=${process.env.NEXT_PUBLIC_API_KEY}&contentType=json`;

  useEffect(() => {
    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        setLoadingPhase(false);
        setWeatherData(data);
      });
  }, [url, loadingPhase]);

  const currentHourData = () => {
    if (!loadingPhase) {
      const currentData = weatherData.days[0].hours.filter(
        (eachObject: any) => {
          return (
            new Date().getHours() === Number(eachObject.datetime.slice(0, 2))
          );
        }
      );

      return currentData[0];
    }
  };

  let formattedTime = `${
    new Date().getHours() > 9
      ? new Date().getHours()
      : "0" + new Date().getHours()
  }:${
    new Date().getMinutes() > 9
      ? new Date().getMinutes()
      : "0" + new Date().getMinutes()
  }`;

  return (
    <>
      {loadingPhase ? (
        <LoadingPage />
      ) : (
        <div className={contentstyle["content-wrapper"]}>
          <div className={contentstyle["header"]}>
            <div className={contentstyle["header-content"]}>
              <div className={contentstyle['timestamp-seeweekly']}>
                <h2 className={contentstyle["day-txt"]}>
                  {`${weekDays[new Date().getDay()]}, ${formattedTime}`}
                </h2>
                <Link href={`/weekly/${city}`} className={contentstyle['weekly']} ><h2>See weekly forecast</h2></Link>
              </div>

              <div className={contentstyle["city-icon"]}>
                <h1 className={contentstyle["city-txt"]}>
                  {" "}
                  {weatherData.resolvedAddress.split(",")[0]}{" "}
                </h1>
                <h1 className={contentstyle["temperature"]}>
                  {Math.round(currentHourData().temp)}&deg;
                </h1>
                <Image
                  src={icons[currentHourData().icon]}
                  height={60}
                  width={60}
                  alt={currentHourData().icon}
                />
              </div>
            </div>

            <div className={contentstyle["current-weather-info"]}>
              <Image
                src={windPowerIcon}
                height={60}
                width={60}
                alt={"Wind Power icon"}
              />
              <h1>{currentHourData().windspeed}km/ph</h1>
            </div>

            <div className={contentstyle["current-weather-info"]}>
              <Image
                src={precipitationIcon}
                height={60}
                width={60}
                alt={"Water Drop icon"}
              />
              <div className={contentstyle["precip"]}>
                <h1>{currentHourData().precip}mm</h1>
                <p>{currentHourData().precipprob}%</p>
              </div>
            </div>

            <div className={contentstyle["current-weather-info-desc"]}>
              <Image
                src={descriptionIcon}
                height={60}
                width={60}
                alt={"Description icon"}
              />
              <div className={contentstyle["description"]}>
                <p>{weatherData.days[0].description}</p>
              </div>
            </div>
          </div>

          <div className={contentstyle["hourly"]}>
            <h1>Hourly Forecast</h1>

            <div className={contentstyle["hour-boxes"]}>
              {weatherData.days[0].hours
                .filter((each: any) => {
                  if (!expand) {
                    return (
                      Number(each.datetime.split(":")[0]) >=
                      new Date().getHours()
                    );
                  } else {
                    return true;
                  }
                })
                .map((eachObject: any, index: number) => {
                  return (
                    <div key={index} className={contentstyle["each-hour-box"]}>
                      <h1>{eachObject.datetime.slice(0, 5)}</h1>
                      <Image
                        src={icons[eachObject.icon]}
                        alt={eachObject.icon}
                        width={70}
                        height={70}
                      />
                      <h1 className={contentstyle["temperature"]}>
                        {Math.round(eachObject.temp)}&deg;
                      </h1>
                      <p style={{ textAlign: "center" }}>
                        {eachObject.conditions}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className={contentstyle["show-full-hourly"]}>
            <h1 onClick={() => setExpand(!expand)}>
              {expand ? "Close" : "Expand"}
            </h1>
          </div>
        </div>
      )}
    </>
  );
};

export default Content;
