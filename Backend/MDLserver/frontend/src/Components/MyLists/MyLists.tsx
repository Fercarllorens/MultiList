import React, {useEffect} from "react";
import './MyLists.css'
import MyListsLogic from "./MyListsLogic";
import ListPreview from "../ListPreview/ListPreview";

const MyLists: React.FC = () => {
    const {data, setData, getData, getList} = MyListsLogic()
    
    useEffect(() => {
       getData()
    }, [])

    
    
    return(
        

        <div className="list-content">
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