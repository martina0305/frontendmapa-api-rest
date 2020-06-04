//let map= "";
let markersAll = [];

window.initMap = () => {
    // The location of Uluru
    const maimo = { lat: -34.610490, lng: -58.440860 };
    // The map, centered at Uluru
    map = new google.maps.Map(
        document.getElementById('map'),
        {
            zoom: 15,
            center: maimo,
            styles: styles,
            streetViewControl: false,
            fullscreenControl: false,
            mapTypeControlOptions: {

                mapTypeIds: []

            },
            zoomControlOptions: {
                position: google.maps.ControlPosition.LEFT_CENTER
            }
        });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({ position: maimo, map: map });

    fetchMarkers(map)

    //FILTROS
    //Traigo elementos del DOM
    const handleFilterBuilding = document.querySelector('.urbano');
    const handleFilterBar = document.querySelector('.neon');
    const handleFilterHop = document.querySelector('.naturaleza');
    const handleFilterTv = document.querySelector('.vintage');

    //Eventos de click de los filtros
    handleFilterBuilding.addEventListener('click', (e) => {
        e.preventDefault();
        addMarkerFiltered('urbano')
    })
    handleFilterBar.addEventListener('click', (e) => {
        e.preventDefault();
        addMarkerFiltered('neon')
    })
    handleFilterHop.addEventListener('click', (e) => {
        e.preventDefault();
        addMarkerFiltered('naturaleza')
    })
    handleFilterTv.addEventListener('click', (e) => {
        e.preventDefault();
        addMarkerFiltered('vintage')
    })

    //Agrego los markers filtrados según filtro (markerType)
    const addMarkerFiltered = (markerType) => {
        console.log('clicked sth');
        markersAll.forEach((marker) => {
            //console.log(marker)
            marker.setMap(null); //Quita todos los markers del mapa
        })
        const markerFiltered = markersAll.filter((markerItem) => markerItem.customInfo === markerType)
        markerFiltered.forEach((marker) => {
            marker.setMap(map);
        })
    }

}


const fetchMarkers = async (map) => {

    try {

        const response = await fetch('assets/data.json');
        const json = await response.json();

        json.forEach(marker => {
            addMarker(map, marker)
        });

    } catch (error) {

        console.log(error);
    }
}


const addMarker = (map, marker) => {

    console.log(marker)
    const { lat, lng, name, type, description } = marker;
    const contentString = `
    <div><h2>${name}</h2>
    <h3>${type}</h3>
    <p>${description}</p></div>`;
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    const icons = {
        'neon': 'assets/img/bar.png',
        'urbano': 'assets/img/building.png',
        'natural': 'assets/img/hop.png',
        'vintage': 'assets/img/tv.png'
    }

    const markerItem = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
        icon: icons [type],
    });

    markerItem.setMap(map);
    markerItem.addListener('click', function () {
        infowindow.open(map, markerItem);
    });

    markersAll.push(markerItem);
}

