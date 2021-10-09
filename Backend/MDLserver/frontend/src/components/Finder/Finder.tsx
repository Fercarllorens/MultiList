import Search_bar from "../Search_bar/Search_bar"
import Filters from "../Filters/Filters"
import './Finder.css'

const Finder = () => {
    return (
        <div className="container">
            <Search_bar />
            <Filters />
        </div>
    )
}

export default Finder
