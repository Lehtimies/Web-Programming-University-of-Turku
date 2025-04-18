import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import WeatherPage from "./pages/WeatherPage";
import OverviewPage from "./pages/OverviewPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Error404Page from "./pages/Error404Page";

console.log("Running mode:", import.meta.env.MODE);

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="sm:flex hidden">
        <Header />
      </div>
      <div className="sm:mt-20 flex flex-grow overflow-x-hidden items-center justify-center">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/weather/:cityName" element={<WeatherPage />} />
          <Route path="/overview/:citySame" element={<OverviewPage />} />
          <Route path="/test" element={<p className="text-white">Hello from test</p>} />
          <Route path="*" element={<Error404Page />} />
        </Routes>
      </div>
      <div className="flex">
        <Footer />
      </div>
    </div>
  )
};

export default App;
