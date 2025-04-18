const DailyForecast = ({ weather }) => {
  const daily  = weather.daily;
  const formatUnixTime = (timestamp, timezone) => {
    return new Date((timestamp) * 1000).toLocaleDateString("en-US", {
      timeZone: timezone,
      month: "2-digit",
      day: "2-digit",
    });
  }

  return (
    <div className="flex flex-col gap-2 p-4 bg-primary rounded-md w-full text-black">
      <div className="flex flex-col items-center justify-start w-full px-4">
        <p className="flex items-center justify-start w-full">5 day forecast:</p>
        <hr className="h-0.5 my-1 w-full border-0 bg-amber-600 rounded-md" />
      </div>
      <div className="grid md:grid-cols-5 grid-cols-2 gap-5 w-full items-center px-4">
        {daily.slice(0, 5).map((day, index) => (
          <div key={index} className="flex flex-col items-center justify-center">
            <p>{formatUnixTime(day.dt, weather.timezone)}</p>
            <img
              className="flex w-10 h-10"
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt="Weather_icon"
            />
            <p>{day.temp.day} °C</p>
            <p>Feels: {day.feels_like.day} °C</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DailyForecast;