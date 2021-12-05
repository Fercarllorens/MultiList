import React from 'react'
import './CategoryPreview.css'

interface Category{
    id: string
    name: string;
    type: string
}

interface Props{
    category: Category
}

const CategoryPreview: React.FC<Props> = ({category}) => {

    return (
        <div>
            <div className="CategoryName">
                {category.name}
            </div>
            <div className="PictureDiv">
                <img className="Picture" src={'../../../../img/add-button.png'} height="130" width="130" alt="no disponible"></img>
            </div>
        </div>
    )
}
export default CategoryPreview