import React from "react";

function TrendingBox(props)
{
    return (
        <p>item #{props.count}</p>
    );
}

class Trending extends React.Component
{
    render()
    {
        return (
            <div className="trendingBoxContainer">
                <div className="trendingBox">
                    <TrendingBox count="1"/>
                </div>
                <div className="trendingBox">
                    <TrendingBox count="2"/>
                </div>
                <div className="trendingBox">
                    <TrendingBox count="3"/>
                </div>
                <div className="trendingBox">
                    <TrendingBox count="4"/>
                </div>
                <div className="trendingBox">
                    <TrendingBox count="5"/>
                </div>
            </div>
        );
    }
}

export default Trending;