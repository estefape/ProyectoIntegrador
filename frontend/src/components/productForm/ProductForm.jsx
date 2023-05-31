import React, { useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import * as productService from "../../services/productServices";
import * as categoryService from "../../services/categoryServices";
import Swal from "sweetalert2";
import "./ProductForm.css";

const ProductForm = () => {
  const [
    { name, category, city, address, description, image },
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
  });
  const [errors, setErrors] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    categoryService
      .categoryAll()
      .then((response) => {
        return response.json();
      })
      .then((categories) => {
        setCategories(categories);
      });
  }, []);

  const handleRegister = (event) => {
    event.preventDefault();
    if (validation()) {
      productService
        .productRegister({
          name,
          city,
          address,
          description,
          image: "/images/photo1.jpg",
          category: {
            idCategory: category,
          },
        })
        .then(async (result) => {
          const response = await result.text();

          if (response == "Ya existe un Coworking con este nombre") {
            Swal.fire({
              title: "Aviso",
              text: "Ya existe una oficina con este nombre.",
              icon: "warning",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "#A61F69",
            });
          } else {
            if (response == "Coworking Agregado Correctamente") {
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
    if (name && city && address && description && image) {
      return true;
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
            <input
              name="city"
              type="text"
              value={city || ""}
              onChange={handleInputChanges}
            />
          </label>
          <label>
            <span>Dirección</span>
            <input
              name="address"
              type="text"
              value={address || ""}
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
