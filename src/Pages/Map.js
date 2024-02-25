import React, { useState, useEffect, useCallback } from 'react'
import {
  MapContainer,
  TileLayer,
  Polyline,
  Popup,
  Marker,
} from "react-leaflet";
import axios from 'axios';
import 'leaflet/dist/leaflet.css'
import { LocationMarker } from '../Components/LocationMarker'
// import { LocationTestMarker } from '../Components/LocationTestMarker'
import { IconLocation } from "../Components/IconLocation";
import { IconLocation2 } from "../Components/IconLocation2";
import { faBus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { List } from '../Components/List';
import { useDataContext } from '../Context/dataContext';

function MapView() {
  const { url } = useDataContext();
  const position = [10.693, -71.634]
  const [paradas, setParadas] = useState([]);
  const [line, setLine] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/Stops`);
      setParadas(response.data);
    } catch (error) {
      console.log(error);
    }
  },[url]);

  const fetchLineData = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/line`);
      setLine(response.data);

    } catch (error) {
      console.log(error);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
    fetchLineData();
  }, [fetchData, fetchLineData]);

  const limeOptions = { color: 'lime' }
  const blueOptions = { color: 'blue' }
  const redOptions = { color: 'red' }
  const cyanOptions = { color: "cyan" };
  const greenOptions = { color: "green" };
  const yellowOptions = { color: "yellow" };

  return (
    <div className='MapView'>
      <MapContainer center={position} zoom={14} >
        {paradas.map((parada) => (
          <Marker position={[parada.par_lat, parada.par_long]} icon={IconLocation}>
            <Popup>
              {parada.par_name}
            </Popup>
          </Marker>
        ))}
        {line.map((linea) => (
          <Marker position={[linea.lin_start, linea.lin_close]} icon={IconLocation2}>
            <Popup>
              {linea.lin_name}
              <FontAwesomeIcon icon={faBus} />
            </Popup>
          </Marker>
        ))}
        {line.map((linea) => (
          <Marker position={[linea.lin_exit_point, linea.lin_arrival_point]} icon={IconLocation2}>
            <Popup>
              {linea.lin_name}
              <FontAwesomeIcon icon={faBus} />
            </Popup>
          </Marker>
        ))}

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker />
        {/* <LocationTestMarker/> */}
        <Polyline pathOptions={limeOptions} positions={List.Guajira} />
        <Polyline pathOptions={blueOptions} positions={List.Veritas} />
        <Polyline pathOptions={redOptions} positions={List.Milagro} />
        <Polyline pathOptions={cyanOptions} positions={List.galeria} />
        <Polyline pathOptions={greenOptions} positions={List.julio5} />
        <Polyline pathOptions={yellowOptions} positions={List.sinNombre} />
      </MapContainer>
    </div>
  )
}

export { MapView }