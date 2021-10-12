import './Search_bar.css'

interface Props{
    find: (e: any) => void;
}

const Search_bar: React.FC<Props> = ({find}) => {
    return (
        <div>
            <input className="Search_bar" type="search" placeholder="Search..." onKeyPress={find}/>
        </div>
    )
}

export default Search_bar