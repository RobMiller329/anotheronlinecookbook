import React from "react";
import Popup from "reactjs-popup";
import "./StyleHeaderFooter.css";

function Credits(props)
{
    return(
        <div>
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

function Roadmap(props)
{
    return(
        <Popup
        trigger={<button className="comingSoonOpenButton"> Coming Soon </button>}
        modal
        nested>{
            close => (
                <div className="comingSoonContainer">
                <div className="comingSoonModal">
                    <div className="comingSoonHeader">
                        <h1>Improvements On the Way</h1>
                    </div>
                    <div className="comingSoonContent">
                        {' '}
                        * [entire site] making it look not terrible
                        <br/>
                        * [Browse All Recipes] view recipe details in an overlay
                        <br/>
                        * [Create New Recipe] input validation
                        <br/>
                        * [Edit My Recipes] edit element in overlay
                        <br/>
                        * [Edit My Recipes] submit edit feedback
                        <br/>
                        * [Edit My Recipes] input validation
                        <br/>
                        * [Settings (logged in)] heading shows username in addition to email
                        <br/>
                        * [Settings (logged in)] input validation
                        <br/>
                        * [Settings (logged in)] feedback for all credential changes
                        <br/>
                        * [entire site] implementing React Router
                    </div>
                    <div className="comingSoonModalClose">
                        <br/>
                        <button className="comingSoonCloseButton" onClick={ () => { console.log('modal closed '); close(); } }>
                            close this window
                        </button>
                    </div>
                </div>
                </div>
            )
        }</Popup>
    );
}

function SkillsAndGithub(props)
{
    return(
        <Popup
        trigger={<button className="comingSoonOpenButton"> test </button>}
        modal
        nested>{
            close => (
                <div >
                    <span>{props.number}</span>
                </div>
            )
        }</Popup>
    );
}

function PageFooter(props)
{
    return(
        <div className="footer">
            <div className="footerCredits">
                <Credits />
            </div>
            <div className="footerRoadmap">
                <Roadmap />
            </div>
            <div className="footerSkills">
                <SkillsAndGithub number={1} />
            </div>
        </div>
    );
}

export default PageFooter;