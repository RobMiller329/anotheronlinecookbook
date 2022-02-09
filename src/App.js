import React from "react";
import { useState } from "react";
import PageHeader from "./PageHeader";
import PageFooter from "./PageFooter";
import PageContent from "./PageContent";
import Navigation from "./contentComponents/ContentNavigation";
import './App.css';

function App()
{
  const [page, setPage] = useState("");

  /*  function passed to PageHeader and Navigation to handle page values being passed back to App and then forwarded to PageContent  */
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
        <PageContent page={page} />
      </div>
      <div className="appFooter">
        <PageFooter />
      </div>
    </div>
  );
}

export default App;
