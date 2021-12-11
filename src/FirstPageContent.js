import React from "react";
import Navigation from "./SecondNavigation";
import Trending from "./SecondTrending";
import ListRecipesTable from "./tableListRecipes";
import "./StylePageBody.css";

class PageContent extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            page: "ViewMyRecipes",
            userID: this.props.userID
        };
    }

    navigationCallback = (currentPage) =>
    {
        this.setState( {page: currentPage} );
    }

    render()
    {
        return(
            <div className="firstPageBodyContainer">
                <div className="firstPageBodyLeft">
                    <Navigation callbackFromParent={this.navigationCallback} />
                </div>
                <div className="firstPageBodyCenter">
                    <ListRecipesTable tablePage={this.state.page} userID={this.state.userID} />
                </div>
                <div className="firstPageBodyRight">
                    <Trending />
                </div>
            </div>
        );
    }
}

export default PageContent;