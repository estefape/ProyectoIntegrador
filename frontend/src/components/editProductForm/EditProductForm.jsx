import React, { useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import * as productService from "../../services/productServices";
import * as categoryService from "../../services/categoryServices";
import * as cityService from "../../services/cityServices";
import AddressAutocomplete from "../addressAutocomplete/addressAutocomplete";
import Swal from "sweetalert2";
import "./EditProductForm.css";
import { useParams, redirect, useNavigate } from "react-router-dom";

const EditProductForm = () => {
  const navigate = useNavigate();
  const [
    {
      name,
      category,
      city,
      address,
      description,
      image,
      latitude,
      longitude,
      cancellationPolicy,
      coworkingRulesPolicy,
      healthSafetyPolicy,
    },
    handleInputChanges,
    handleFileChanges,
    reset,
    initValues,
  ] = useForm({
    name: "",
    category: "",
    city: "",
    address: "",
    description: "",
    image: "",
    cancellationPolicy: "",
    coworkingRulesPolicy: "",
    healthSafetyPolicy: "",
    latitude: "",
    longitude: "",
  });
  const [errors, setErrors] = useState("");
  const [categories, setCategories] = useState([]);
  const { productId } = useParams();
  const [cities, setCities] = useState([]);
  const [coord, setCoord] = useState({ lat: latitude, lng: longitude});
  const facilities = [
    { name: "Wifi", icon: '<i class="fa-solid fa-phone"></i>' },
    { name: "Smart TV", icon: '<i class="fa-solid fa-phone"></i>' },
    { name: "Impresora", icon: '<i class="fa-solid fa-phone"></i>' },
    { name: "Café", icon: '<i class="fa-solid fa-phone"></i>' },
    { name: "Estacionamiento", icon: '<i class="fa-solid fa-phone"></i>' },
  ];

  useEffect(() => {
    categoryService
      .categoryAll()
      .then((response) => {
        return response.json();
      })
      .then((categories) => {
        setCategories(categories);
      });

    productService
      .productFindById(productId)
      .then((result) => {
        return result.json();
      })
      .then((product) => {
        console.log(product);
        initValues({
          ...product,
          category: product.category.idCategory,
          city: product.city.idCity
        });
        setCoord({lat:product.latitude, lng:product.longitude})
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

  const handleUpdate = (event) => {
    event.preventDefault();


    if (validation()) {
      productService
        .productUpdate({
          idCoworking: productId,
          name,
          city,
          address,
          description,
          rating: 3,
          image: image,
          category: {
            idCategory: category,
          },
        })
        .then(async (result) => {
          if (result.status >= 200 && result.status < 300) {
            Swal.fire({
              title: "Actualización exitosa",
              text: "La oficina ha sido actualizada correctamente.",
              icon: "success",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "#A61F69",
            }).then((result) => {
              navigate("/admin/products");
            });
          } else {
            Swal.fire({
              title: "Error",
              text: "No fue posible actualizar la oficina.",
              icon: "error",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "#F2921D",
            });
          }
        });
      setErrors("");
      reset();
    }
  };

  const validation = () => {
    if (name && city && address && description && image) {
      return true;
    } else {
      setErrors("Todos los campos son obligatorios");
      return false;
    }
  };

  const changeLatLng = (x, y) => {
    setCoord({ lat: x, lng: y });
  };

  return (
    <div className="wrapper">
      <form className="product-form">
        <div className="form-tittle">
          <h3 className="form-header">Registrar Nueva Oficina</h3>
        </div>
        <div className="form-inputs-products">
          <div className="panels">
            <div className="left-panel">
              <h4>Datos Generales</h4>
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
                <span>Categoría</span>
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
                <select name="city" value={city} onChange={handleInputChanges}>
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
                <AddressAutocomplete
                  address={address}
                  handleInputChange={handleInputChanges}
                  changeLatLng={changeLatLng}
                />
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
                  value={description}
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
            </div>
            <div className="right-panel">
              <h4>Políticas</h4>

              <label>
                <span>Políticas de Cancelación</span>
                <textarea
                  name="cancelation"
                  value={cancellationPolicy}
                  onChange={handleInputChanges}
                />
              </label>
              <label>
                <span>Normas del Coworking</span>
                <textarea
                  name="rules"
                  value={coworkingRulesPolicy}
                  onChange={handleInputChanges}
                />
              </label>
              <label>
                <span>Salud y Seguridad</span>
                <textarea
                  name="healthpolicy"
                  value={healthSafetyPolicy}
                  onChange={handleInputChanges}
                />
              </label>
              <h4 className="facilities-tittle">Comodidades</h4>
              <div className="facilities">
                {facilities.map((facility) => {
                  return (
                    <>
                      <span
                        className="facility-text"
                        checked="checked"
                        key={facility.name}
                      >
                        <input
                          key={facility.name}
                          type="checkbox"
                          id="cbox1"
                          value={facility.name}
                        />
                        {facility.name}
                      </span>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
          <span style={{ color: "red" }}>{errors}</span>
          <button className="btn" onClick={handleUpdate}>
            GUARDAR
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;
