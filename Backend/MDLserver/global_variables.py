class SPOTIFY():
    class URL():
        BASE = "https://api.spotify.com/v1/"
        AUTH = "https://accounts.spotify.com/authorize"
        TOKENS = "https://accounts.spotify.com/api/token"
    class ENDPOINTS():
        ITEMS = {
            "track": "tracks/{id}",
            "artist": "artists/{id}",
            "album": "albums/{id}",
            "episode": "episodes/{id}",
            "show": "shows/{id}",
        }
        SEARCH = "search?q={query}&type={type}"

    class SCOPES():
        CONNECT = "user-read-playback-state user-modify-playback-state user-read-currently-playing"
        PLAYLIST = "playlist-modify-private playlist-read-private playlist-modify-public playlist-read-collaborative"
    class REQUEST():
        SCOPE = "scope"
        RESPONSE_TYPE = "response_type"
        REDIRECT_URI = "redirect_uri"
        CLIENT_ID = "client_id"
        CLIENT_SECRET = "client_secret"
        GRANT_TYPE = "grant_type"
        HEADER = "{'Content-Type': 'application/json', 'Authorization': Bearer {token}}"
        class TYPES():
            CODE = "code"
            AUTH_CODE = "authorization_code"
    class RESPONSE():
        URL = "url"
        STATUS = "status"
    class MODEL():
        ACCESS_TOKEN = "access_token"
        TOKEN_TYPE = "token_type"
        REFRESH_TOKEN = "refresh_token"
        EXPIRES_IN = "expires_in"
        

    class ERRORS():
        REQUEST = "Something went wrong with your request"

class USER():
    USERNAME = "username"
    PASSWORD = "password"
    EMAIL = "email"
    SPOTIFY_TOKEN = "spotify_token"
    LISTS = "lists"

class VIDEO():
    class URL():
        BASE = "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/"
    class ENDPOINTS():
        BYID = "idlookup"
        QUERY = "lookup"
    class REQUEST():
        SRC_ID = "source_id"
        SRC = "source"
    class ERRORS():
        REQUEST = "Something went wrong with your request"

class COMMON():
    CONTENT = "content"
    ERROR = "error"
    ITEM = "item"
    ITEMS = "items"
    USER = "user"
    PASSWORD = "password"
    EMAIL = "email"
    SPOTIFY_TOKEN = "spotify_token"
    LISTS = "lists"

    class FILM():
        EXTERNAL_ID = "id"

    class SERIES():
        EXTERNAL_ID = "id"

    class SONG():
        EXTERNAL_ID = "id"