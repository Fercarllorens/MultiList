import React, { ReactElement } from 'react'
import './LandingPage.css'

function LandingPage(): ReactElement {
    return (
        <div className="landingpage-screen">
            {/* FIRST SCREEN */}
            <h1 className="landingpage-screen__title">DON'T KNOW WHICH FILM TO WATCH OR SONG TO LISTEN TO?</h1>
            <h2 className="landingpage-screen__subtitle">LET US HELP YOU OUT!</h2>
            <button>REGISTER HERE!</button>
            <h3>THE SOCIAL NETWORK FOR ENTERTAINMENT LOVERS</h3>
            {/* SECOND SCREEN */}
            <h1>SAVE CONTENTS.<br/>REVIEW THEM.<br/>ENJOY.</h1>
            <p>
            Sigue a otros usuarios para ver sus listas. <br/>
            Organiza todos los contenidos a tu gusto. <br/>
            Consulta dónde los puedes encontrar. <br/>
            Valóralos y recomiéndale a tus amigos y a todo el mundo lo que a ti te gusta.
            </p>
            <img alt="sample selector"/>
            <img alt="sample content previews"/>
            {/* THIRD SCREEN */}
            <img alt="sample top films"/>
            <h1>CHECK THE TOP CONTENTS OF ALL TIME</h1>
            <p>you'll find global, national and weekly tops for any kind of media</p>
            <img alt="sample top lists"/>
            {/* FOURTH SCREEN */}
            <h1>DO YOU WANT TO BECOME A FAMOUS CRITIC?</h1>
            <p>The more content you value and the more interactions your opinions have, the more chances you have of reaching other users and that they follow your recommendations.</p>
            <img alt="sample user profile"/>
        </div>
    )
}

export default LandingPage;