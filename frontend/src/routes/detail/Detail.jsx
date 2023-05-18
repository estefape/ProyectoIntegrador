import { useEffect, useState } from "react";
import { Icons } from "../../components/icons/Icons";
import { Link, useParams } from 'react-router-dom';
import "./detail.css";
import oficinas from "../../data.json"

export const Detail = () => {

    const [singleOffice, setSingleOffice] = useState({})
    const { officeId } = useParams()

    const getSingleOffice = () => {
        const data = oficinas.filter(item => item.officeId === parseInt(officeId))[0] ?? {}
        setSingleOffice(data)
    }

    useEffect(() => {
        getSingleOffice()
    }, [])


    return (
        <>
            <div className="title">
                <h1>{singleOffice.name}</h1>
                <Link className="arrowBack" to="/">
                    <Icons name="arrow" />
                </Link>
            </div>
            <div>
                <div className="imageContainer">
                    <img src={singleOffice.image} />
                </div>

                <h2 className="descriptionTitulo">Descripción</h2>
                <h3 className="category"> Categoria: {singleOffice.category}</h3>
                <div className="star">
                    <p> <Icons name="star" /> Muy Bueno</p>
                </div>
              
                <div className="description"><p>{singleOffice.description}</p></div>
                <div className="address">
                    <p> <Icons name="pin" /> {singleOffice.address} {singleOffice.city}</p>
                </div>
            </div>
        </>
    )
}