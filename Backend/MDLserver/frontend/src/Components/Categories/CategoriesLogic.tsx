import React, { useState } from 'react'
import {useForm} from 'react-hook-form';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import { fetchHandler, fetchHandlerCb } from '../fetchHandler'

interface Props {
}

interface Category{
    id: string
    name: string
    type: string
}

const CategoriesLogic = (props:Props) => {

    const [ filmsCategories, setFilmsCategories] = useState<null | any[]>(null)
    const [ seriesCategories, setSeriesCategories] = useState<null | any[]>(null)
    const [ songsCategories, setSongsCategories] = useState<null | any[]>(null)

    function getFilmCategories(){
        fetchHandler(`api/get-categories-by-type?type=film`, 'GET', null)
            .then((obj:any) => {
                if(obj!==undefined){ 
                    const filmsCategoriesArray = JSON.parse(obj)
                    setFilmsCategories(filmsCategoriesArray)
                }
            })
    }

    function getSeriesCategories(){
        fetchHandler(`api/get-categories-by-type?type=series`, 'GET', null)
            .then((obj:any) => {
                if(obj!==undefined){ 
                    const seriesCategoriesArray = JSON.parse(obj)
                    setSeriesCategories(seriesCategoriesArray)
                }
            })
    }

    function getSongsCategories(){
        fetchHandler(`api/get-categories-by-type?type=song`, 'GET', null)
            .then((obj:any) => {
                if(obj!==undefined){ 
                    const songsCategoriesArray = JSON.parse(obj)
                    setSongsCategories(songsCategoriesArray)
                }
            })
    }

    return {getFilmCategories, filmsCategories, getSeriesCategories, seriesCategories, getSongsCategories, songsCategories}
}

export default CategoriesLogic