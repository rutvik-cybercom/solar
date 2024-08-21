import Button from '@mui/material/Button';
import { GoogleMap, Marker, PolygonF, Polyline, StandaloneSearchBox, useJsApiLoader } from '@react-google-maps/api';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import { panelsPalette } from '../../component/common/Util/color';
import { createPalette, rgbToColor } from '../../component/common/Util/visualize';


const containerStyle = {
  height: '100vh', 
  width: '100%'
};


let geometryLibrary: google.maps.GeometryLibrary;
const Map = ({}) => {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyB5fF9C_VlMQmTOIrK4_bgCzwEukEHqsuE",
    libraries: ["places"],
  })

  const [markerLine, setMarkerLine] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [places, setPlaces] = useState([]); 
  const [map, setMap] = useState(null)
  const [searchBox, setSearchBox] = useState(null);
  const [panel, setPanel] = useState(''); 
  const [marker, setMarker] = useState('');
  const [yearlyEnergyDcKwh, setYearlyEnergyDcKwh] = useState(0);
  const [buildingInsightsData, setBuildingInsightsData] = useState(null);
  const [polygonPaths, setPolygonPaths] = useState(null);
  const [searchedLocationMarker, setSearchedLocationMarker] = useState(null);
  const initialCenter = { lat: 40.688386661759274, lng: -73.93344666237486 };
  const [center, setCenter] = useState(initialCenter);
  const [panelOrientation , setPanelOrientation ] = useState(0)
  const [isPanelButtonClicked, setIsPanelButtonClicked] = useState(false);
  const [inputText, setInputText] = useState(50);


  const addMarker = (e) => {
    setMarkers([...markers, { lat: e.latLng.lat(), lng: e.latLng.lng() }]);
  };

  const handleDoneButtonClick = () => {
    const paths = markers.map(marker => ({ lat: marker.lat, lng: marker.lng }));
    console.log("paths",paths);
    setPolygonPaths(paths); 
};

  const handlesadaButtonClick = () => {
    // const paths = markers.map(marker => ({ lat: marker.lat, lng: marker.lng }));
    // setPolygonPaths(paths);
    setMarker("dummy");
    setPanel("npanel");
    setIsPanelButtonClicked(true);

};


  const handleResetButton = () => {
    setMarkers([]);
    setMarkerLine([]);
    setPolygonPaths([]);
    setPanel('');
    setMarker("");
    setCenter({
      lat: "",
      lng: "",
  });
  setIsPanelButtonClicked(false);

    setMap({
      options: {
          strokeColor: 'rgba(176, 190, 197, 0.5)',
          strokeOpacity: 0.9,
          strokeWeight: 1,
          fillColor: 'rgba(176, 190, 197, 0.5)',
          fillOpacity: 0.9
      }
  });
  };
  

  
//   useEffect(() => {
//     console.log("centerrrrrr===================",center);
//     const fetchData = async () => {
//         try {
//             const apikey = 'AIzaSyB5fF9C_VlMQmTOIrK4_bgCzwEukEHqsuE';
//             const url = `https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${center.lat}&location.longitude=${center.lng}&requiredQuality=HIGH&key=${apikey}`;
//             const response = await fetch(url);
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             const data = await response.json();
//             setBuildingInsightsData(data); 
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     if (panel) {
//         fetchData(); 
//     }
// }, [panel,panelOrientation]);



useEffect(() => {
  if (window.google && window.google.maps && window.google.maps.geometry) {
    const spherical = window.google.maps.geometry.spherical;
    console.log("spherical",spherical);
    
    console.log("geometryLibrary",geometryLibrary);
    geometryLibrary = window.google.maps.geometry;
    if (isPanelButtonClicked) {
      showSolarPotential(spherical, markers);
    }
  }
}, [isPanelButtonClicked, marker, panelOrientation, inputText]);
  


  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, [center])

 

  const onMarkerDragEnd = (index, e) => {
    const newMarkers = [...markers];
    newMarkers[index] = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setMarkers(newMarkers);
  };


  const onSearchBoxLoad = (ref) => {
    setSearchBox(ref);
  };


const onPlacesChanged = async () => {
  const newPlaces = searchBox.getPlaces();
  setPlaces(newPlaces);
  if (newPlaces.length > 0 && map) {
    const place = newPlaces[0];
    const location = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    };
    setCenter(location);
    setSearchedLocationMarker(location);
   } 
};


const searchedLocationIcon = {
  url: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png', 
};

function isPointInsidePolygon(point, polygon) {
  const x = point.lng;
  const y = point.lat;
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].lng;
    const yi = polygon[i].lat;
    const xj = polygon[j].lng;
    const yj = polygon[j].lat;

    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

    if (intersect) {
      inside = !inside; 
    }
  }

  return inside;
}

function computeOffset(center, distanceMeters, angleDegrees) {
    const R = 6378137; 
    const lat1 = center.latitude * Math.PI / 180; 
    const lng1 = center.longitude * Math.PI / 180; 
    const dOverR = distanceMeters / R;


    const lat2 = Math.asin(
        Math.sin(lat1) * Math.cos(dOverR) +
        Math.cos(lat1) * Math.sin(dOverR) * Math.cos(angleDegrees * Math.PI / 180)
    );

    const lng2 = lng1 + Math.atan2(
        Math.sin(angleDegrees * Math.PI / 180) * Math.sin(dOverR) * Math.cos(lat1),
        Math.cos(dOverR) - Math.sin(lat1) * Math.sin(lat2)
    );

    return {
        lat: lat2 * 180 / Math.PI, 
        lng: lng2 * 180 / Math.PI 
    };
}

const handleChange = (event) => {
  setInputText(event.target.value);
};
console.log("loop value",inputText)


const handlePortraitButtonClick = () => {
  console.log(" Your panel is Potrait")
  setPanelOrientation(90);
};

const handleLandscapeButtonClick = () => {
  console.log('Your panel is Landscape')
  setPanelOrientation(0);
};
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; // Earth radius in meters
  const φ1 = lat1 * Math.PI / 180; // Latitude 1 in radians
  const φ2 = lat2 * Math.PI / 180; // Latitude 2 in radians
  const Δφ = (lat2 - lat1) * Math.PI / 180; // Difference in latitudes in radians
  const Δλ = (lon2 - lon1) * Math.PI / 180; // Difference in longitudes in radians
  
  // Haversine formula
  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Distance in meters
  const distance = R * c;
  
  return distance;
};
// Function to add distance (in meters) to latitude
const addDistanceToLatitude = (latitude, distanceMeters) => {
  // Earth's radius in meters
  const R = 6371000;

  // Calculate the change in latitude
  const deltaLat = (distanceMeters / R) * (180 / Math.PI);

  // Add the change in latitude to the original latitude
  const newLat = latitude + deltaLat;

  // Return the new latitude
  return newLat;
};
// Function to add distance (in meters) to longitude
// Function to add distance (in meters) to longitude
const addDistanceToLongitude = (latitude, longitude, distanceMeters) => {
  // Earth's radius in meters
  const R = 6371000;

  // Calculate the change in longitude per meter
  const lonPerMeter = 1 / (R * Math.cos(latitude * Math.PI / 180));

  // Calculate the change in longitude
  const deltaLon = distanceMeters * lonPerMeter;

  // Add the change in longitude to the original longitude
  const newLon = longitude + deltaLon;

  // Return the new longitude
  return newLon;
};
const addDistanceToCoords = (lat, lon, distanceMeters) => {
  // Earth's radius in meters
  const R = 6371000;

  // Convert latitude and longitude from degrees to radians
  const latRad = lat * Math.PI / 180;
  const lonRad = lon * Math.PI / 180;

  // Calculate new latitude
  const newLatRad = latRad + (distanceMeters / R) * (180 / Math.PI);

  // Calculate the new longitude based on the latitude
  // This assumes a constant longitude per latitude, which is not entirely accurate, but provides a simple approximation
  const lonPerLat = R * Math.cos(latRad);
  const newLonRad = lonRad + (distanceMeters / lonPerLat) * (180 / Math.PI);

  // Convert back to degrees
  const newLat = newLatRad * 180 / Math.PI;
  const newLon = newLonRad * 180 / Math.PI;

  // Return the new coordinates
  return { lat: newLat, lon: newLon };
};

const getBottomLeftPoint = (points) => {
  // Initialize the bottom left point as the first point in the array
  let bottomLeftPoint = points[0];

  // Iterate through the array of points
  for (let i = 1; i < points.length; i++) {
      // If the current point has a smaller latitude than the bottom left point, or if it has the same latitude but smaller longitude
      if (points[i].lat < bottomLeftPoint.lat || (points[i].lat === bottomLeftPoint.lat && points[i].lng < bottomLeftPoint.lng)) {
          bottomLeftPoint = points[i];
      }
  }

  // Return the bottom left point
  return bottomLeftPoint;
};

const isPanelInsidePolygon = (cornerCoordinates, polygonValue) => {
  const allInside = cornerCoordinates.every((coord) =>
          isPointInsidePolygon(coord, polygonValue)
     );
   return allInside  
}

const generatePaths = (
  widthInMeters,
  heightInMeters,
  azimuthDegrees,
  polygonValue,
) => {
  let paths = [];
  
  var panelCenter;
  
  var prevPanelCenter;
  var firstPanelCenter;
  var previousDistanceValue;
  console.log("Markers:",markers);
  if (markers.length === 0) {
    return;
  }
  var panelWidth = widthInMeters;
  var panelDistance = 100;
  if (panelOrientation === 90) {
     panelWidth = heightInMeters;
     panelDistance = 60;
  }
  
  // solarPanelsArray.forEach((panel, index) => {
    for(let i = 0; i < inputText; i++) {
    const [w, h] = [
      widthInMeters / 2 ,
      heightInMeters / 2
    ];
    let points = [
      { x: +w, y: +h }, // top right
      { x: +w, y: -h }, // bottom right
      { x: -w, y: -h }, // bottom left
      { x: -w, y: +h }, // top left
      { x: +w, y: +h }, // top right
    ];

    var orientation = panelOrientation;
    const azimuth = azimuthDegrees;
   if (i === 0) {
    const bottomLeftPoint = getBottomLeftPoint(markers)
    const newLat = addDistanceToLatitude(bottomLeftPoint.lat, panelWidth/2);
    const newLong = addDistanceToLongitude(newLat, bottomLeftPoint.lng, panelDistance);

    panelCenter = {
      latitude: newLat,
      longitude: newLong
    }
    firstPanelCenter = {
     lat:newLat,
     lng:newLong,
    }
    prevPanelCenter = {
      lat:newLat,
      lng:newLong,
    }
   } else {
    if (i === 0) {
      previousDistanceValue = calculateDistance(prevPanelCenter.lat, prevPanelCenter.lng, panelCenter.latitude, panelCenter.longitude);
      console.log("prev new distance:",previousDistanceValue); 
    } else {
      console.log("Panel coord:", prevPanelCenter);
      const newLong = addDistanceToLongitude(prevPanelCenter.lat, prevPanelCenter.lng, panelDistance);
      console.log("Long value:", newLong);
      panelCenter = {
        latitude:prevPanelCenter.lat,
        longitude:newLong
      }
      //console.log("New Panel coord:", panelCenter);
      const cornerCoordinates = points.map(({ x, y }) => {
        // console.log("x and y are ======",x,y);
        return computeOffset(
            panelCenter,
            Math.sqrt((x * x) + y * y),
            Math.atan2(y, x) * (180 / Math.PI) + (orientation + azimuth)
        );
      });
     
      if(!isPanelInsidePolygon(cornerCoordinates, polygonValue))  {
        console.log("Panel not inside");
      // const newLong = addDistanceToLongitude(prevPanelCenter.lng, widthInMeters);
        const newLat = addDistanceToLatitude(prevPanelCenter.lat, panelWidth);
        panelCenter = {
          latitude:newLat,
          longitude:firstPanelCenter.lng
        }
        firstPanelCenter =  {
          lat:newLat,
          lng:firstPanelCenter.lng
        };
      }
     } 
    }

    const cornerCoordinates = points.map(({ x, y }) => {
        // console.log("x and y are ======",x,y);
        return computeOffset(
            panelCenter,
            Math.sqrt((x * x) + y * y),
            Math.atan2(y, x) * (180 / Math.PI) + (orientation + azimuth)
        );
    });
    
  if (isPanelInsidePolygon(cornerCoordinates, polygonValue)) {
      console.log('all inside');
      // const colorIndex = Math.round(
      //   normalize(panel.yearlyEnergyDcKwh, maxEnergy, minEnergy) * 280
      // );

      paths.push(
        <PolygonF
          //key={index}
          path={cornerCoordinates}
          options={{
            strokeColor: "#B0BEC5",
            strokeOpacity: 0.9,
            strokeWeight: 1,
            fillColor: "black",
            fillOpacity: 0.9,
          }}
        />
      );
    }
    prevPanelCenter = {
      lat:panelCenter.latitude,
      lng:panelCenter.longitude,
    }
  };
  return paths;
};

  const showSolarPotential = (spherical, panelCount) => {
    const palette = createPalette(panelsPalette, 256).map(rgbToColor);

    // let solarPanelsArray = solarPotential.solarPanels;
    let widthInMeters = 1.045;
    let heightInMeters = 1.879;
    let azimuthDegrees = 0;          
       
  //   solarPanelsArray.sort((panelA, panelB) => {
  //     if (panelA.center.latitude !== panelB.center.latitude) {
  //         return panelA.center.latitude - panelB.center.latitude;
  //     }
  //     return panelA.center.longitude - panelB.center.longitude;
  // });

    const paths = generatePaths(widthInMeters,heightInMeters,azimuthDegrees, panelCount);
    setMap({
        paths,
        options: {
            strokeColor: '#B0BEC5',
            strokeOpacity: 0.9,
            strokeWeight: 5,
            fillColor: 'black',
            fillOpacity: 0.9
        }
    });
  };
  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <div style={{ position: 'absolute', top: '-5px', left: '380px', zIndex: 1 }}>
        <Button style={{ width: '100px', height: '45px',backgroundColor:'white',marginRight: '10px',top: '5px' }} onClick={handleDoneButtonClick}>Done</Button>
        <Button style={{ width: '100px', height: '45px', marginTop: '10px',backgroundColor:'white',marginRight: '10px' }} onClick={handlesadaButtonClick}>Get Panels</Button>
        <Button style={{ width: '100px', height: '45px', marginTop: '10px',backgroundColor:'white',marginRight: '10px' }} onClick={handleResetButton}>Reset Button</Button>
        <Button
          style={{ width: '100px', height: '50px', color: 'white', backgroundColor: panelOrientation === 90 ? 'blue' : 'gray', marginTop: '10px',marginRight: '10px' }}
          onClick={handlePortraitButtonClick}
          disabled={panelOrientation === 90} 
        >
          Portrait
        </Button>
        <Button
          style={{ width: '100px', height: '50px', color: 'white', backgroundColor: panelOrientation === 0 ? 'blue' : 'gray', marginTop: '10px',marginRight: '13px' }}
          onClick={handleLandscapeButtonClick}
          disabled={panelOrientation === 0} 
        >
          Landscape
        </Button>
        <input
          style={{ width: '100px', height: '50px', color: 'black', marginTop: '10px',padding: '10px' }}
          type='number'
          placeholder='value'
          value={inputText}
          onChange={handleChange}
        />
      </div>
      <div style={{ height: '100%', width: '100%' }}>
        {!isLoaded ? (
          <h1>Loading...</h1>
        ) : (
          <GoogleMap
            mapContainerStyle={{ height: '100%', width: '100%' }}
            center={center}
            mapTypeId="satellite"
            tilt={0}
            onLoad={onLoad}
            onClick={addMarker}
            compassEnabled={true}
          >
            <StandaloneSearchBox
              onLoad={onSearchBoxLoad}
              onPlacesChanged={onPlacesChanged}
            >
              <input
                type="text"
                placeholder="Search places..."
                style={{
                  boxSizing: 'border-box',
                  border: '1px solid transparent',
                  width: '240px',
                  height: '32px',
                  padding: '0 12px',
                  borderRadius: '3px',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                  fontSize: '14px',
                  outline: 'none',
                  textOverflow: 'ellipses',
                  position: 'absolute',
                  left: '5px',
                  top: '96px',
                  zIndex: 1
                }}
              />
            </StandaloneSearchBox>
            {searchedLocationMarker && (
              <Marker
                position={searchedLocationMarker}
                icon={searchedLocationIcon}
                draggable={false} 
              />
            )}
            <Marker position={initialCenter} />
            {markers.length > 0 && markers.map((marker, index) => (
              <Marker
                key={index}
                position={{ lat: marker.lat, lng: marker.lng }}
                draggable={true}
                onDragEnd={(e) => onMarkerDragEnd(index, e)}
              />
            ))}
            {markerLine && markerLine.length > 0 && (
              <PolygonF
                path={markerLine}
                options={{
                  strokeColor: '#FF0000',
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: 'red',
                  fillOpacity: 0.35
                }}
              />
            )}
            {polygonPaths && (
              <PolygonF
                path={polygonPaths}
                options={{
                  strokeColor: '#FF0000',
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: 'red',
                  fillOpacity: 0.35
                }}
              />
            )}
            {markers.length >= 2 && (
              <Polyline
                path={markers}
                options={{
                  strokeColor: '#FF0000',
                  strokeOpacity: 1.0,
                  strokeWeight: 2,
                }}
              />
            )}
            {map && map.paths ? map.paths.map(ele => ele) : null}
          </GoogleMap>
        )}
      </div>
    </div>
  );
  
}
export default Map;