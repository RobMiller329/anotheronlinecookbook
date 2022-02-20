import React from "react";
import NewRecipeForm from "./formComponents/FormNewRecipe";
import EditRecipesForm from "./formComponents/FormEditRecipes";
import Settings from "./contentComponents/Settings";
import BrowseTableBuild from "./contentComponents/BrowseTableBuild";
import { Account } from "./loginComponents/Account";
import "./StylePageBody.css";

/*  The <Account> wrapper in these three functions provides the context of the user credentials so that each
    of these components can access it.  */

function SettingsPage(props)
{
    return(
        <Account>
            <Settings />
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

function BrowsingRecipesTable(props)
{
    return(
        <Account>
            <BrowseTableBuild />
        </Account>
    );
}

function PageContent(props)
{
    let pageToShow;

    /*  navigation handled by a string passed to this switch; the page title dictates which page's
        component is displayed  */
    switch(props.page)
    {
        case "BrowseAllRecipes":
            pageToShow = <BrowsingRecipesTable />;
            break;
        case "CreateNewRecipe":
            pageToShow = <NewRecipeFormPage />;
            break;
        case "EditMyRecipes":
            pageToShow = <EditRecipesFormPage />;
            break;
        case "Settings":
            pageToShow = <SettingsPage />;
            break;
        default:
            pageToShow = <BrowsingRecipesTable />;
            break;
    }

    return(
        <div className="pageContent">
            { pageToShow }
        </div>
    );
}

export default PageContent;
