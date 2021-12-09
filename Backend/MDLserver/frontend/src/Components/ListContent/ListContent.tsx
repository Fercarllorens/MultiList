import React, { useEffect } from 'react';
import './ListContent.css'
import ListContentLogic from './ListContentLogic';


const ListContent = () => {
    const { list, currentContents, getData, filterData } = ListContentLogic()

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="list-content">
            <h1 className="list-name">{list?.name}</h1>
            <input type="text" className="list-content-searchbar" placeholder="Search..." onChange={filterData} />
            <div className="list-content__container">
                {
                    currentContents?.map((item, index) => {
                        return (
                            <div className="content-preview" key={index}><h4>{item.name}</h4></div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ListContent