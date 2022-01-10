import React from "react";
import FinalTable from "./contentComponents/tableFinal";
import NewRecipeForm from "./contentComponents/createRecipeForm";
import Trending from "./contentComponents/ContentTrending";
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
        let showTrending = false;

        /*  written out as "if X = A or X = B" instead of "if X != C" so that the switch default option also 
            won't show the trending component, allowing me to immediately see if the switch is using default  */
        if(this.props.page === "ViewMyRecipes" || this.props.page === "BrowseAllRecipes")
        {
            showTrending = true;
        }else
        {
            showTrending = false;
        }

        switch(this.props.page)
        {
            case "ViewMyRecipes":
                pageToShow = <FinalTable />;
                break;
            case "BrowseAllRecipes":
                pageToShow = <FinalTable />;
                break;
            case "CreateNewRecipe":
                pageToShow = <NewRecipeForm />;
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
                <div className="pageToShow">
                    { pageToShow }
                </div>
                <div className="trending">
                    { showTrending && <Trending /> }
                </div>
            </div>
        );
    }
}

export default PageContent;