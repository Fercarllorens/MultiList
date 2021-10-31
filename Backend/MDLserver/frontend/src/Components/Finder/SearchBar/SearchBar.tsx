import './SearchBar.css'
import SearchBarLogic from './SearchBarLogic'

interface Props{
    find: (e: any, content: string) => void;
}

const SearchBar: React.FC<Props> = ({find}) => {
    const {content, on_change} = SearchBarLogic()

    return (
        <div>
            <input className="SearchBar" type="search" placeholder="Search..." onKeyPress={(e) => find(e, content)} onChange={(e) => on_change(e)}/>
        </div>
    )
}

export default SearchBar