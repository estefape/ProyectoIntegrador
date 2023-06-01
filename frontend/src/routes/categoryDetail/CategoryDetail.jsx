import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import "./categoryDetail.css";
import { CoworkingCard } from "../../components/coworkingCard/CoworkingCard";
import { constants } from "../../services/constants";

export const CategoryDetail = () => {

    const [category, setCategory] = useState({})
    const [coworkingByCategory, setCoworkingByCategory] = useState([])
    const { categoryId } = useParams()

    const getCategoryById = async (id) => {
        const requestConfig = {
            method: 'GET',
        }
        const url = constants.CATEGORIES_ENDPOINT + id;
        const response = await fetch(url, requestConfig);
        return await response.json();
    }

    const getData = async () => {
        const requestConfig = {
            method: 'GET',
           
        }

        const url = constants.PRODUCTS_ENDPOINT ;
        const response = await fetch(url, requestConfig);
        return await response.json();
    }

    useEffect(() => {
        getCategoryById(categoryId).then(data => { 
            setCategory(data)
        })
        getData().then(data => {
            const coworkingByCategory = data.filter(item => item.category.idCategory === parseInt(categoryId))
            console.log(coworkingByCategory)
            setCoworkingByCategory(coworkingByCategory)
        });
    }, [categoryId]);


    return (
        <>
            {category && coworkingByCategory ?
                (
                    <>
                        <div className="title">
                            <h1>{category.name}</h1>
                            <Link className="arrowBack" to="/">
                                <ChevronLeftIcon sx={{ fontSize: 50 }} className="icon" />
                            </Link>
                        </div>
                        <div className="container">
                            {coworkingByCategory.map((coworking, index) => (
                                <CoworkingCard {...coworking} key={index} />
                            ))}
                        </div>
                    </>
                ) : (<p>Cargando...</p>)}
        </>
    )
}