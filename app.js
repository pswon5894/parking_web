    // 지도생성
const map = L.map('map').setView([37.5665, 126.9780], 13);

// OnenStreetMap 타일 사용 (api 키 필요 없음)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let currentLatLng = null;

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

const saveBtn = L.control({position: 'topright'});
saveBtn.onAdd = function() {
  const div = L.DomUtil.create('div', 'save-btn');
  div.innerHTML = '<button style="padding: 10px; cursor: pointer;">주차 위치 복사</button>';
  return div;
};
saveBtn.addTo(map);

document.querySelector('.save-btn button').addEventListener('click', () => {
  if (!currentLatLng) {
    return alert('현재 위치를 확인 중입니다. 잠시만 기다려주세요');
  }

  const lat = currentLatLng.lat;
  const lng = currentLatLng.lng;

  // 구글 맵 주소 형식 생성
  const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;

  // 클립보드에 복사
  navigator.clipboard.writeText(googleMapsUrl).then(() => {
    alert('주차 위치가 구글 맵 링크로 복사되었습니다!\n' + googleMapsUrl);
    console.log('Saved URL:', googleMapsUrl);
  }).catch(err => {
    console.error('복사 실패:', err);
    alert('클립보드 복사에 실패했습니다.');
  });
});

// 예시 마커 (주차 위치)
// const parkingMarker = L.marker([37.5665, 126.9780])
//     .addTo(map)
//     .bindPopup('현재 주차 위치');

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