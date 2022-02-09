import React from "react";
import NewRecipeForm from "./formComponents/FormNewRecipe";
import EditRecipesForm from "./formComponents/FormEditRecipes";
import { Account } from "./loginComponents/Account";
import Settings from "./contentComponents/Settings";
import "./StylePageBody.css";
import BrowseTableBuild from "./contentComponents/BrowseTableBuild";

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

class PageContent extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            //page state removed; passed directly from props to switch
        }
    }

    render()
    {
        let pageToShow;

        /*  navigation handled by a string passed to this switch; the page title dictates which page's
            component is displayed  */
        switch(this.props.page)
        {
            case "BrowseAllRecipes":
                pageToShow = <BrowseTableBuild />;
                break;
            case "CreateNewRecipe":
                pageToShow = <NewRecipeFormPage />
                break;
            case "EditMyRecipes":
                pageToShow = <EditRecipesFormPage />;
                break;
            case "Settings":
                pageToShow = <SettingsPage />;
                break;
            default:
                pageToShow = <BrowseTableBuild />;
                break;
        }

        return(
            <div className="pageContent">
                { pageToShow }
            </div>
        );
    }
}

export default PageContent;
