import "./cardProduct.css";
import * as productService from "../../services/productServices";
import { Icons } from "../icons/Icons";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

export const CardProduct = ({
  image,
  name,
  category,
  city,
  address,
  description,
  officeId,
  role = "user",
  id,
  onDelete,
}) => {
  const imageStyle = {
    backgroundImage: `url(${image})`,
  };

  const confirmation = () => {
    Swal.fire({
      title: "¿Esta seguro que desea eliminar la oficina?",
      showDenyButton: true,
      confirmButtonText: "Si",
      denyButtonText: "Cancelar",
      confirmButtonColor: "#F2921D",
      denyButtonColor: "#A61F69",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete();
      }
    });
  };

  const handleDelete = () => {
    productService.productDelete(id).then(async (result) => {
      const response = await result.text();
      onDelete();
      if (response == "removed product") {
        Swal.fire({
          title: "Eliminada exitosamente",
          text: "La oficina ha sido eliminada correctamente.",
          icon: "success",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#A61F69",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "No fue posible eliminar la oficina.",
          icon: "error",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#F2921D",
        });
      }
    });
  };

  const handleEdit = () => {
    return <NavLink to="/admin/editproduct"></NavLink>;
  };

  return (
    <>
      <div className="card-product">
        <div className="card-product-img" style={imageStyle}></div>
        <div className="card-product-container">
          {role == "admin" && (
            <>
              <div className="trash-container" onClick={confirmation}>
                <Icons name="trash" />
              </div>
              <NavLink
                to={`/admin/editproduct/${id}`}
                className="edit-container"
              >
                <Icons name="edit" />
              </NavLink>
            </>
          )}
          <div className="card-product-top">
            <h3>{name}</h3>
            <h4>{category}</h4>
            <div>
              <p>
                {" "}
                <Icons name="star" /> Muy Bueno
              </p>
            </div>
          </div>
          <div className="card-product-body">
            <div>
              <p>
                {" "}
                <Icons name="pin" /> {address} {city}
              </p>
              <p>MOSTRAR EN EL MAPA</p>
            </div>
          </div>
          <div className="card-product-footer">
            <p>{description.substring(0, 70)}...</p>
            <Link className="btn" to={`/detail/${officeId}`}>
              Ver Mas
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
