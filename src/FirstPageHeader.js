import React from "react";
import "./StyleHeaderFooter.css";

function WebsiteTitle(props)
{
    return(<p>Another Online Recipe Book</p>);
}

function UserSettings(props)
{
    return(<p>user</p>)
}

class PageHeader extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            userID: this.props.userID
        };
    }

    render()
    {
        return(
            <div className="pageHeaderContainer">
                <div className="pageHeaderTitle">
                    <WebsiteTitle />
                </div>
                <div className="pageHeaderSettings">
                    <UserSettings />
                </div>
            </div>
        );
    }
}

export default PageHeader;