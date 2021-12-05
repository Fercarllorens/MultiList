import React from 'react'
import FindCategoriesLogic from './FindCategoriesLogic'
import CategoryPreview from '../../ItemPreview/FilmPreview/FilmPreview'
import './FindCategories.css'

interface Category{
    id: string
    name: string
    type: string
}

interface Props{
    categories: Category[] | null
}

const FindCategories: React.FC<Props> = ({categories}) => {
    const {} = FindCategoriesLogic()

    return (
        <div className="FindCategoriesContainer">
            <>
            {
                categories!==undefined ?
                    categories?.map((element) => (
                        <p>{element.name}</p>
                    ))
                : 'No results'
            }
            </>
        </div>
    )
}
export default FindCategories