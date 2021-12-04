import React, { useState } from 'react'
import {useForm} from 'react-hook-form';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import { fetchHandler, fetchHandlerCb } from '../fetchHandler'

interface Props {
    data : JSON | null;
    type : string | null;
    contentId: string
}

interface Progress {
    user_id: string
    content_id: string
    state: string
    progress: string
}

interface Artist {
    name: string
    id: string
}

interface List {
    id: number,
    name: string,
    type: string,
    contents: string,
    user_id: string,
    custom: boolean,
}

// trailer es string, pasamos la url para usarla como source
const MultimediaContentLogic = (props:Props) => {
    const [ imageUrl, setImageUrl] =        useState<null | string>(null)
    const [ trailerUrl , setTrailerUrl] =   useState<null | string>(null)
    const [ listTop , setListTop] =         useState<string[]>([])
    const [ listBottom , setListBottom] =   useState<string[]>([])
    const [ progress, setProgress] =        useState<null | string>("")
    const [ watching, setWatching ] =       useState<string>("Select...") //PONER AQUI EL TEXTO QUE QUIERES QUE SALGA POR DEFECTO
    const [ addToListPremium, setAddToListPremium ] =       useState<string>("Select...") //PONER AQUI EL TEXTO QUE QUIERES QUE SALGA POR DEFECTO
    const [ lists, setLists] =              useState<null | List[]>(null)
    const [ selectedListName, setSelectedListName ] =       useState<string>("Select...")
    const [ rating, setRating] =            useState<null | number>(null) 
    const [ contentCheck, addContentCheck]= useState<boolean>(false)
    const [ artists, setArtists]= useState<Artist[]>([])
    const [ nombreTMDB, setNombreTMDB]= useState<string>("")
    const [ idTMDB, setidTMDB]= useState<string>("")
    const { register, handleSubmit } = useForm();

    const {search} = useLocation()
    const history = useHistory()
    const query = new URLSearchParams(search)
    const type_query: any = query.get('type')
    const id_query: any = query.get('id')
    const user_id : string | null = localStorage.getItem('user_id') 
    const base_url = 'http://127.0.0.1:8000/'
    const [added , setAdded] =  useState<null | boolean>(null)


    function isContentAdded() {
        //TODO: refactorize fetch
        
        let url = base_url + `api/get-list-user?user_id=${user_id}&content_type=${type_query}`
        let obj = fetch(url)
            .then(res => res ? res.json() : res)
            .then(json => {
                 if(json) if(JSON.parse(json.contents).items.includes(id_query))
                {
                     addContentCheck(true)
                }
            })
            .catch(err => console.error(err))
         setAdded(contentCheck)
    }

    function getUserLists(){
        return fetchHandlerCb(`api/get-lists-user?content_type=${type_query}&user_id=${user_id}`, 'GET', null, processLists);
    }

    function processLists(json: any){
        let listsAux: Array<any> = json != null ? JSON.parse(json) : []
        let res: Array<any> = []
        listsAux.forEach((element) => {
            const { id, name, type, contents, user_id, custom } = element
            !contents.includes(id_query) ?
            res.push({
                id: id,
                name: name,
                type: type,
                contents: contents,
                user_id: user_id,
                custom: custom,
            })
            : console.log(name + ' already contains that content');
        })
        setLists(res);
        setSelectedListName(res[0].name);
    }

    function getData(){
        switch(type_query){
            case "song":
                fetchHandlerCb(`spotify/get-track?id=${id_query}&user=${user_id}`, 'GET', null, processSong); break;
            case "series":
                fetchHandlerCb(`video/get-by-id?source_id=${id_query}&source=imdb`, 'GET', null, processSeries); break;
            case "film":
                fetchHandlerCb(`video/get-by-id?source_id=${id_query}&source=imdb`, 'GET', null, processFilm); break;
        }        
    }

    function processSong(json: any){
        const track: any = json;
        const {name, album, artists, duration_ms, preview_url} = track != null ? track : '';
        let external_url = track.external_urls;
        const {release_date, images} = album != null ? album : ''; 
        const {external_urls} = artists
        const {spotify} = external_url
        
        // New way to use fetchHandler
        //TODO: save output -> itll be the obj retrieved, need to get the comments if exists and the rating.
        fetchHandler('api/post-content', 'POST', {'name': name, 'type': 'song', 'external_id': id_query})
            //.then((obj:any) => {setRating(obj.total_rating)})

        // let artists_string = 'No artists found';
        let artists_array: Artist[] = []
        let genres_string = 'Not genres found';

        artists.forEach((artist: { name: string; genres: string[]; id: string }, index: number) => {
            // index == 0 ? artists_string = artist.name : artists_string += (", " + artist.name)
            artists_array.push({
                name: artist.name,
                id: artist.id
            })
            const {genres} = artist;

            if(genres != undefined){
                genres.forEach((element: any, index: number) => {
                    index == 0 ? genres_string = element : genres_string += (', ' + element)
                    fetchHandler('api/post-category', 'POST', {'name': element, 'type': 'song'})
                    }
                );
            }            
        });

        const year = release_date.substring(0,4);    
        const img = images.find((element: { height: number; }) => element.height === 300)
        const duration = (duration_ms / 60000).toString();
        const formated_duration = duration.split('.')[0] + '.' + duration.split('.')[1].substring(0,2);
        const album_name = album.name;
        const url = spotify;
        
        setArtists(artists_array)
        setImageUrl(img.url);
        setTrailerUrl(preview_url);
        setListTop([name, props.type, year, genres_string, 'green']);
        setListBottom([url, formated_duration, '', '', release_date, album_name]);
    }

    function processFilm(json: any){
        const film: any = json;
        const {original_title, poster_path, overview, release_date, genres} = film != null ? film : '';
        let genres_string = 'Not genres found';

        if(genres != undefined){
            genres.forEach((element: any, index: number) => {
                index == 0 ? genres_string = element : genres_string += (', ' + element)
                fetchHandler('api/post-category', 'POST', {'name': element.name, 'type': 'film'})
                }
            );
        } 

        locations.forEach((link: { icon: string; url: string; }, index: number) => {
            if (index == 0) preview_url = link.url
            else if (locations.includes("Netflix")) preview_url = "Netflix"
        })

        //fetchRequest(id_query, 'film', 'post', 'api', {element_name: name});
        // New way to use fetchHandler
        fetchHandler('api/post-content', 'POST', {'name': name, 'type': 'film', 'external_id': id_query});

        setImageUrl(picture);
        setListTop([name, props.type, 'red']);
        setListBottom([preview_url]);
    }

    function processSeries(json: any){
        const show: any = json;
        const {original_name, poster_path, overview, seasons, genres} = show != null ? show : '';
        let genres_string = 'Not genres found';
        let release_date;
        seasons.forEach(() => {
            release_date = seasons[0].air_date
        })

        if(genres != undefined){
            genres.forEach((element: any, index: number) => {
                index == 0 ? genres_string = element : genres_string += (', ' + element)
                fetchHandler('api/post-category', 'POST', {'name': element.name, 'type': 'series'})
                }
            );
        } 
        
        getTrailer()

        let img = "https://image.tmdb.org/t/p/w500/" + poster_path;

        //fetchRequest(id_query, 'series', 'post', 'api', {element_name: name});
        // New way to use fetchHandler
        fetchHandler('api/post-content', 'POST', {'name': name, 'type': 'series', 'external_id': id_query});

        setImageUrl(picture);
        setListTop([name, props.type, 'blue']);
        setListBottom([preview_url]);
    }
      
    function handleAddContent(){
        //user id, content id y content_type

        let listName = getBasicListName(type_query);
        const body = JSON.stringify({
            user_id: user_id,
            content_id: id_query,
            content_type: type_query,
            name : listName,
        })

        //TODO if request goes ok, update icon of the button
        if (!added){
        fetch(base_url+'api/update-list', {method:"POST", body: body, headers:{'Content-Type': 'application/json'}})
            .then(res => res.json())
            .then(json => console.log(json))
            .catch(err => console.error(err))
        }
        setAdded(!added)
    }

    function handleDeleteContent(){
        //user id, content id y content_type
        const body = JSON.stringify({
            user_id: user_id,
            content_id: id_query,
            content_type: type_query
        })

        //TODO if request goes ok, update icon of the button
        if (added){
        fetch(base_url+'api/delete-list', {method:"POST", body: body, headers:{'Content-Type': 'application/json'}})
            .then(res => res.json())
            .then(json => console.log(json))
            .catch(err => console.error(err))
        }
        setAdded(!added)
    }

    function getProgress() {
        fetch(base_url + `api/get-progress?user_id=${user_id}&content_id=${id_query}`)
          .then(res => res.json())
          .then(json => {
              console.log(json)
              if (json != null){
                setProgress(json.progress)
                setWatching(json.state)
              }
          })
    }

    function handleUpdateProgress(data: any){ 
        console.log(data)
        console.log(typeof(data))
        const body = JSON.stringify({
            user_id: user_id,
            content_id: id_query,
            state: watching,
            progress: data.watching_progress ? data.watching_progress : "Sin registrar" 
        })

        fetch(base_url + `api/update-progress` , {method: 'POST', body: body, headers: {'Content-Type': 'application/json'}})
          .then(res => res.json())
          .then(json => console.log(json))
          .catch(err => console.error(err))
    }

    const showArtist = (id: string) => {  
        
        history.push({
            pathname:'/Artist',
            search: `?id=${id}`
         })

    }

    function getIdTMDB(){
        console.log(listTop[0])
        if(type_query == 'series'){
            fetchHandlerCb(`video/get-show?query=${listTop[0]}&page={1}`, 'GET', null, setIdTMDB)
        } else if (type_query == 'film'){
            fetchHandlerCb(`video/get-film?query=${listTop[0]}&page={1}`, 'GET', null, setIdTMDB)
        }
        
    }

    function setIdTMDB(json:any){
        setNombreTMDB(listTop[0])
        setidTMDB(json.results[0].id)
        console.log(json.results[0].id)
        history.push({
            pathname:'/Cast',
            search: `?name=${listTop[0]}&id=${json.results[0].id}&type=${type_query}&img=${imageUrl}}`
         })
    }
    
    function handleAddToListPremium(){ 
        const body = JSON.stringify({
            user_id: user_id,
            content_id: id_query,
            content_type: type_query,
            name : selectedListName,
        })

        //TODO if request goes ok, update icon of the button
        if (!added){
        fetch(base_url+'api/update-list', {method:"POST", body: body, headers:{'Content-Type': 'application/json'}})
            .then(res => res.json())
            .then(json => console.log(json))
            .catch(err => console.error(err))
        }

        let listsAux = lists;
        let listToSplice: any = listsAux?.filter(list => list.name === selectedListName).shift();
        listsAux?.splice(listsAux?.indexOf(listToSplice), 1);
        setLists(listsAux);
        setSelectedListName(lists != null ? lists[0].name : "Not found");
    }

    function getBasicListName(type: string){
        return type == 'series' ? type : type + 's'
    }

    return {listTop, imageUrl, trailerUrl, listBottom, setWatching, progress, watching, addToListPremium, setAddToListPremium, rating, 
        type_query, id_query, getData, getProgress, handleAddContent, handleDeleteContent, 
        handleUpdateProgress, handleAddToListPremium, register, handleSubmit, added, isContentAdded,
         lists, getUserLists, selectedListName, setSelectedListName, getIdTMDB, artists, showArtist}
}

export default MultimediaContentLogic