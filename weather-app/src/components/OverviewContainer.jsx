const OverviewContainer = ({ overview }) => {
  return (
    <div className="flex flex-col gap-2 w-full p-4 bg-primary rounded-md text-black">
      <div className="flex flex-col items-center justify-start w-full px-4">
        <p className="flex items-center justify-start w-full">🌦️ Weather Overview:</p>
        <hr className="h-0.5 my-1 w-full border-0 bg-amber-600 rounded-md" />
      </div>
      <div className="grid gap-3 w-full items-center px-4">
        <div className="text-left">
          <p className="text leading-7.5">{overview.weather_overview}</p>
        </div>
      </div>
    </div>
  )
}

export default OverviewContainer;