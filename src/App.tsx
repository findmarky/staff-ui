import "./App.css";
import { Navigation } from "./Components/Navigation";
import { Users } from "./Areas/Users";
import { FunctionComponent } from "react";

const App : FunctionComponent = () => {
  return (
    <>  
      <Navigation></Navigation>
      <Users></Users>
    </>
  );
}

export default App;
