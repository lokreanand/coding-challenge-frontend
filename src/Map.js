import React, { useRef, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoibG9rcmVhbmFuZCIsImEiOiJjbDNlam5sc2gwMDQ0M2Jtb2VucTEzMTd5In0.P4pn72HfFthXalnHj1Z5Lg';

const MapComponent = (props) => {
    
      const navigate=useLocation()
      const [lng,setLng]=useState(navigate.state.lng)
      const [lat,setLat]=useState(navigate.state.lat)
      
      // console.log(props.lat+" "+props.lng)
      const mapContainer = useRef(null);
      const map = useRef(null);
      const [zoom, setZoom] = useState(9);

      useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng,lat],
        zoom: zoom
        });
        
        });

        useEffect(() => {
          if (!map.current) return; // wait for map to initialize
          map.current.on('move', () => {
          setLng(map.current.getCenter().lng.toFixed(4));
          setLat(map.current.getCenter().lat.toFixed(4));
          setZoom(map.current.getZoom().toFixed(2));
          });
          
          });

  return (
    <div>
    <div className="sidebar">
      Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
</div>
      <div ref={mapContainer} className="map-container" />
    </div>
  )
}

export default MapComponent;