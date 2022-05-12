import "./App.css";
import { Navigation } from "./Components/Navigation";
import { Users } from "./Areas/Users";
import { FunctionComponent } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Roles } from "./Areas/Roles";
import { Landing } from "./Areas/Landing";

const App: FunctionComponent = () => {
  return (
    <>
      <Navigation></Navigation>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="users" element={<Users />} />
          <Route path="roles" element={<Roles />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
