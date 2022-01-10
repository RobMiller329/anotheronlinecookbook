import React from "react";
import "./StyleNavigation.css";

class Navigation extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = 
        {
            page: ""
        };

        this.handleViewMyRecipesClick = this.handleViewMyRecipesClick.bind(this);
        this.handleBrowseAllRecipesClick = this.handleBrowseAllRecipesClick.bind(this);
        this.handleManageMyRecipesClick = this.handleManageMyRecipesClick.bind(this);
    }

    handleViewMyRecipesClick()
    {
        this.props.onPageChange("ViewMyRecipes");
    }

    handleBrowseAllRecipesClick()
    {
        this.props.onPageChange("BrowseAllRecipes");
    }

    handleManageMyRecipesClick()
    {
        this.props.onPageChange("CreateNewRecipe");
    }

    render()
    {
        return (
            <div className="navigationButtonsContainer">
                <button onClick={this.handleViewMyRecipesClick} value="ViewMyRecipes" className="navButton">View My Recipes</button>
                <button onClick={this.handleBrowseAllRecipesClick} value="BrowseAllRecipes" className="navButton">Browse All Recipes</button>
                <button onClick={this.handleManageMyRecipesClick} value="CreateNewRecipe" className="navButton">Create New Recipe</button>
            </div>
        );
    }
}

export default Navigation;