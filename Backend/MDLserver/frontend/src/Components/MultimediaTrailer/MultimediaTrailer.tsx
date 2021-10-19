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
            {/*<video>
                <source src={trailer != null ? trailer : 'NoVideo'} type=""></source>
            </video>*/}
            <img src={'https://us.123rf.com/450wm/seetwo/seetwo1907/seetwo190700208/126635447-ning%C3%BAn-signo-vac%C3%ADo-c%C3%ADrculo-tachado-rojo-signo-no-permitido-aislar-sobre-fondo-blanco-ilustraci%C3%B3n-vec.jpg?ver=6'} alt="No disponible" />
        </div>
    )
}

export default MultimediaTrailer