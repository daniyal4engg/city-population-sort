import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from "./components/Home";
import { AddCity } from "./components/addcity";
import { AddCountry } from "./components/addCoutry";
export const AllRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route
            path="/add-country"
            element={<AddCountry></AddCountry>}
          ></Route>
          <Route path="/add-city" element={<AddCity></AddCity>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
