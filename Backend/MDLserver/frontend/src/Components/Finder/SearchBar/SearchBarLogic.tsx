import React, { useState } from 'react'

const SearchBarLogic = () => {

    const [content, set_content] = useState<string>("")

    const on_change = (e: any) => {
        set_content(e.target.value)
    } 

    return {content, on_change}
}
export default SearchBarLogic