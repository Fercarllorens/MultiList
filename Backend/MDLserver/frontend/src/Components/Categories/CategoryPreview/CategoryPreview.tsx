import React from 'react'
import './CategoryPreview.css'
import CategoryPreviewLogic from './CategoryPreviewLogic'

interface Category{
    id: string
    name: string;
    type: string
}

interface Props{
    category: Category
}

const CategoryPreview: React.FC<Props> = ({category}) => {
    const {addCategory} = CategoryPreviewLogic(category)

    return (
        <div>
            <div className="CategoryName">
                {category.name}
            </div>
            <input type="image" onClick={()=>{addCategory(category)}} src="https://static.thenounproject.com/png/2453491-200.png"/>
        </div>
    )
}
export default CategoryPreview