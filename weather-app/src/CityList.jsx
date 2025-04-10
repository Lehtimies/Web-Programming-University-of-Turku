import City from './City'

const CityList = (cities, deleteCity) => {

    return (
        <ul>
            {cities.map(city => (
            <div key={city.id}>
                {city.name}
                <button onClick={() => deleteCity(city.id)}>Delete</button>
            </div>
            ))}
        </ul>
    )
}

export default CityList;