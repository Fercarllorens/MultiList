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

interface Type{
    films_selected: boolean;
    series_selected: boolean;
    songs_selected: boolean;
}

const CategoriesLogic = (props:Props) => {
    
    const [ user, setUser ] =   useState<null | any>(null)
    const [ userCategories, setUserCategories ] =   useState<null | any[]>(null)
    const [ filmsCategories, setFilmsCategories] = useState<null | any[]>(null)
    const [ filteredFilmsCategories, setFilteredFilmsCategories] = useState<null | any[]>(null)
    const [ seriesCategories, setSeriesCategories] = useState<null | any[]>(null)
    const [ filteredSeriesCategories, setFilteredSeriesCategories] = useState<null | any[]>(null)
    const [ songsCategories, setSongsCategories] = useState<null | any[]>(null)
    const [ filteredSongsCategories, setFilteredSongsCategories] = useState<null | any[]>(null)
    const [ type_selected, setTypeSelected] = useState<Type>({
        
        films_selected: false,
        series_selected: false,
        songs_selected: false
    
    })

    const user_id: any = localStorage.getItem('user_id')

    function getUserAndUserCategories(){
        fetchHandlerCb(`api/get-user?user_id=${user_id}`, "GET", null, (obj) => {
            setUser(obj);
            setUserCategories(obj.categories);
        })       
    }

    function getFilmCategories(){
        fetchHandler(`api/get-categories-by-type?type=film`, 'GET', null)
            .then((obj:any) => {
                if(obj!==undefined){ 
                    const filmsCategoriesArray = JSON.parse(obj)
                    setFilmsCategories(filmsCategoriesArray)
                    setFilteredFilmsCategories(filmsCategoriesArray)
                }
            })
    }

    function getSeriesCategories(){
        fetchHandler(`api/get-categories-by-type?type=series`, 'GET', null)
            .then((obj:any) => {
                if(obj!==undefined){ 
                    const seriesCategoriesArray = JSON.parse(obj)
                    setSeriesCategories(seriesCategoriesArray)
                    setFilteredSeriesCategories(seriesCategoriesArray)
                }
            })
    }

    function getSongsCategories(){
        fetchHandler(`api/get-categories-by-type?type=song`, 'GET', null)
            .then((obj:any) => {
                if(obj!==undefined){ 
                    const songsCategoriesArray = JSON.parse(obj)
                    setSongsCategories(songsCategoriesArray)
                    setFilteredSongsCategories(songsCategoriesArray)
                }
            })
    }

    const find = (e: any, content: string) => {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {
            type_selected.films_selected && filterType("films", content)
            type_selected.series_selected && filterType("series", content)
            type_selected.songs_selected && filterType("songs", content)
            e.preventDefault();
            return false;
        }
    }

    const selectType = (type: "films" | "series" | "songs") => {
        if (type == "films") setTypeSelected({films_selected: true, series_selected: false, songs_selected: false})
        else if (type == "series") setTypeSelected({films_selected: false, series_selected: true, songs_selected: false})
        else setTypeSelected({films_selected: false, series_selected: false, songs_selected: true})
    }

    const filterType = (type: "films" | "series" | "songs", content: string) => {
        filterFilmsCategories(content)
        filterSeriesCategories(content)
        filterSongsCategories(content)
    }

    const filterFilmsCategories = (content: string) => {
        let filmsCategoriesFilteredByContent = filmsCategories != null ? filmsCategories.filter(
            item => item.name.toLowerCase().includes(content.toLowerCase())) : null
        setFilteredFilmsCategories(filmsCategoriesFilteredByContent)
    }

    const filterSeriesCategories = (content: string) => {
        let seriesCategoriesFilteredByContent = seriesCategories != null ? seriesCategories.filter(
            item => item.name.toLowerCase().includes(content.toLowerCase())) : null
        setFilteredSeriesCategories(seriesCategoriesFilteredByContent)
    }

    const filterSongsCategories = (content: string) => {
        let songsCategoriesFilteredByContent = songsCategories != null ? songsCategories.filter(
            item => item.name.toLowerCase().includes(content.toLowerCase())) : null
        setFilteredSongsCategories(songsCategoriesFilteredByContent)
    }

    function updateFilteredCategoriesAfterUserAddition(){
        getUserAndUserCategories();
        setFilteredFilmsCategories(filteredFilmsCategories != null ? filteredFilmsCategories.filter((item: { id: any; }) => !userCategories?.includes(item.id)) : null)
        setFilteredSeriesCategories(filteredSeriesCategories != null ? filteredSeriesCategories.filter((item: { id: any; }) => !userCategories?.includes(item.id)) : null)
        setFilteredSongsCategories(filteredSongsCategories != null ? filteredSongsCategories.filter((item: { id: any; }) => !userCategories?.includes(item.id)) : null)
    }

    function addCategory(category:Category){
        let body = {
            user_id: user_id,
            name: category.name,
            type: category.type
        }
        fetchHandlerCb(`api/update-user-categories`, "POST", body, () => {getUserAndUserCategories(); updateFilteredCategoriesAfterUserAddition()})
    }

    return {getFilmCategories, filmsCategories, getSeriesCategories, seriesCategories, getSongsCategories, songsCategories, find, selectType, type_selected, 
        filteredFilmsCategories, filteredSeriesCategories, filteredSongsCategories, getUserAndUserCategories, userCategories, updateFilteredCategoriesAfterUserAddition, addCategory}
}

export default CategoriesLogic
