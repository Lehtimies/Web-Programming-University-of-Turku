
const City = ({singleCity}) => {
    console.log(singleCity)
    return (
        <li>
            <div>
                <button onClick={() => openNewPage}>{singleCity.name}</button>
            </div>
            
        </li>

    )
}

export default City;