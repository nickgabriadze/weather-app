import daysstyle from "app/(styles)/days.module.css";
import Image from "next/image";
import { icons } from "app/icons";

const Days = ({ data }: any) => {

  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
  const dates = data.dailyTemp.map((each:any) => each[1]).
  map((eachDate:any) => {
    return new Date(eachDate);
  }).map((each: Date) => {
    return weekdays[each.getDay()];
  });
 

  return (
    <>
      <div className={daysstyle["days-wrapper"]}>
        <div className={daysstyle["day"]}>
          <h1>{dates[0]}</h1>
          <Image src={icons[data.dailyWeather[0][0]]} alt={data.dailyWeather[0][0]}width={40} height={40} />
          <h2>{data.dailyTemp[0][0]}&deg;</h2>
        </div>
        <div className={daysstyle["day"]}>
          <h1>{dates[1]}</h1>
          <Image src={icons[data.dailyWeather[1][0]]} alt={data.dailyWeather[1][0]}width={40} height={40} />
          <h2>{data.dailyTemp[1][0]}&deg;</h2>
        </div>
        <div className={daysstyle["day"]}>
          <h1>{dates[2]}</h1>
          <Image src={icons[data.dailyWeather[2][0]]} alt={data.dailyWeather[2][0]}width={40} height={40} />
          <h2>{data.dailyTemp[2][0]}&deg;</h2>
        </div>
        <div className={daysstyle["day"]}>
          <h1>{dates[3]}</h1>
          <Image src={icons[data.dailyWeather[3][0]]} alt={data.dailyWeather[3][0]}width={40} height={40} />
          <h2>{data.dailyTemp[3][0]}&deg;</h2>
        </div>
        <div className={daysstyle["day"]}>
          <h1>{dates[4]}</h1>
          <Image src={icons[data.dailyWeather[4][0]]} alt={data.dailyWeather[4][0]}width={40} height={40} />
          <h2>{data.dailyTemp[4][0]}&deg;</h2>
        </div>
        <div className={daysstyle["day"]}>
          <h1>{dates[5]}</h1>
          <Image src={icons[data.dailyWeather[5][0]]} alt={data.dailyWeather[5][0]}width={40} height={40} />
          <h2>{data.dailyTemp[5][0]}&deg;</h2>
        </div>
        <div className={daysstyle["day"]}>
          <h1>{dates[6]}</h1>
          <Image src={icons[data.dailyWeather[6][0]]} alt={data.dailyWeather[6][0]}width={40} height={40} />
          <h2>{data.dailyTemp[6][0]}&deg;</h2>
        </div>
        <div className={daysstyle["day"]}>
          <h1>{dates[7]}</h1>
          <Image src={icons[data.dailyWeather[7][0]]} alt={data.dailyWeather[7][0]}width={40} height={40} />
          <h2>{data.dailyTemp[7][0]}&deg;</h2>
        </div>
      </div>
    </>
  );
};

export default Days;
