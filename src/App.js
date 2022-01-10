import React from "react";
import { useState } from "react";
import PageHeader from "./PageHeader";
import PageFooter from "./PageFooter";
import PageContent from "./PageContent";
import Navigation from "./contentComponents/ContentNavigation";
import { Account } from "./loginComponents/Account";
import RegisterUser from "./loginComponents/RegisterUser";
import UserLogin from "./loginComponents/Login";
import Status from "./loginComponents/Status";
import './App.css';

function App()
{
  const [page, setPage] = useState("");

  function handlePageChange(newPage)
  {
    setPage(newPage);
  }

  return(
    <div className="App">
      <div className="appHeader">
        <PageHeader onPageChange={handlePageChange} />
      </div>
      <div className="appNavigation">
        <Navigation page={page} onPageChange={handlePageChange} />
      </div>
      <div className="appBody">
        {/* <PageContent page={page} /> */}
        <Account>
          <Status/>
          <RegisterUser />
          <UserLogin />
        </Account>
      </div>
      <div className="appFooter">
        <PageFooter />
      </div>
    </div>
  );
}

export default App;