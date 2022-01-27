import React from "react";
import "./StyleHeaderFooter.css";

class PageFooter extends React.Component
{
    render()
    {
        return(
            <div className="footer">
                <div className="copyrightStatement">
                    <p>I made this.</p>
                    <p>- Rob Miller  2021</p>
                </div>
                <div className="borrowedImage">
                    <p>Gear image "borrowed" from <a href="https://cdn.pixabay.com/photo/2016/01/03/11/24/gear-1119298_960_720.png">here</a>.</p>
                </div>
            </div>
        );
    }
}

export default PageFooter;