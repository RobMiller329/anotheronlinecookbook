import React from "react";
import PageHeader from "./PageHeader";
import PageFooter from "./PageFooter";
import PageContent from "./PageContent";
//import RegisterUser from "./loginComponents/RegisterUser";
//import UserLogin from "./loginComponents/Login";
import './App.css';

function App()
{
  return(
    <div className="App">
      <div className="appHeader">
        <PageHeader />
      </div>
      <div className="appBody">
        <PageContent />
        {/* <RegisterUser />
        <UserLogin /> */}
      </div>
      <div className="appFooter">
        <PageFooter />
      </div>
    </div>
  );
}

export default App;