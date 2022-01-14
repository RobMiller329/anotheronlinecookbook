import React from "react";
import FinalTable from "./contentComponents/tableFinal";
import NewRecipeForm from "./contentComponents/FormNewRecipe";
import EditRecipesForm from "./contentComponents/FormEditRecipes";
import { Account } from "./loginComponents/Account";
import Settings from "./contentComponents/Settings";
import "./StylePageBody.css";

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
        }
    }

    render()
    {
        let pageToShow;

        switch(this.props.page)
        {
            case "BrowseAllRecipes":
                pageToShow = <FinalTable />;
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
                pageToShow = <FinalTable />;
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