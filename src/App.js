import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageHeader from "./PageHeader";
import PageFooter from "./PageFooter";
import PageContent from "./PageContent";
import Navigation from "./contentComponents/ContentNavigation";

import NewRecipeForm from "./formComponents/FormNewRecipe";
import EditRecipesForm from "./formComponents/FormEditRecipes";
import Settings from "./contentComponents/Settings";
import BrowseTableBuild from "./contentComponents/BrowseTableBuild";
import { Account } from "./loginComponents/Account";
import './App.css';

function BrowsingRecipesTable(props)
{
    return(
        <Account>
            <BrowseTableBuild />
        </Account>
    );
}

function NewRecipeFormPage(props)
{
    return(
        <Account>
            <NewRecipeForm />
        </Account>
    );
}

function EditRecipesFormPage(props)
{
    return(
        <Account>
            <EditRecipesForm />
        </Account>
    );
}

function SettingsPage(props)
{
    return(
        <Account>
            <Settings />
        </Account>
    );
}

function App()
{
  const [page, setPage] = useState("");

  /*  function passed to PageHeader and Navigation to handle page values being passed back to App and then forwarded to PageContent  */
  function handlePageChange(newPage)
  {
    setPage(newPage);
  }

  return(
    <BrowserRouter>
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
      <Routes>
        <Route path="/" component={ BrowsingRecipesTable } />
        <Route path="/createrecipe" component={ NewRecipeFormPage } />
        <Route path="/editrecipe" component={ EditRecipesFormPage } />
        <Route path="/settings" component={ SettingsPage } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
