import React, { useContext, useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import AddressAutocomplete from "../addressAutocomplete/addressAutocomplete";
import * as productService from "../../services/productServices";
import * as categoryService from "../../services/categoryServices";
import * as cityService from "../../services/cityServices";
import Swal from "sweetalert2";
import "./ProductForm.css";

const ProductForm = () => {
  const [
    { name, category, city, address, description, image, lat, lng },
    handleInputChanges,
    handleFileChanges,
    reset,
  ] = useForm({
    name: "",
    category: "",
    city: "",
    address: "",
    description: "",
    image: "",
    lat: "",
    lng: ""
  });
  const [errors, setErrors] = useState("");
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [coord, setCoord] = useState({lat: '', lng: ''});
  const [mensaje, setMensaje] = useState("")

  useEffect(() => {
    categoryService
      .categoryAll()
      .then((response) => {
        return response.json();
      })
      .then((categories) => {
        setCategories(categories);
      });
      cityService
      .cityAll()
      .then((response) => {
        return response.json();
      })
      .then((cities) => {
        setCities(cities);
      });   
  }, []);


  const changeLatLng = (x, y) => {
    console.log('changelat', x)
    const lat = { target: {name: 'lat', value: x}}
    const lng = { target: {name: 'lng', value: y}}
    handleInputChanges(lat)
    handleInputChanges(lng)
    console.log(lat)
    setCoord({ lat: x, lng: y})
    console.log(coord)
  }

  const handleRegister = (event) => {
    event.preventDefault();
    console.log(address)
    if (validation()) {
      const data = new FormData();
      data.append("name", name);
      data.append("description", description);
      data.append("category", category);
      data.append("city", city);
      data.append("address", address);
      data.append("rating", 0);
      data.append("lat", coord.lat)
      data.append("lat", coord.lng)
      for (let i = 1; i <= image.length; i++) {
        data.append(`imageFile${i}`, image[i - 1]);
      }
      productService.productRegister(data).then(async (result) => {
        const response = await result.text();

        if (result.status == 404) {
          Swal.fire({
            title: "Aviso",
            text: "Ya existe una oficina con este nombre.",
            icon: "warning",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#A61F69",
          });
        } else {
          if (result.status >= 200 && result.status < 300) {
            Swal.fire({
              title: "Registro exitoso",
              text: "La oficina ha sido agregada correctamente.",
              icon: "success",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "#A61F69",
            });
          } else {
            Swal.fire({
              title: "Error",
              text: "No fue posible registrar la oficina.",
              icon: "error",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "#F2921D",
            });
          }
        }
      });
      setErrors("");
      reset();
    }
  };

  const validation = () => {
    if (name && address && description && image) {
      if (image.length == 5) {
        return true;
      }
      setErrors("Debe subir 5 imagenes");
      return false;
    } else {
      setErrors("Todos los campos son obligatorios");
      return false;
    }
  };

  return (
    <div className="wrapper">
      <form className="product-form">
        <div className="form-tittle">
          <h3 className="form-header">Registrar Nueva Oficina</h3>
        </div>
        <div className="form-inputs">
          <label>
            <span>Nombre</span>
            <input
              name="name"
              type="text"
              value={name || ""}
              onChange={handleInputChanges}
            />
          </label>
          <label>
            <span>Categoria</span>
            <select
              name="category"
              value={category}
              onChange={handleInputChanges}
            >
              <option value="">Seleccione una categoria</option>
              {categories.map((cat) => {
                return (
                  <option key={cat.idCategory} value={cat.idCategory}>
                    {cat.name}
                  </option>
                );
              })}
            </select>
          </label>
          <label>
            <span>Ciudad</span>
            <select
              name="city"
              value={city}
              onChange={handleInputChanges}
            >
              <option value="">Seleccione una ciudad</option>
              {cities.map((cit) => {
                return (
                  <option key={cit.idCity} value={cit.idCity}>
                    {cit.name}
                  </option>
                );
              })}
            </select>            
          </label>
          <label>
            <span>Dirección</span>
            <AddressAutocomplete address={address}handleInputChange={handleInputChanges} changeLatLng={changeLatLng}/>
          </label>
          <label>
            <span>Latitud</span>
            <input
              name="lat"
              type="text"
              value={coord.lat}
              onChange={handleInputChanges}
            />
          </label>
          <label>
            <span>Longitud</span>
            <input
              name="lng"
              type="text"
              value={coord.lng}
              onChange={handleInputChanges}
            />
          </label>
          <label>
            <span>Descripción</span>
            <textarea
              name="description"
              value={description || ""}
              onChange={handleInputChanges}
            />
          </label>
          <input
            name="image"
            type="file"
            accept="image/*"
            multiple="multiple"
            onChange={handleFileChanges}
          />
          <span style={{ color: "red" }}>{errors}</span>
          <button className="btn" onClick={handleRegister}>
            REGISTRAR
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
