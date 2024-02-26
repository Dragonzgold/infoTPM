import React, { useState, useEffect, useCallback } from 'react'
import { Marker, Popup, useMapEvents } from 'react-leaflet'
import { IconLocation3 } from "../Components/IconLocationHere";
import { useDataContext } from '../Context/dataContext';
import axios from 'axios';

function LocationTestMarker() {
  const { url, accessToken } = useDataContext();
  const [position, setPosition] = useState(null)
  const [busData, setBusData] = useState([]);
  const [user, setUser] = useState([]);
  // const [bus, setBus] = useState([]);
  // const [bus_lat, setBusLat] = useState('');
  // const [bus_lon, setBusLon] = useState('');

  const fetchDataUser = useCallback(async () => {
    try {
      const response = await axios.get(
        `${url}/Auth/findByToken/${accessToken.access_token}`
      );
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [setUser, accessToken, url]);

  const fetchBusData = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/Bus/`);
      setBusData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [url]);

  useEffect(() => {
    fetchBusData();
    fetchDataUser();
  }, [fetchBusData, fetchDataUser]);

  // const map = useMapEvents({
  //   click() {
  //     map.locate()
  //   },
  //   locationfound(e) {
  //     if (busData && busData.bus_status === 'active' && user && user.usu_id === busData.user.usu_id) {
  //       setPosition(e.latlng);
  //       console.log(e.latlng);

  // axios.put(`${url}/Bus/${busData.bus_id}`, {
  //   bus_lat: e.latlng.lat,
  //   bus_lon: e.latlng.lng,
  //       });
  //     } else {
  //       setPosition(null);
  //       console.log('no')
  //     }
  //   },
  // });

  // const handlePosition = async (e) => {
  //   try {
  //     await axios.put(`${url}/Bus/${1}`, {
  //       bus_lat: e.lat,
  //       bus_lon: e.lng
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // function findBusIdByUserId(buses, userId) {
  //   for (let i = 0; i < buses.length; i++) {
  //     if (buses[i].user && buses[i].user.usu_id === userId) {
  //       return buses[i].bus_id;
  //     }
  //   }
  //   return null; // Devuelve null si no se encuentra ningún bus con el usu_id proporcionado
  // }

  function findBusIdByUserId(userData, user_id) {
    return userData.find(data => data.user.usu_id === user_id)?.bus_id;
  }

  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      if (e && e.latlng) {
        const latlng = e.latlng;
        setInterval(() => {
          setPosition(latlng);
          const busId = findBusIdByUserId(busData, user.usu_id);
          if (busId) {
            axios.put(`${url}/Bus/${busId}`, {
              bus_lat: latlng.lat,
              bus_lon: latlng.lng,
            });
          }
        }, 5000);
        map.flyTo(latlng, map.getZoom());
      } else {
        setPosition(null);
        console.log('error')
      }
    },
  });

  return position === null ? null : (
    busData.map((bus) => (
      <Marker key={bus.bus_id} position={{ lat: bus.bus_lat, lng: bus.bus_lon }} icon={IconLocation3}>
        <Popup>Bus here</Popup>
      </Marker>
    ))
  )
}

export { LocationTestMarker }