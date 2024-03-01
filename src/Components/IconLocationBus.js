import L from 'leaflet';
import icon from '../Assets/Images/busHere.svg';

export const IconLocationBus = L.icon({
    iconUrl: icon,
    iconRetinaUrl: icon,
    iconAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [46, 46],
    className: 'leaflet-venue-icon'
})
