import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-black text-white p-4 flex fixed shadow-md w-full">
      <Link to={"/"} className="flex flex-row gap-2 ml-7 items-center justify-center cursor-pointer">
        <div className="text-4xl flex whitespace-nowrap">Amazing Weather App</div>
        <img
              className="flex w-12 h-12"
              src={"https://openweathermap.org/img/wn/01d.png"}
              alt="Weather_icon"
            />
      </Link>
    </header>
  );
}

export default Header;