const WeatherContainer = ({ weather }) => {
  return (
    <div className="flex flex-col gap-2 w-full p-4 bg-primary rounded-md text-black">
      <div className="flex flex-col items-center justify-start w-full px-4">
        <p className="flex items-center justify-start w-full">🌡️ Weather:</p>
        <hr className="h-0.5 my-1 w-full border-0 bg-amber-600 rounded-md" />
      </div>
      <div className="grid grid-rows-3 gap-3 w-full items-center px-4">
        <div className="text-left">
          <p>Temperature: {weather.current.temp} °C</p>
        </div>
        <div className="text-left">
          <p>Feels Like: {weather.current.feels_like} °C</p>
        </div>
        <div className="text-left">
          <p>Dew Point: {weather.current.dew_point} °C</p>
        </div>
        <div className="text-left">
          <p>Humidity: {weather.current.humidity} %</p>
        </div>
        <div className="text-left">
          <p>Clouds: {weather.current.clouds} %</p>
        </div>
        <div className="text-left">
          <p>UVI: {weather.current.uvi}</p>
        </div>
      </div>
    </div>
  )
}

export default WeatherContainer;