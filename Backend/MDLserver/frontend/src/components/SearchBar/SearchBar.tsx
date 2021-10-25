import './SearchBar.css'
import SearchBarLogic from './SearchBarLogic'

interface Props{
    find: (e: any) => void;
}

const SearchBar: React.FC<Props> = ({find}) => {
    const {} = SearchBarLogic()

    return (
        <div>
            <input className="SearchBar" type="search" placeholder="Search..." onKeyPress={find}/>
        </div>
    )
}

export default SearchBar