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
            const response = await axios.get(`${url}/Bus`);
            setBusData(response.data);
        } catch (error) {
            console.log(error);
        }
    }, [url]);

    useEffect(() => {
        fetchBusData();
        fetchDataUser();
    }, [fetchBusData, fetchDataUser]);

    const map = useMapEvents({
        click() {
            map.locate()
        },
        locationfound(e) {
            if (busData && busData.bus_status === 'active' && user && user.usu_id === busData.bus_usuId) {
                setPosition(e.latlng);
                console.log(e.latlng);

                axios.put(`${url}/Bus/${busData.bus_id}`, {
                    bus_lat: e.latlng.lat,
                    bus_lon: e.latlng.lng,
                });
            } else {
                setPosition(null);
                console.log('no')
            }
        },
    });





    // useEffect(() => {
    //     if (busData && busData.bus_status === 'active') {
    //         const timer = setInterval(() => {
    //             map.locate();
    //             console.log('hola')
    //         }, 15000);

    //         return () => clearInterval(timer);
    //     }
    // }, [busData, map]);


    return position === null ? null : (
        <Marker position={(busData.bus_lat, busData.bus_lon)} icon={IconLocation3}>
            <Popup>Bus here</Popup>
        </Marker>
    )
}

export { LocationTestMarker }