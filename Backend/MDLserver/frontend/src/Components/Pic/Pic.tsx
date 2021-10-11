import React from 'react';

import PicLogic from './PicLogic';

interface Props{
    imageData: string;
}

const Pic: React.FC<Props> = (props) => {
    const { pic, setPic } = PicLogic(props)

    return (
        <div>
            Hola
        </div>
    )
}

export default Pic