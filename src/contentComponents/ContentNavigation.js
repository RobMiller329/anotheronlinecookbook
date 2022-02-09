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

        this.handleBrowseAllRecipesClick = this.handleBrowseAllRecipesClick.bind(this);
        this.handleCreateNewRecipeClick = this.handleCreateNewRecipeClick.bind(this);
        this.handleEditMyRecipesClick = this.handleEditMyRecipesClick.bind(this);
    }

    /*  these are functions passed from App.js; could use REFACTORING  */

    handleBrowseAllRecipesClick()
    {
        this.props.onPageChange("BrowseAllRecipes");
    }

    handleCreateNewRecipeClick()
    {
        this.props.onPageChange("CreateNewRecipe");
    }

    handleEditMyRecipesClick()
    {
        this.props.onPageChange("EditMyRecipes");
    }

    render()
    {
        return (
            <div className="navigationButtonsContainer">
                <button onClick={this.handleBrowseAllRecipesClick} value="browseAllRecipes" className="navButton">Browse All Recipes</button>
                <button onClick={this.handleCreateNewRecipeClick} value="createNewRecipe" className="navButton">Create New Recipe</button>
                <button onClick={this.handleEditMyRecipesClick} value="editMyRecipes" className="navButton">Edit My Recipes</button>
            </div>
        );
    }
}

export default Navigation;
