import React, { useEffect } from "react";
import MyListsLogic from "./MyListsLogic";
import ListPreview from "../ListPreview/ListPreview";
import './MyLists.css'

const MyLists: React.FC = () => {
    const { selectedList, getData, filter, handleFilters, lists } = MyListsLogic()

    useEffect(() => {
        getData()
    }, [])
    return (
        <div className="mylist-content">
            <ul className="mylist-filter">
                <li className={filter === "film" ? 'liactive' : ''} onClick={handleFilters}>Film</li>
                <li className={filter === "series" ? 'liactive' : ''} onClick={handleFilters}>Series</li>
                <li className={filter === "song" ? 'liactive' : ''} onClick={handleFilters}>Song</li>
            </ul>
            <div className="mylist-line"></div>
            <div className="mylist-list_container">
                {
                    selectedList?.map((item, index) => {
                        return (<ListPreview {...item} key={index} />)
                    })
                }
            </div>
        </div >
    )
}

export default MyLists