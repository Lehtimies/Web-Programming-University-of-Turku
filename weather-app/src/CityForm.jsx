const CityForm = ({ addCity, newName, handleNameChange }) => {
  return (
    <form onSubmit={addCity} className="flex items-center justify-center w-full">
      <div className="flex flex-row items-center justify-center gap-5 w-full">
        <div className="flex w-full">
          <input type="text" className="bg-white px-4 py-2 rounded-md w-full focus:outline-none" value={newName} onChange={handleNameChange} placeholder="Add new city!" />
        </div>
        <div className="flex w-fit">
          <button type="submit" className="bg-white w-fit px-4 py-2 rounded-md">Add</button>
        </div>
      </div>
    </form>
  )
}

export default CityForm;