
const Filter = ( { filterParameter }) => {

    return (
        <>
        <h1>Filter</h1>
        <form>
            <label>Filter phone numbers by: </label><input onChange={filterParameter}></input>
        </form>
        </>
    )
}

export default Filter