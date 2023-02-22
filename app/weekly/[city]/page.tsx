import weeklystyle from "/app/(styles)/weekly.module.css";
import Image from "next/image";
import windPowerIcon from "public/wind-power-icon.svg";
import thermostatIcon from "public/thermostat-icon.svg";
import radiationIcon from "public/radiation-icon.svg";
import {icons} from "app/icons";
import Days from "./days";

const Weekly = async ({ params }: any) => {
  const city = params.city.replaceAll("%20", " ").trim();
  const req = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next7days?unitGroup=metric&key=${process.env.NEXT_PUBLIC_API_KEY}&contentType=json`
  );
  const res = await req.json();

  const avgRadiations = res.days.map((eachDay: any) => {
    let dailyRadiation = 0;
    eachDay.hours.forEach((eachHour: any) => {
      dailyRadiation += eachHour.uvindex;
    });

    return [
      Math.round(dailyRadiation / eachDay.hours.length),
      eachDay.datetime,
    ];
  });

  const avgWeatherConditions = [...new Set(res.days.map((eachDay: any) => {
      return eachDay.icon;
  }))];


  const avgRadiationThroughoutTheWeek =
    avgRadiations
      .map((each: any) => each[0])
      .reduce((a: number, b: number) => a + b, 0) / avgRadiations.length;

  const dailySpeeds = res.days.map((eachDay: any) => {
    let daySpeed = 0;
    eachDay.hours.forEach((eachHour: any) => {
      daySpeed += eachHour.windspeed;
    });

    return [Math.round(daySpeed / eachDay.hours.length), eachDay.datetime];
  });
  const dailyTemperatures = res.days.map((eachDay: any) => {
    let dailyTemp = 0;
    eachDay.hours.forEach((eachHour: any) => {
      dailyTemp += eachHour.temp;
    });

    return [Math.round(dailyTemp / eachDay.hours.length), eachDay.datetime];
  });

  const avgTempThroughoutTheWeek =
    dailyTemperatures
      .map((each: any) => each[0])
      .reduce((a: any, b: any) => a + b, 0) / dailyTemperatures.length;
  const avgWindSpeedThroughoutTheWeek = Math.round(
    dailySpeeds
      .map((each: any) => each[0])
      .reduce((a: number, b: number) => a + b, 0) / dailySpeeds.length
  );

  const today = dailySpeeds[0][1].replaceAll("-", ".");
  const weekend = dailySpeeds[dailySpeeds.length - 1][1].replaceAll("-", ".");

  
  return (
    <>
      <div className={weeklystyle["header"]}>
        <nav>
          <div className={weeklystyle["from-to"]}>
            <h1>Weekly Weather In {city} </h1>
            <p>
              From {today} to {weekend}
            </p>
          </div>

          <div className={weeklystyle["avgs"]}>
            <h3 style={{ marginRight: "-15px", textAlign: "center" }}>
              Averages
            </h3>
            <div /*avg wind speed*/ className={weeklystyle['each-avg']}> 
              <Image
                src={windPowerIcon}
                alt="Wind Power icon"
                width={40}
                height={40}
              />
              <h2>{avgWindSpeedThroughoutTheWeek} km/ph</h2>
            </div>

            <div /*avg temp*/ className={weeklystyle['each-avg']}>
              <Image
                src={thermostatIcon}
                alt="Thermostat icon"
                width={40}
                height={40}
              />
              <h2>{Math.round(avgTempThroughoutTheWeek)}&deg;</h2>
            </div>

            <div /*avg radiation*/ className={weeklystyle['each-avg']}>
              <Image
                src={radiationIcon}
                alt="Thermostat icon"
                width={40}
                height={40}
              />
              <h2>{Math.round(avgRadiationThroughoutTheWeek)} sv/h</h2>
            </div>
            
            <div /*avg conditions*/ className={weeklystyle['w-conditions']}>
              <div>Weather Conditions</div>
              <div>
              {avgWeatherConditions.map((each: any, index: number) => {
                return (
                  <div key={index} style={{backgroundColor: "#a7a7b4"}}>
                    <Image
                      src={icons[each]}
                      alt={each}
                      width={40}
                      height={40}
                    />
                   
                  </div>)
                
                })}
              </div>
            </div>
          </div>
        </nav>

        <Days />
      </div>
    </>
  );
};

export default Weekly;
