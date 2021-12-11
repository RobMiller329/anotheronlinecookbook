import React from "react";
import { useState } from "react";
import PageHeader from "./FirstPageHeader";
import PageFooter from "./FirstPageFooter";
import PageContent from "./FirstPageContent";
import LoginPage from "./LoginPage";
import './App.css';

function ScreenToDisplay(props)
{
  const [user, setUser] = useState ( {email: ""} );

  const adminUser =
  {
    email: "robert.miller.329@gmail.com",
    password: "123"
  }

  const Login = details =>
  {
    if(details.email === adminUser.email && details.password === adminUser.password)
    {
      setUser(
      {
        email: details.email
      });
    }else
    {
      alert('The email or password provided do not match what we have in our records.');
    }
  }

  let pageSelected;

  if(user.email !== "")
  {
    pageSelected = <PageContent userID={user.email} />;
  }else
  {
    pageSelected = <LoginPage login={Login} />;
  }

  return(
    pageSelected
  );
}

function App()
{
  let loginOrSite = ScreenToDisplay();

  return(
    <div className="App">
      <div className="appHeader">
        <PageHeader />
      </div>
      <div className="appBody">
        <ScreenToDisplay whichPage={loginOrSite} />
      </div>
      <div className="appFooter">
        <PageFooter />
      </div>
    </div>
  );
}

export default App;