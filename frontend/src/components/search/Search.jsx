import "./search.css"

export const Search = () => {
  return (
    <>
        <div className="search-comp">
            <h2>Busca ofertas en oficinas...</h2>
            <div>
                <input type="text" placeholder="Nombre de la oficina..."/>
                <input type="text" placeholder="Ubicacion..."/>
                <button>Buscar</button>
            </div>
        </div>
    </>
  )
}
