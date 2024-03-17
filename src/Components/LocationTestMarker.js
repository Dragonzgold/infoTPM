import React, { useState, useEffect, useCallback } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { IconLocationBus } from "../Components/IconLocationBus";
import { useDataContext } from "../Context/dataContext";
import { Button } from "reactstrap";
import axios from "axios";

function LocationTestMarker() {
  const { url, accessToken } = useDataContext();
  const [position, setPosition] = useState(null);
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

  function findBusIdByUserId(userData, user_id) {
    return userData.find((data) => data.user.usu_id === user_id)?.bus_id;
  }

  const map = useMapEvents({
    locationfound(e) {
      if (e && e.latlng) {
        const latlng = e.latlng;
        setPosition(latlng);
        const busId = findBusIdByUserId(busData, user.usu_id);
        if (busId) {
          axios.put(`${url}/Bus/${busId}`, {
            bus_lat: latlng.lat,
            bus_lon: latlng.lng,
          });
        }
        console.log("hola");
      } else {
        setPosition(null);
        console.log("error");
      }
    },
  });

  useEffect(() => {
    fetchBusData();
    fetchDataUser();
    map.locate();
  }, [fetchBusData, fetchDataUser, map]);

  const alerta = ()=>{
    console.log("Esto es un mensaje de alerta");
  }

  return position === null
    ? null
    : busData
        .filter((bus) => bus.bus_status === "active")
        .map((bus) => (
          <Marker
            key={bus.bus_id}
            position={{ lat: bus.bus_lat, lng: bus.bus_lon }}
            icon={IconLocationBus}
          >
            <Popup>
              <div style={{ textAlign: "center" }}>
                Linea: {bus.Line.lin_name}
                <br />
                Placa: {bus.bus_plate}
                <br />
                <Button color="danger" onClick={()=> alerta()}>SOS</Button>
              </div>
            </Popup>
          </Marker>
        ));
}

export { LocationTestMarker };
