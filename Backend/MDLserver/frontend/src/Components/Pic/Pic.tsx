import React from 'react';
import './Pic.css'
import PicLogic from './PicLogic';

interface Props{
    url: string | null;
}

const Pic: React.FC<Props> = (props) => {
    const {pic} = PicLogic(props)

    return (
        <div className="image">
            <img src={/*pic != null ? pic : 'ImageNotFound'*/ 'https://us.123rf.com/450wm/seetwo/seetwo1907/seetwo190700208/126635447-ning%C3%BAn-signo-vac%C3%ADo-c%C3%ADrculo-tachado-rojo-signo-no-permitido-aislar-sobre-fondo-blanco-ilustraci%C3%B3n-vec.jpg?ver=6'} alt="No disponible" />
        </div>
    )

}

export default Pic