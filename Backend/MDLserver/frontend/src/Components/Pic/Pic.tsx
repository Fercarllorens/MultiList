import React from 'react';

import PicLogic from './PicLogic';

interface Props{
    url: string;
}

const Pic: React.FC<Props> = (props:Props) => {
    const { pic, setPic } = PicLogic(props)

    return (
        <div>
            Hola
        </div>
    )
}

export default Pic