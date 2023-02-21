"use client";
import weeklystyle from "/app/weekly/[city]/weekly.module.css";

const Weekly = ({ params }: any) => {
  const city = params.city;

  return (
    <>
      <div className={weeklystyle["header"]}>
        <h1>{city}</h1>


      </div>
    </>
  );
};

export default Weekly;
