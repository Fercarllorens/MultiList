import React from 'react';

import PicLogic from './PicLogic';

interface Props{
    url: string | null;
}

const Pic: React.FC<Props> = (props) => {
    const {pic} = PicLogic(props)

    return (
        <img className="image" src={pic != null ? pic : 'ImageNotFound'} alt="No disponible" />
    )
}

export default Pic