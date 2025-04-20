const PersonForm = ( {addNewPersonFunction, eventListener} ) => {

    return (
        <form onSubmit={addNewPersonFunction}>
        <div>
          <label>Name:</label> <input name="name" onChange={eventListener[0]}></input>
          <label>Number:</label> <input name="number" onChange={eventListener[1]}></input>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}
export default PersonForm