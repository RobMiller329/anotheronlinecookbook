import React from "react";
import "./StyleHeaderFooter.css";

class PageHeader extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
        };

        this.handleSettingsClick = this.handleSettingsClick.bind(this);
    }

    /*  setPage is passed as a prop from App.js to PageHeader.js; parameters are passed back up to App.js  */
    handleSettingsClick()
    {
        this.props.onPageChange("Settings");
    }

    render()
    {
        return(
            <div className="pageHeaderContainer">
                <div className="pageHeaderTitle">
                    <h1>Another Online Recipe Book</h1>
                </div>
                <div className="pageHeaderSettings">
                    <button onClick={this.handleSettingsClick} value="Settings" className="settingsNavButton" />
                </div>
            </div>
        );
    }
}

export default PageHeader;
