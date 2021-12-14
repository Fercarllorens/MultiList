import React, { useState } from 'react'
import { fetchHandler, fetchHandlerCb } from '../../fetchHandler'

export interface Props {
    id: number;
    name: string;
    external_id: string;
    total_rating: null | number;
    comments: null | any[];
    type: "film" | "series" | "song";
}
const ContentPreviewLogic = (props: Props) => {
    const [item, setItem] = useState<null | any>(null)

    function getItem() {
        switch (props.type) {
            case "song":
                fetchHandlerCb(`spotify/get-track?id=${props.external_id}&user=${localStorage.getItem('user_id')}`, 'GET', null, processSong); break;
            case "series":
                fetchHandlerCb(`video/get-show-by-id?id=${props.external_id}`, 'GET', null, processSeries); break;
            case "film":
                fetchHandlerCb(`video/get-film-by-id?id=${props.external_id}`, 'GET', null, processFilm); break;
        }
    }

    function processFilm(json: any) {
        const film: any = json;
        const { id, poster_path} = film != null ? film : '';

        let img = "https://image.tmdb.org/t/p/w500/" + poster_path;

        setItem({id, img})
    }

    function processSeries(json: any) {
        const show: any = json;
        const { id, poster_path } = show != null ? show : '';

        let img = "https://image.tmdb.org/t/p/w500/" + poster_path;

        setItem({id, img})
    }

    function processSong(json: any) {
        const track: any = json;
        const { id, album, name, artists } = track != null ? track : '';
        const { images } = album != null ? album : '';

        const image = images.find((element: { height: number; }) => element.height === 300)
        let img = image.url;

        let authors: string = ""

                artists.forEach((artist: { name: string; }, index: number) => {
                    index == 0 ? authors = artist.name
                    : authors += ", " + artist.name
                })

        setItem({id, img, name, authors})
    }

    return { item, getItem }
}
export default ContentPreviewLogic