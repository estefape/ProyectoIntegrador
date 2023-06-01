import "./search.css"

export const Search = () => {
  return (
    <div className="search">
      <h2>Busca ofertas en oficinas...</h2>
      <div>
        <input className="input" type="text" placeholder="Nombre de la oficina..."/>
        <input className="input" type="text" placeholder="Ubicacion..."/>
        <button className="btn">Buscar</button>
      </div>
    </div>
  )
}
