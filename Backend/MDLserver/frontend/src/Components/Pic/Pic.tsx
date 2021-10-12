import React from 'react';

import PicLogic from './PicLogic';

interface Props{
    url: string | null;
}

const Pic: React.FC<Props> = (props:Props) => {
    const { pic, setPic } = PicLogic(props)

    return (
        <img src={pic != null ? pic : 'ImageNotFound'} />
    )
}

export default Pic