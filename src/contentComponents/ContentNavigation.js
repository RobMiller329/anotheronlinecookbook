import React from "react";
import "./StyleNavigation.css";

class Navigation extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = 
        {
            page: "ViewMyRecipes"
        };

        this.handleViewMyRecipesClick = this.handleViewMyRecipesClick.bind(this);
        this.handleBrowseAllRecipesClick = this.handleBrowseAllRecipesClick.bind(this);
        this.handleManageMyRecipesClick = this.handleManageMyRecipesClick.bind(this);
    }

    handleViewMyRecipesClick()
    {
        this.props.callbackFromParent("ViewMyRecipes");
    }

    handleBrowseAllRecipesClick()
    {
        this.props.callbackFromParent("BrowseAllRecipes");
    }

    handleManageMyRecipesClick()
    {
        this.props.callbackFromParent("CreateNewRecipe");
    }

    render()
    {
        return (
            <div className="navigationButtonsContainer">
                <div className="navigationButton">
                    <button onClick={this.handleViewMyRecipesClick} value="ViewMyRecipes">View My Recipes</button>
                </div>
                <div className="navigationButton">
                    <button onClick={this.handleBrowseAllRecipesClick} value="BrowseAllRecipes">Browse All Recipes</button>
                </div>
                <div className="navigationButton">
                    <button onClick={this.handleManageMyRecipesClick} value="CreateNewRecipe">Create New Recipe</button>
                </div>
            </div>
        );
    }
}

export default Navigation;