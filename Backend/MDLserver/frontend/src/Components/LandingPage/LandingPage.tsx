import React, { ReactElement } from 'react'
import './LandingPage.css'

function LandingPage(): ReactElement {
    return (
        <div className="landingpage-screen">
            {/* FIRST SCREEN */}
            <div className="landingpage-screen__section" id="register">
                <div className="landingpage-screen__bg-image"></div>
                <h1 className="landingpage-screen__title">DON'T KNOW WHICH FILM TO WATCH OR SONG TO LISTEN TO?</h1>
                <h2 className="landingpage-screen__subtitle">LET US HELP YOU OUT!</h2>
                <button className="landingpage-screen__register-button">REGISTER HERE!</button>
                <h3>THE SOCIAL NETWORK FOR ENTERTAINMENT LOVERS</h3>
            </div>
            {/* SECOND SCREEN */}
            <div className="landingpage-screen__section" id="contents">
                <div className="landingpage-screen__left-contents">
                    <h1>SAVE CONTENTS.<br />REVIEW THEM.<br />ENJOY.</h1>
                    <p>
                        Follow other users to see their lists.<br />
                        Organize all the contents to your liking.<br />
                        See where you can find them.<br />
                        Value them and recommend to your friends<br />
                        and everyone what you like.
                    </p>
                </div>
                <div className="landingpage-screen__right-contents">
                    <img src="film_preview1.png" id="filmpreview1" />
                    <img src="film_preview2.png" id="filmpreview2" />
                </div>
            </div>
            {/* THIRD SCREEN */}
            <div className="landingpage-screen__section" id="tops">
                <div className="landingpage-screen__left-tops">
                    <img src="top1.png" alt="sample top lists" id="top1" />
                    <img src="top2.png" alt="sample top lists" id="top2" />
                    <img src="top3.png" alt="sample top lists" id="top3" />
                </div>
                <div className="landingpage-screen__right-tops">
                    <h1>CHECK THE TOP CONTENTS OF ALL TIME</h1>
                    <p>
                        You will find global, national and weekly tops <br />
                        of both series and movies as well as the best <br />
                        rated songs of today.
                    </p>
                </div>
            </div>
            {/* FOURTH SCREEN */}
            <div className="landingpage-screen__section" id="profiles">
                <div className="landingpage-screen__top-profiles">
                    <h1>DO YOU WANT TO BECOME A FAMOUS CRITIC?</h1>
                </div>
                <div className="landingpage-screen__bottom-profiles">
                    <p>The more content you value and the more <br />
                        interactions your opinions have, <br />
                        the more chances you have of reaching other <br />
                        users and that they follow your recommendations.</p>
                    <img src="profile_sample.png" alt="sample user profile" id="profile_sample" />
                </div>
            </div>
        </div>
    )
}

export default LandingPage;