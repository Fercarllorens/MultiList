function select_films(){
    let btn_films = document.getElementById("films")
    let btn_series = document.getElementById("series")
    let btn_songs = document.getElementById("songs")

    if(btn_films !== null && btn_series !== null && btn_songs !== null){
        
        btn_films.className += " selected-button"
        btn_series.className = "content-type"
        btn_songs.className = "content-type"
    }
}

function select_series(){
    let btn_films = document.getElementById("films")
    let btn_series = document.getElementById("series")
    let btn_songs = document.getElementById("songs")

    if(btn_films !== null && btn_series !== null && btn_songs !== null){
        
        btn_films.className = "content-type"
        btn_series.className += " selected-button"
        btn_songs.className = "content-type"
    }
}

function select_songs(){
    let btn_films = document.getElementById("films")
    let btn_series = document.getElementById("series")
    let btn_songs = document.getElementById("songs")

    if(btn_films !== null && btn_series !== null && btn_songs !== null){
        
        btn_films.className = "content-type"
        btn_series.className = "content-type"
        btn_songs.className += " selected-button"
    }
}

export {select_films, select_series, select_songs}