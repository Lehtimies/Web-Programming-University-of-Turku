const GeneralWeatherDescription = ({ weather }) => {
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
      <p className="flex items-center justify-start w-full">📝 General description:</p>
      <hr className="h-0.5 my-1 w-full border-0 bg-amber-600 rounded-md" />
    </div>
    <div className="grid md:grid-cols-3 md:grid-rows-1 grid-rows-3 w-full items-center px-4">
      <div className="text-left">
        <p>🌅 Sunrise: {formatUnixTime(weather.current.sunrise, weather.timezone)}</p>
      </div>
      <div className="md:text-center text-left">
        <p>🌇 Sunset: {formatUnixTime(weather.current.sunset, weather.timezone)}</p>
      </div>
      <div className="md:text-right text-left">
        <p>🌤️/🌧️ Description: {weather.current.weather[0].description}</p>
      </div>
    </div>
  </div>
 )
}

export default GeneralWeatherDescription;