import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";


const Map = ({lat, lng, address}) => {


    const location = { lat, lng }

        
    return(
      <MapContainer center={location} zoom={13} scrollWheelZoom={false} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={location}>
          <Popup>
            {address}
          </Popup>
        </Marker>
      </MapContainer>
    )
}

export default Map;
