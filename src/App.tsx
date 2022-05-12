import "./App.css";
import { Navigation } from "./Components/Navigation";
import { Users } from "./Areas/Users";
import { FunctionComponent } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Roles } from "./Areas/Roles";

const App: FunctionComponent = () => {
  return (
    <>
      <Navigation></Navigation>
      <BrowserRouter>
        <Routes>
          <Route path="users" element={<Users />} />
          <Route path="roles" element={<Roles />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
