const HourlyForecast = ({ weather }) => {
  const hourly  = weather.hourly;
  const formatUnixTime = (timestamp, timezone) => {
    return new Date((timestamp) * 1000).toLocaleTimeString("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="flex flex-col gap-2 p-4 bg-primary rounded-md w-full text-black">
      <div className="flex flex-col items-center justify-start w-full px-4">
        <p className="flex items-center justify-start w-full">5 hour forecast:</p>
        <hr className="h-0.5 my-1 w-full border-0 bg-amber-600 rounded-md" />
      </div>
      <div className="grid md:grid-cols-5 grid-cols-2 gap-5 w-full items-center px-4">
        {hourly.slice(1, 6).map((hour, index) => (
          <div key={index} className="flex flex-col items-center justify-center">
            <p>{formatUnixTime(hour.dt, weather.timezone)}</p>
            <img
              className="flex w-10 h-10"
              src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
              alt="Weather_icon"
            />
            <p>{hour.temp} °C</p>
            <p>Feels: {hour.feels_like} °C</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HourlyForecast;