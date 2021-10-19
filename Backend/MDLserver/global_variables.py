class SPOTIFY():
    class URL():
        AUTH = "https://accounts.spotify.com/authorize"
        TOKENS = "https://accounts.spotify.com/api/token"
        SEARCH = "https://api.spotify.com/v1/search?q={query}&type={type}"
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
    class RESPONSE():
        URL = "url"
    class MODEL():
        ACCESS_TOKEN = "access_token"
        TOKEN_TYPE = "token_type"
        REFRESH_TOKEN = "refresh_token"
        EXPIRES_IN = "expires_in"

class COMMON():
    CONTENT = "content"
    ERROR = "error"
    ITEM = "item"
    ITEMS = "items"
    USER = "user"
    PASSWORD = "password"
    QUERY = "query"
    TYPE = "type"
    ID = "id"

class FILM():
    EXTERNAL_ID = "id"

class SERIES():
    EXTERNAL_ID = "id"