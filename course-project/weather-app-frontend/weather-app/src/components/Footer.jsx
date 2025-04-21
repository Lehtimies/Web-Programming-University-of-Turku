const Footer = () => {
  return (
    <div className="bg-black flex flex-col gap-5 p-5 text-white opacity-90 items-center justify-center w-full">
      <div className="flex flex-row gap-2 items-center justify-center">
        <p className="text-2xl flex whitespace-nowrap">Amazing Weather App</p>
        <img
          className="flex w-8 h-8"
          src={"https://openweathermap.org/img/wn/01d.png"}
          alt="Weather_icon"
        />
      </div>
      <div className="flex flex-col gap-2 p-4 max-w-2xl text-sm text-center">
        <p>This app was created for the course "Web Programming" at the University of Turku</p>
        <p>Made by Johnny, Marius, Juhani and Sara</p>
        <p>© 2025 Amazing Weather App</p>
        <p>All rights reserved</p>
      </div>
    </div>
  )
}

export default Footer;