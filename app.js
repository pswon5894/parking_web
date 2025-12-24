    // 지도생성
const map = L.map('map').setView([37.5665, 126.9780], 13);

// OnenStreetMap 타일 사용 (api 키 필요 없음)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
    '&copy; OpenStreetMap contributors'
}).addTo(map);

// 예시 마커 (주차 위치)
const parkingMarker = L.marker([37.5665, 126.9780])
    .addTo(map)
    .bindPopup('현재 주차 위치');

// 서버에서 위치 받아오는 예시
/*
fetch('https://your-server.com/locations')
  .then(res => res.json())
  .then(data => {
    data.forEach(car => {
      L.marker([car.lat, car.lng])
        .addTo(map)
        .bindPopup(`차량 ID: ${car.carId}`);
    });
  });
*/


// 반드시 “© OpenStreetMap contributors”를 표시해야 한다, 라이센스