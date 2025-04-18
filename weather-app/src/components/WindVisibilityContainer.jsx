const WindVisibilityContainer = ({ weather }) => {
  return (
    <div className="flex flex-col gap-2 w-full p-4 bg-primary rounded-md text-black">
      <div className="flex flex-col items-center justify-start w-full px-4">
        <p className="flex items-center justify-start w-full">🌬️ Wind and Visibility:</p>
        <hr className="h-0.5 my-1 w-full border-0 bg-amber-600 rounded-md" />
      </div>
      <div className="grid grid-rows-3 gap-3 w-full items-center px-4">
        <div className="text-left">
          <p>Wind speed: {weather.current.wind_speed} m/s</p>
        </div>
        <div className="text-left">
          <p>Wind direction: {weather.current.wind_deg}°</p>
        </div>
        <div className="text-left">
          <p>Visibility: {weather.current.visibility} m</p>
        </div>
        <div className="text-left">
          <p>Chance of Rain: {weather.current.rain && weather.current.rain["1h"] ? `${weather.current.rain["1h"]} mm` : "0 mm"}</p>
        </div>
        <div className="text-left">
          <p>Pressure: {weather.current.pressure} hPa</p>
        </div>
      </div>
    </div>
  )
}

export default WindVisibilityContainer;