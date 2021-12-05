import React from 'react'
import CategoryPreview from '../CategoryPreview/CategoryPreview'
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

    return (
        <div>
            {
                categories!==undefined ?
                    categories?.map((element) => (
                        <CategoryPreview category={element}/>
                    ))
                : 'No results'
            }
        </div>
    )
}
export default FindCategories