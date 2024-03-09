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
import { LocationTestMarker } from '../Components/LocationTestMarker'
import { IconLocation } from "../Components/IconLocation";
import { IconLocation2 } from "../Components/IconLocation2";
import { faBus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { List } from '../Components/List';
import { useDataContext } from '../Context/dataContext';

function MapView() {
  const { url, setLines, lines } = useDataContext();
  const position = [10.693, -71.634]
  const [paradas, setParadas] = useState([]);
  const [line, setLine] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/Stops`);
      setParadas(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [url]);

  const fetchLineData = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/line`);
      setLine(response.data);

    } catch (error) {
      console.log(error);
    }
  }, [url]);

  const fetchDataList = useCallback(
    async () => {
      try {
        let data = JSON.parse(localStorage.getItem('lines'));
        if (!data) {
          setLines(List);
        }
      } catch (error) {
        console.log(error);
      }
    }, []);

  useEffect(() => {
    fetchData();
    fetchLineData();
    fetchDataList();
  }, [fetchData, fetchLineData, fetchDataList]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRefreshKey(prevKey => prevKey + 1);
    }, 15000); // 5000 ms = 5 s

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='MapView'>
      <MapContainer center={position} zoom={14} >
        {paradas.map((parada) => (
          lines.filter(line => line.hidden === false).map((line) => (
            parada.Line.lin_name === line.nombre &&
            <Marker position={[parada.par_lat, parada.par_long]} icon={IconLocation}>
              <Popup>
                {parada.par_name}
              </Popup>
            </Marker>
          ))
        ))}
        {line.map((linea) => (
          lines.filter(line => line.hidden === false).map((line) => (
            linea.lin_name === line.nombre &&
            <Marker position={[linea.lin_start, linea.lin_close]} icon={IconLocation2}>
              <Popup>
                {linea.lin_name}
                <FontAwesomeIcon icon={faBus} />
              </Popup>
            </Marker>
          ))
        ))}
        {line.map((linea) => (
          lines.filter(line => line.hidden === false).map((line) => (
            linea.lin_name === line.nombre &&
            <Marker position={[linea.lin_exit_point, linea.lin_arrival_point]} icon={IconLocation2}>
              <Popup>
                {linea.lin_name}
                <FontAwesomeIcon icon={faBus} />
              </Popup>
            </Marker>
          ))
        ))}

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker />
        <LocationTestMarker key={refreshKey} />
        {lines.filter(line => line.hidden === false).map((line) => (
          <Polyline key={refreshKey} pathOptions={{ color: line.color }} positions={line.coords} />
        ))}
      </MapContainer>
    </div>
  )
}

export { MapView }