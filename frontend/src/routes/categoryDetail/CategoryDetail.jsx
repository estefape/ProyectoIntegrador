import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import "./categoryDetail.css";
import { coworking, categories } from "../../data.json"
import { CoworkingCard } from "../../components/coworkingCard/CoworkingCard";

export const CategoryDetail = () => {

    const [category, setCategory] = useState({})
    const [coworkingByCategory, setCoworkingByCategory] = useState([])
    const { categoryId } = useParams()

    const getCategoryById = (id) => {
        return categories.find(category => category.id === parseInt(id));
    }

    const getCoworkingByCategoryId = (id) => {
        return coworking.filter(coworking => coworking.category.id === parseInt(id));
    }


    useEffect(() => {
        const data = getCategoryById(categoryId);
        setCategory(data)
        const coworkingByCategory = getCoworkingByCategoryId(categoryId);
        console.log(coworkingByCategory)
        setCoworkingByCategory(coworkingByCategory)

    }, [categoryId])

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