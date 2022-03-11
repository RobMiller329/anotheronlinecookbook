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
    /*  Builds a modal - displays the roadmap without disrupting the current page's state  */
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
                            * [Edit My Recipes] button to delete recipe as a whole
                            <br/>
                            * [Edit My Recipes] submit edit feedback
                            <br/>
                            * [Edit My Recipes] input validation
                            <br/>
                            * [Edit My Recipes] add a new ingredient or instruction to recipe
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
    /*  Builds a modal - displays the skills/Github without disrupting the current page's state  */
    return(
        <Popup
        trigger={<button className="skillsGithubButton"> On Display </button>}
        modal
        nested>{
            close => (
                <div className="skillsGithubContainer">
                    <div className="skillsGithubModal">
                        <div className="skillsGithubHeader">
                            <h1>Link to the code, features present, and experience gained.</h1>
                        </div>
                        <div className="skillsGithubContent">
                            {' '}
                            <a href="https://github.com/RobMiller329/anotheronlinecookbook">Github Repository</a><span> - note: the credentials file is not included</span>
                            <br/><br/>
                            Features:
                            <br/>
                            * Demonstrates CRUD operations through creating, reading, updating, and deleting recipes.
                            <br/>
                            * Use interactive modals (popups) to edit recipe components.
                            <br/>
                            * Use the filters to search for recipes with several criteria.
                            <br/>
                            * Add recipe and recipe authors to your favorites.
                            <br/>
                            * Create notes on recipes to reference later.
                            <br/>
                            * User authentication through AWS Cognito.
                            <br/><br/>
                            Experience:
                            <br/>
                            * Built with the Javascript libraries React and Node.
                            <br/>
                            * Hosted on AWS using EC2, RDS for the database, Route53 for the domain, and Cognito for the user authentication.
                            <br/>
                            * Learned about writing API calls, especially calls that dynamically build SQL queries.
                            <br/>
                            * Learned about the different means by which data can be managed by a site (URI, props, objects, etc).
                            <br/>
                            * Reinforced previous lessons regarding design patterns, scalable solutions, and UX/UI design.
                        </div>
                        <div className="skillsGithubModalClose">
                            <br/>
                            <button className="skillsGithubCloseButton" onClick={ () => { console.log('modal closed '); close(); } }>
                                close this window
                            </button>
                        </div>
                    </div>
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
