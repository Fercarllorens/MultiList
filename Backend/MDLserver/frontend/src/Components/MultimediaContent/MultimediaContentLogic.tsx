import { resolve } from 'path';
import { stringify } from 'querystring';
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import { fetchHandler, fetchHandlerCb } from '../fetchHandler'

interface Props {
    data: JSON | null;
    type: string | null;
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

interface Genre {
    name: string
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
const MultimediaContentLogic = (props: Props) => {
    const [imageUrl, setImageUrl] = useState<null | string>(null)
    const [contentLink, setcontentLink] = useState<null | string>(null)
    const [trailerUrl, setTrailerUrl] = useState<null | string>(null)
    const [listTop, setListTop] = useState<string[]>([])
    const [listBottom, setListBottom] = useState<string[]>([])
    const [progress, setProgress] = useState<null | string>("")
    const [watching, setWatching] = useState<string>("Select...") //PONER AQUI EL TEXTO QUE QUIERES QUE SALGA POR DEFECTO
    const [addToListPremium, setAddToListPremium] = useState<string>("Select...") //PONER AQUI EL TEXTO QUE QUIERES QUE SALGA POR DEFECTO
    const [lists, setLists] = useState<null | List[]>(null)
    const [selectedListName, setSelectedListName] = useState<string>("Select...")
    const [rating, setRating] = useState<null | number>(null)
    const [contentCheck, addContentCheck] = useState<boolean>(false)
    const [artists, setArtists] = useState<Artist[]>([])
    const [genresString, setGenresString] = useState<string>('')
    const [nombreTMDB, setNombreTMDB] = useState<string>("")
    const [idTMDB, setidTMDB] = useState<string>("")
    const { register, handleSubmit } = useForm();

    const { search } = useLocation()
    const history = useHistory()
    const query = new URLSearchParams(search)
    const type_query: any = query.get('type')
    const id_query: any = query.get('id')
    const user_id: string | null = localStorage.getItem('user_id')
    const base_url = 'http://127.0.0.1:8000/'
    const [added, setAdded] = useState<null | boolean>(null)
    let genres_array: string[] = []

    /*useEffect(() => {
        //updateArrayString()
    }, [])*/


    function isContentAdded() {
        //TODO: refactorize fetch
        let url = base_url + `api/get-list-user?user_id=${user_id}&content_type=${type_query}`
        let obj = fetch(url)
            .then(res => res ? res.json() : res)
            .then(json => {
                if (json) if (JSON.parse(json.contents).items.includes(id_query)) {
                    addContentCheck(true)
                }
            })
            .catch(err => console.error(err))
        setAdded(contentCheck)
    }

    function getUserLists() {
        return fetchHandlerCb(`api/get-lists-user?content_type=${type_query}&user_id=${user_id}`, 'GET', null, processLists);
    }

    function processLists(json: any) {
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

    function getData() {
        switch (type_query) {
            case "song":
                fetchHandlerCb(`spotify/get-track?id=${id_query}&user=${user_id}`, 'GET', null, processSong); break;
            case "series":
                fetchHandlerCb(`video/get-show-by-id?id=${id_query}`, 'GET', null, processSeries); break;
            case "film":
                fetchHandlerCb(`video/get-film-by-id?id=${id_query}`, 'GET', null, processFilm); break;
        }
    }

    function processSong(json: any) {
        const track: any = json;
        const { name, album, artists, duration_ms, preview_url } = track != null ? track : '';
        let external_url = track.external_urls;
        const { release_date, images } = album != null ? album : '';
        const { external_urls } = artists
        const { spotify } = external_url

        // New way to use fetchHandler
        //TODO: save output -> itll be the obj retrieved, need to get the comments if exists and the rating.
        fetchHandler('api/post-content', 'POST', { 'name': name, 'type': 'song', 'external_id': id_query })
            .then((obj: any) => { setRating(obj.total_rating) })

        // let artists_string = 'No artists found';
        let artists_array: Artist[] = []
        //let genres_array: string[] = [];
        let genres_string = 'Not genres found';       

        artists.forEach((artist: { name: string; id: string }, index: number) => {
            // index == 0 ? artists_string = artist.name : artists_string += (", " + artist.name)
            artists_array.push({
                name: artist.name,
                id: artist.id
            })

            fetchHandler(`spotify/get-artist?id=${artist.id}&user=${user_id}`, 'GET', null)
                .then((obj: any) => {
                    const {genres} = obj
                    genres.forEach((genre: string, index: number) => {
                        /*genres_string == 'Not genres found' ? 
                            genres_string = genre : 
                            (!genres_string.includes(genre) ? 
                                (
                                    genres_string = genres_string + ', ' + genre
                                    //fetchHandler('api/post-category', 'POST', { 'name': genre, 'type': 'song' })
                                ) : 
                                console.log('Genero ya existente')
                            )
                        */                       
                       !genres_array.includes(genre) ? genres_array.push(genre) : console.log('Existing genre')                   
                    })
                })         
        });

        genres_array.forEach((genre: string) => { 
            console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAA'); 
            //fetchHandler('api/post-category', 'POST', { 'name': genre.name, 'type': 'song' })
            }
        );
        
        setTimeout(() => updateArrayString(genres_array), 1000)
        
        const year = release_date.substring(0, 4);
        const img = images.find((element: { height: number; }) => element.height === 300)
        let ms_to_segs = duration_ms / 1000;
        let min = ms_to_segs / 60;
        let seg = ms_to_segs % 60;
        let formatted_segs = seg < 10 ? '0' + seg.toString() : seg.toString();
        const formated_duration = min.toString().split('.')[0] + ':' + formatted_segs.toString().split('.')[0];
        const album_name = album.name;
        const url = spotify;

        setArtists(artists_array)
        setImageUrl(img.url);
        setTrailerUrl(preview_url);
        setListTop([name, props.type, year, genres_string, 'green']);
        setListBottom([formated_duration, '', '', release_date, album_name]);
        setcontentLink(url);
    }

    function updateArrayString(genres: string[]){
        let aux_string = ''
        genres.forEach((genre: string) => { 
                fetchHandler('api/post-category', 'POST', { 'name': capitalize(genre), 'type': 'song' })
            }
        );
        genres.forEach((genre: string) => { 
            aux_string == '' ? aux_string = capitalize(genre) : aux_string = aux_string + ', ' + capitalize(genre)
            }
        );
        setTimeout(() => setGenresString(aux_string), 1000)
    }

    function capitalize(word: string) {
        const lower = word.toLowerCase();
        return word.charAt(0).toUpperCase() + lower.slice(1);
      }

    function processFilm(json: any) {
        const film: any = json;
        const { original_title, poster_path, overview, release_date, genres } = film != null ? film : '';
        let genres_string = 'Not genres found';

        if (genres != undefined) {
            genres.forEach((element: any, index: number) => {
                index == 0 ? genres_string = element : genres_string += (', ' + element)
                fetchHandler('api/post-category', 'POST', { 'name': element.name, 'type': 'film' })
            }
            );
        }

        getTrailer()

        let img = "https://image.tmdb.org/t/p/w500/" + poster_path;

        fetchHandler('api/post-content', 'POST', { 'name': original_title, 'type': 'film', 'external_id': id_query })
            .then((obj: any) => { setRating(obj.total_rating) });
        setImageUrl(img);
        setListTop([original_title, props.type, 'red']);
        setListBottom([release_date, overview]);
    }

    function processSeries(json: any) {
        const show: any = json;
        const { original_name, poster_path, overview, seasons, genres } = show != null ? show : '';
        let genres_string = 'Not genres found';
        let release_date;
        seasons.forEach(() => {
            release_date = seasons[0].air_date
        })

        if (genres != undefined) {
            genres.forEach((element: any, index: number) => {
                index == 0 ? genres_string = element : genres_string += (', ' + element)
                fetchHandler('api/post-category', 'POST', { 'name': element.name, 'type': 'series' })
            }
            );
        }

        getTrailer()

        let img = "https://image.tmdb.org/t/p/w500/" + poster_path;

        fetchHandler('api/post-content', 'POST', { 'name': original_name, 'type': 'series', 'external_id': id_query })
            .then((obj: any) => { setRating(obj.total_rating) });

        setImageUrl(img);
        setListTop([original_name, props.type, 'blue']);
        setListBottom([release_date, overview]);
    }

    function handleAddContent() {
        //user id, content id y content_type

        let listName = getBasicListName(type_query);
        const body = JSON.stringify({
            user_id: user_id,
            content_id: id_query,
            content_type: type_query,
            name: listName,
        })

        //TODO if request goes ok, update icon of the button
        if (!added) {
            fetch(base_url + 'api/update-list', { method: "POST", body: body, headers: { 'Content-Type': 'application/json' } })
                .then(res => res.json())
                .catch(err => console.error(err))
        }
        setAdded(!added)
    }

    function handleDeleteContent() {
        //user id, content id y content_type
        const body = JSON.stringify({
            user_id: user_id,
            content_id: id_query,
            content_type: type_query
        })

        //TODO if request goes ok, update icon of the button
        if (added) {
            fetch(base_url + 'api/delete-list', { method: "POST", body: body, headers: { 'Content-Type': 'application/json' } })
                .then(res => res.json())
                .catch(err => console.error(err))
        }
        setAdded(!added)
    }

    function getProgress() {
        fetch(base_url + `api/get-progress?user_id=${user_id}&content_id=${id_query}`)
            .then(res => res.json())
            .then(json => {
                if (json != null) {
                    setProgress(json.progress)
                    setWatching(json.state)
                }
            })
    }

    function handleUpdateProgress(data: any) {
        const body = JSON.stringify({
            user_id: user_id,
            content_id: id_query,
            state: watching,
            progress: data.watching_progress ? data.watching_progress : "Sin registrar"
        })

        fetch(base_url + `api/update-progress`, { method: 'POST', body: body, headers: { 'Content-Type': 'application/json' } })
            .then(res => res.json())
            .catch(err => console.error(err))
    }

    const showArtist = (id: string) => {

        history.push({
            pathname: '/Artist',
            search: `?id=${id}`
        })

    }

    function getIdTMDB() {
        if (type_query == 'series') {
            fetchHandlerCb(`video/get-show?query=${listTop[0]}&page={1}`, 'GET', null, setIdTMDB)
        } else if (type_query == 'film') {
            fetchHandlerCb(`video/get-film?query=${listTop[0]}&page={1}`, 'GET', null, setIdTMDB)
        }
    }

    function setIdTMDB(json: any) {
        setNombreTMDB(listTop[0])
        setidTMDB(json.results[0].id)
        history.push({
            pathname: '/Cast',
            search: `?name=${listTop[0]}&id=${json.results[0].id}&type=${type_query}&img=${imageUrl}`
        })
    }

    function getTrailer() {
        if (type_query == 'series') {
            fetchHandlerCb(`video/get-show-trailer?id=${id_query}`, 'GET', null, setTrailer)
        } else if (type_query == 'film') {
            fetchHandlerCb(`video/get-film-trailer?id=${id_query}`, 'GET', null, setTrailer)
        }
    }

    function setTrailer(json: any) {
        setTrailerUrl('https://www.youtube.com/embed/' + json.results[0].key)
    }

    function handleAddToListPremium() {
        const body = JSON.stringify({
            user_id: user_id,
            content_id: id_query,
            content_type: type_query,
            name: selectedListName,
        })

        //TODO if request goes ok, update icon of the button
        if (!added) {
            fetch(base_url + 'api/update-list', { method: "POST", body: body, headers: { 'Content-Type': 'application/json' } })
                .then(res => res.json())
                .catch(err => console.error(err))
        }

        let listsAux = lists;
        let listToSplice: any = listsAux?.filter(list => list.name === selectedListName).shift();
        listsAux?.splice(listsAux?.indexOf(listToSplice), 1);
        setLists(listsAux);
        setSelectedListName(lists != null ? lists[0].name : "Not found");
    }

    function getBasicListName(type: string) {
        return type == 'series' ? type : type + 's'
    }

    return {
        listTop, imageUrl, trailerUrl, listBottom, contentLink, setWatching, progress, watching, addToListPremium, setAddToListPremium, rating,
        type_query, id_query, getData, getProgress, handleAddContent, handleDeleteContent,
        handleUpdateProgress, handleAddToListPremium, register, handleSubmit, added, isContentAdded,
        lists, getUserLists, selectedListName, setSelectedListName, getIdTMDB, artists, showArtist, getTrailer, genresString
    }
}

export default MultimediaContentLogic