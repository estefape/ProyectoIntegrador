import React, { useEffect, useState, useMemo } from "react";
import "./products.css";
import Pagination from "../pagination/pagination";
import { CardProduct } from "../cardProduct/cardProduct";
import * as productService from "../../services/productServices";

let PageSize = 5;
const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    productService
      .productAll()
      .then((response) => {
        return response.json();
      })
      .then((product) => {
        setProducts(product);
      });
  }, []);

  const showProducts = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return products.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, products]);

  return (
    <div className="products-container">
      {showProducts.map((prod) => {
        return (
          <CardProduct
            key={prod.idCoworking}
            image={prod.image}
            name={prod.name}
            category={prod.category.name}
            city={prod.city}
            address={prod.address}
            description={prod.description}
            officeId={prod.officeId}
            role={'admin'}
            id={prod.idCoworking}
            onDelete={() => {setProducts(() => {return products.filter(prd => prd.idCoworking != prod.idCoworking)})}}
          />
        );
      })}
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={products.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default Products;
