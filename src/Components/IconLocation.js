import L from 'leaflet';
import icon from '../Assets/Images/icon.svg';

export const IconLocation = L.icon({
    iconUrl: icon,
    iconRetinaUrl: icon,
    iconAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [46, 46],
    className: 'leaflet-venue-icon'
})
