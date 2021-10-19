import { useState } from "react";
import { useEffect } from "react";

interface Type{
    films_selected: boolean;
    series_selected: boolean;
    songs_selected: boolean;
}

interface Song{
    name: string;
    authors: string;
    date: string;
    img: string;
    preview_url: string;
    album: any;
}

interface Film{
    name: string;
    authors: string;
    date: string;
    img: string;
    preview_url: string;
    genre: any;
}

const FinderLogic = () => {

    const [type_selected, set_type_selected] = useState<Type>({
        
        films_selected: false,
        series_selected: false,
        songs_selected: false
    
    })

    const [movies, set_movies] = useState([
        {
            "name": "Persona 3 The Movie #1: Spring of Birth",
            "authors": "Noriaki Akitaya",
            "date": "November 23th, 2013",
            "img": "https://static.wikia.nocookie.net/megamitensei/images/e/e0/P3TM1-ost.jpg/revision/latest?cb=20160824205251",
            "preview_url": "https://www.youtube.com/watch?v=r7-M90PNk5E",
            "genre": "Action / Fantasy",
        }
    ])

    const [tracks, set_tracks] = useState([
        {
            "album": {
                "album_type": "single",
                "artists": [
                    {
                        "external_urls": {
                            "spotify": "https://open.spotify.com/artist/6sFIWsNpZYqfjUpaCgueju"
                        },
                        "href": "https://api.spotify.com/v1/artists/6sFIWsNpZYqfjUpaCgueju",
                        "id": "6sFIWsNpZYqfjUpaCgueju",
                        "name": "Carly Rae Jepsen",
                        "type": "artist",
                        "uri": "spotify:artist:6sFIWsNpZYqfjUpaCgueju"
                    }
                ],
                "available_markets": [
                    "AD",
                    "AR",
                    "AT",
                    "AU",
                    "BE",
                    "BG",
                    "BO",
                    "BR",
                    "CA",
                    "CH",
                    "CL",
                    "CO",
                    "CR",
                    "CY",
                    "CZ",
                    "DE",
                    "DK",
                    "DO",
                    "EC",
                    "EE",
                    "ES",
                    "FI",
                    "FR",
                    "GB",
                    "GR",
                    "GT",
                    "HK",
                    "HN",
                    "HU",
                    "ID",
                    "IE",
                    "IL",
                    "IS",
                    "IT",
                    "JP",
                    "LI",
                    "LT",
                    "LU",
                    "LV",
                    "MC",
                    "MT",
                    "MX",
                    "MY",
                    "NI",
                    "NL",
                    "NO",
                    "NZ",
                    "PA",
                    "PE",
                    "PH",
                    "PL",
                    "PT",
                    "PY",
                    "RO",
                    "SE",
                    "SG",
                    "SK",
                    "SV",
                    "TH",
                    "TR",
                    "TW",
                    "US",
                    "UY",
                    "VN",
                    "ZA"
                ],
                "external_urls": {
                    "spotify": "https://open.spotify.com/album/0tGPJ0bkWOUmH7MEOR77qc"
                },
                "href": "https://api.spotify.com/v1/albums/0tGPJ0bkWOUmH7MEOR77qc",
                "id": "0tGPJ0bkWOUmH7MEOR77qc",
                "images": [
                    {
                        "height": 640,
                        "url": "https://i.scdn.co/image/966ade7a8c43b72faa53822b74a899c675aaafee",
                        "width": 640
                    },
                    {
                        "height": 300,
                        "url": "https://i.scdn.co/image/107819f5dc557d5d0a4b216781c6ec1b2f3c5ab2",
                        "width": 300
                    },
                    {
                        "height": 64,
                        "url": "https://i.scdn.co/image/5a73a056d0af707b4119a883d87285feda543fbb",
                        "width": 64
                    }
                ],
                "name": "Cut To The Feeling",
                "release_date": "2017-05-26",
                "release_date_precision": "day",
                "type": "album",
                "uri": "spotify:album:0tGPJ0bkWOUmH7MEOR77qc"
            },
            "artists": [
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/6sFIWsNpZYqfjUpaCgueju"
                    },
                    "href": "https://api.spotify.com/v1/artists/6sFIWsNpZYqfjUpaCgueju",
                    "id": "6sFIWsNpZYqfjUpaCgueju",
                    "name": "Carly Rae Jepsen",
                    "type": "artist",
                    "uri": "spotify:artist:6sFIWsNpZYqfjUpaCgueju"
                }
            ],
            "available_markets": [
                "AD",
                "AR",
                "AT",
                "AU",
                "BE",
                "BG",
                "BO",
                "BR",
                "CA",
                "CH",
                "CL",
                "CO",
                "CR",
                "CY",
                "CZ",
                "DE",
                "DK",
                "DO",
                "EC",
                "EE",
                "ES",
                "FI",
                "FR",
                "GB",
                "GR",
                "GT",
                "HK",
                "HN",
                "HU",
                "ID",
                "IE",
                "IL",
                "IS",
                "IT",
                "JP",
                "LI",
                "LT",
                "LU",
                "LV",
                "MC",
                "MT",
                "MX",
                "MY",
                "NI",
                "NL",
                "NO",
                "NZ",
                "PA",
                "PE",
                "PH",
                "PL",
                "PT",
                "PY",
                "RO",
                "SE",
                "SG",
                "SK",
                "SV",
                "TH",
                "TR",
                "TW",
                "US",
                "UY",
                "VN",
                "ZA"
            ],
            "disc_number": 1,
            "duration_ms": 207959,
            "explicit": false,
            "external_ids": {
                "isrc": "USUM71703861"
            },
            "external_urls": {
                "spotify": "https://open.spotify.com/track/11dFghVXANMlKmJXsNCbNl"
            },
            "href": "https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl",
            "id": "11dFghVXANMlKmJXsNCbNl",
            "is_local": false,
            "name": "Cut To The Feeling",
            "popularity": 63,
            "preview_url": "https://p.scdn.co/mp3-preview/3eb16018c2a700240e9dfb8817b6f2d041f15eb1?cid=774b29d4f13844c495f206cafdad9c86",
            "track_number": 1,
            "type": "track",
            "uri": "spotify:track:11dFghVXANMlKmJXsNCbNl"
        },

        {
            "album": {
                "album_type": "single",
                "artists": [
                    {
                        "external_urls": {
                            "spotify": "https://open.spotify.com/artist/6sFIWsNpZYqfjUpaCgueju"
                        },
                        "href": "https://api.spotify.com/v1/artists/6sFIWsNpZYqfjUpaCgueju",
                        "id": "6sFIWsNpZYqfjUpaCgueju",
                        "name": "Hasbullah",
                        "type": "artist",
                        "uri": "spotify:artist:6sFIWsNpZYqfjUpaCgueju"
                    },
                    {
                        "external_urls": {
                            "spotify": "https://open.spotify.com/artist/6sFIWsNpZYqfjUpaCgueju"
                        },
                        "href": "https://api.spotify.com/v1/artists/6sFIWsNpZYqfjUpaCgueju",
                        "id": "6sFIWsNpZYqfjUpaCgueju",
                        "name": "Abdu Rozik",
                        "type": "artist",
                        "uri": "spotify:artist:6sFIWsNpZYqfjUpaCgueju"
                    }
                ],
                "available_markets": [
                    "AD",
                    "AR",
                    "AT",
                    "AU",
                    "BE",
                    "BG",
                    "BO",
                    "BR",
                    "CA",
                    "CH",
                    "CL",
                    "CO",
                    "CR",
                    "CY",
                    "CZ",
                    "DE",
                    "DK",
                    "DO",
                    "EC",
                    "EE",
                    "ES",
                    "FI",
                    "FR",
                    "GB",
                    "GR",
                    "GT",
                    "HK",
                    "HN",
                    "HU",
                    "ID",
                    "IE",
                    "IL",
                    "IS",
                    "IT",
                    "JP",
                    "LI",
                    "LT",
                    "LU",
                    "LV",
                    "MC",
                    "MT",
                    "MX",
                    "MY",
                    "NI",
                    "NL",
                    "NO",
                    "NZ",
                    "PA",
                    "PE",
                    "PH",
                    "PL",
                    "PT",
                    "PY",
                    "RO",
                    "SE",
                    "SG",
                    "SK",
                    "SV",
                    "TH",
                    "TR",
                    "TW",
                    "US",
                    "UY",
                    "VN",
                    "ZA"
                ],
                "external_urls": {
                    "spotify": "https://open.spotify.com/album/0tGPJ0bkWOUmH7MEOR77qc"
                },
                "href": "https://api.spotify.com/v1/albums/0tGPJ0bkWOUmH7MEOR77qc",
                "id": "0tGPJ0bkWOUmH7MEOR77qc",
                "images": [
                    {
                        "height": 640,
                        "url": "https://i.scdn.co/image/966ade7a8c43b72faa53822b74a899c675aaafee",
                        "width": 640
                    },
                    {
                        "height": 300,
                        "url": "https://i.ytimg.com/vi/_Zila5rLu74/hqdefault.jpg",
                        "width": 300
                    },
                    {
                        "height": 64,
                        "url": "https://i.scdn.co/image/5a73a056d0af707b4119a883d87285feda543fbb",
                        "width": 64
                    }
                ],
                "name": "Cut To The Feeling",
                "release_date": "2003",
                "release_date_precision": "year",
                "type": "album",
                "uri": "spotify:album:0tGPJ0bkWOUmH7MEOR77qc"
            },
            "artists": [
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/6sFIWsNpZYqfjUpaCgueju"
                    },
                    "href": "https://api.spotify.com/v1/artists/6sFIWsNpZYqfjUpaCgueju",
                    "id": "6sFIWsNpZYqfjUpaCgueju",
                    "name": "Don Omar",
                    "type": "artist",
                    "uri": "spotify:artist:6sFIWsNpZYqfjUpaCgueju"
                }
            ],
            "available_markets": [
                "AD",
                "AR",
                "AT",
                "AU",
                "BE",
                "BG",
                "BO",
                "BR",
                "CA",
                "CH",
                "CL",
                "CO",
                "CR",
                "CY",
                "CZ",
                "DE",
                "DK",
                "DO",
                "EC",
                "EE",
                "ES",
                "FI",
                "FR",
                "GB",
                "GR",
                "GT",
                "HK",
                "HN",
                "HU",
                "ID",
                "IE",
                "IL",
                "IS",
                "IT",
                "JP",
                "LI",
                "LT",
                "LU",
                "LV",
                "MC",
                "MT",
                "MX",
                "MY",
                "NI",
                "NL",
                "NO",
                "NZ",
                "PA",
                "PE",
                "PH",
                "PL",
                "PT",
                "PY",
                "RO",
                "SE",
                "SG",
                "SK",
                "SV",
                "TH",
                "TR",
                "TW",
                "US",
                "UY",
                "VN",
                "ZA"
            ],
            "disc_number": 1,
            "duration_ms": 207959,
            "explicit": false,
            "external_ids": {
                "isrc": "USUM71703861"
            },
            "external_urls": {
                "spotify": "https://open.spotify.com/track/11dFghVXANMlKmJXsNCbNl"
            },
            "href": "https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl",
            "id": "11dFghVXANMlKmJXsNCbNl",
            "is_local": false,
            "name": "Pobre Diabla",
            "popularity": 63,
            "preview_url": "https://p.scdn.co/mp3-preview/3eb16018c2a700240e9dfb8817b6f2d041f15eb1?cid=774b29d4f13844c495f206cafdad9c86",
            "track_number": 1,
            "type": "track",
            "uri": "spotify:track:11dFghVXANMlKmJXsNCbNl"
        }
    ])

    const [songs, set_songs] = useState<Song[] | undefined>()

    const [films, set_films] = useState<Film[] | undefined>()

    // Updates the type_selected state setting all false except films_selected
    const select_films = () =>{
        set_type_selected({films_selected: true, series_selected: false, songs_selected: false})
    }

    // Updates the type_selected state setting all false except series_selected
    const select_series = () => {
        set_type_selected({films_selected: false, series_selected: true, songs_selected: false})
    }

    // Updates the type_selected state setting all false except songs_selected
    const select_songs = () => {
        set_type_selected({films_selected: false, series_selected: false, songs_selected: true})
    }

    // Fetch of the songs query
    const fetchSongs = async () => {
        const res = await fetch('')
        const data = await res.json()

        console.log(data)
        return data
    }

    const fetchFilms = async () => {
        const res = await fetch('')
        const data = await res.json()

        console.log(data)
        return data
    }

    // Catches the enter event of the search bar
    const find = (e: any) => {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {
            type_selected.songs_selected && find_songs()
            type_selected.films_selected && find_films()
            e.preventDefault();
            return false;
        }
    }

    // Search for songs
    const find_songs = () => {
        build_songs()
    }

    // Search for films
    const find_films = () => {
        build_films()
    }

    const build_films = () => {
        let movie_list: Array<any> = movies
        let res: Array<any> = []
        if(typeof movie_list === "object" && movie_list !== null && movie_list !== undefined){
            movie_list.forEach((element) => {
                const { name, authors, date, img, preview_url, genre} = element
                res.push({
                    name: name,
                    authors: authors,
                    date: date,
                    img: img,
                    preview_url: preview_url,
                    genre: genre
                })
            })
        }
        set_films(res)
    }

    // Transforms the array of tracks into a array of songs saved on songs
    const build_songs = () => {
        let track_list: Array<any> = tracks
        let res: Array<any> = []

        if(typeof track_list === "object" && track_list !== null && track_list !== undefined){
            track_list.forEach((element) => {

                const { album, artists, name, preview_url } = element
                const { release_date, images } = album
                var authors_string: string = ""

                artists.forEach((artist: { name: string; }, index: number) => {
                    index == 0 ? authors_string = artist.name
                    : authors_string += ", " + artist.name
                })
                
                let img = images.find((element: { height: number; }) => element.height === 300)
                
                res.push({
                    name: name,
                    authors: authors_string,
                    date: release_date,
                    img: img.url,
                    preview_url: preview_url,
                    album: album
                })
                
            })

            set_songs(res)
        }
    }        
    

    return {songs, films, find, select_films, select_series, select_songs, type_selected}
}
export default FinderLogic