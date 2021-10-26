import React from 'react'
import MultimediaTrailerLogic  from './MultimediaTrailerLogic'
import './MultimediaTrailer.css'

interface Props{
    trailer: string | null;
}

const MultimediaTrailer: React.FC<Props> = (props) => {
    const {trailer} = MultimediaTrailerLogic(props)
        return (
        <div className="data-container-trailer">
            {/*<iframe width="560" height="315" src="https://www.youtube.com/embed/IbJFERe9F9w" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
            <video>
                <source src={'https://www.youtube.com/watch?v=d6z5fsEnIx8&ab_channel=YO%2CINTERNETO'} type=""></source>
            </video>
            <img src={'https://us.123rf.com/450wm/seetwo/seetwo1907/seetwo190700208/126635447-ning%C3%BAn-signo-vac%C3%ADo-c%C3%ADrculo-tachado-rojo-signo-no-permitido-aislar-sobre-fondo-blanco-ilustraci%C3%B3n-vec.jpg?ver=6'} alt="No disponible" />
        */}
        </div>
    )
}

export default MultimediaTrailer