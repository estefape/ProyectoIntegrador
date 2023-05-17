import React, { useState } from "react";
import useForm from "../../hooks/useForm";
import './ProductForm.css'

const ProductForm = () => {

  const [{ name, category, city, address, description, image }, handleInputChanges, handleFileChanges, reset] = useForm({
    name: '',
    categpry: '',
    city: '',
    address: '',
    description: '',
    image: ''


  })
  const [product, setProduct] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  console.log(city)
  return (
    <div className="wrapper">
      <form className="product-form">
        <div className="form-tittle">
          <h3 className="form-header">Registrar Nueva Oficina</h3>
        </div>
        <div className="form-inputs">
          <label>
            <span>Nombre</span>
            <input name="name" type="text" value={name} onChange={handleInputChanges} />
          </label>
          <label>
            <span>Categoria</span>
            <select name="category" value={category} onChange={handleInputChanges}>
              <option id="0" >Coworking Sectorial</option>
              <option id="1" >Coworking Compartido</option>
              <option id="2" >Coworking Fijo</option>
              <option id="3" >Coworking Nómada</option>
            </select>
          </label>
          <label>
            <span>Ciudad</span>
            <input name="city" type="text" value={city} onChange={handleInputChanges} />
          </label>
          <label>
            <span>Dirección</span>
            <input name="address" type="text" value={address} onChange={handleInputChanges} />
          </label>
          <label>
            <span>Descripción</span>
            <textarea name="description" value={description} onChange={handleInputChanges} />
          </label>
          <input name="image" type="file" accept="image/*" onChange={handleFileChanges} />
          <img src={image} />
          <button className="btn">REGISTRAR</button>
        </div>

      </form>

    </div>
  )
}

export default ProductForm;