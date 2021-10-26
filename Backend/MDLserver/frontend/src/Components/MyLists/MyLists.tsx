import React, {useEffect} from "react";
import './MyLists.css'
import MyListsLogic from "./MyListsLogic";
import ListPreview from "../ListPreview/ListPreview";

const MyLists: React.FC = () => {
    const {data, setData, getData} = MyListsLogic()
    
    useEffect(() => {
       getData()
    }, [])

    return(
        <div className="list-content">
            {   
                data && (
                    data.lists.map((element) => (
                        <ListPreview id={element} />
                    )))
            }
        </div>
    )
}

export default MyLists