import React, {useEffect} from "react";
import MyListsLogic from "./MyListsLogic";
import ListPreview from "../ListPreview/ListPreview";
import './MyLists.css'

const MyLists: React.FC = () => {
    const {data, setData, getData, getList} = MyListsLogic()
    
    useEffect(() => {
       getData()
    }, [])
    
    return(
        <div className="mylist-content">
            {   
                data != null && data.lists? (
                    getList().map((element) => {

                        return (<ListPreview id={element.toString()} />)
                    })):
                    <p>nothing</p>
            }
        </div>
    )
}

export default MyLists