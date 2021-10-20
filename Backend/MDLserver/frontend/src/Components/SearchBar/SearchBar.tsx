import './SearchBar.css'

interface Props{
    find: (e: any) => void;
}

const SearchBar: React.FC<Props> = ({find}) => {
    return (
        <div>
            <input className="SearchBar" type="search" placeholder="Search..." onKeyPress={find}/>
        </div>
    )
}

export default SearchBar