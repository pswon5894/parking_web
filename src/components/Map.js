let currentLatLng = null;

export function initializeMap(mapId){
    // 지도생성
    const map = L.map(mapId).setView([37.5665, 126.9780], 13);

    // OnenStreetMap 타일 사용 (api 키 필요 없음)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    map.locate({setView: true, maxZoom: 16});

    map.on('locationfound', function (e) {
        currentLatLng = e.latlng;

        // 현재 위치에 마커 추가
        L.marker(e.latlng)
            .addTo(map)
            .bindPopup('내 현재 위치')
            .openPopup();

        L.circle(e.latlng, e.accuracy).addTo(map);
    });

    map.on('locationerror', function () {
        alert('위치 정보를 사용할 수 없습니다.');
    });

    const getCurrentLatLng = () => currentLatLng;

    return { map, getCurrentLatLng };
}