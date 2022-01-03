import React from "react";
import Navigation from "./contentComponents/ContentNavigation";
import Trending from "./contentComponents/ContentTrending";
import FinalTable from "./contentComponents/tableFinal";
import NewRecipeForm from "./contentComponents/createRecipeForm";
import "./StylePageBody.css";

class PageContent extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            center: "ViewRecipes"
        };
    }

    navigationCallback = (currentCenter) =>
    {
        this.setState( {center: currentCenter} );
    }

    render()
    {
        let centerToShow;

        switch(this.state.center)
        {
            case "CreateNewRecipe":
                centerToShow = <NewRecipeForm />;
                break;
            default:
                centerToShow = <FinalTable />;
                break;
        }

        return(
            <div className="firstPageBodyContainer">
                <div className="firstPageBodyLeft">
                    <Navigation callbackFromParent={this.navigationCallback} />
                </div>
                <div className="firstPageBodyCenter">
                    { centerToShow }
                </div>
                <div className="firstPageBodyRight">
                    <Trending />
                </div>
            </div>
        );
    }
}

export default PageContent;