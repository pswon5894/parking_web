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
  div.innerHTML = `<button style="padding: 10px; cursor: pointer;">주차 위치 복사</button><br/>
    <input type="file" id="photoInput"
      accept="image/*"
      capture="environment"
      style="margin-top:5px;" />
  `;
  return div;
};
saveBtn.addTo(map);

// 이미지 모달 HTML 추가
const modalHTML = `
  <div id="imageModal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); z-index:9999; justify-content:center; align-items:center; cursor:pointer;">
    <img id="modalImage" style="max-width:90%; max-height:90%; object-fit:contain;" />
  </div>
`;
document.body.insertAdjacentHTML('beforeend', modalHTML);

// 모달 닫기 이벤트
document.getElementById('imageModal').addEventListener('click', () => {
  document.getElementById('imageModal').style.display = 'none';
});

// 이미지 확대 함수 (전역)
window.openImage = function(src) {
  const modal = document.getElementById('imageModal');
  const img = document.getElementById('modalImage');
  img.src = src;
  modal.style.display = 'flex';
};


function readImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}


document.querySelector('.save-btn button').addEventListener('click', async () => {
  if (!currentLatLng) {
    return alert('현재 위치를 확인 중입니다. 잠시만 기다려주세요');
  }


  const fileInput = document.getElementById('photoInput');
  if (!fileInput.files.length) {
    return alert('주차 사진을 찍거나 선택해주세요.');
  }

  const imageBase64 = await readImage(fileInput.files[0]);


  const { lat, lng } = currentLatLng;


  // 마커 생성
  const marker = L.marker([lat, lng]).addTo(map);

  marker.bindPopup(
    `<b> 주차 위치</b><br/>
    <img src="${imageBase64}"
    style="width:200px; margin-top:5px; border-radius:8px; cursor:pointer;"
    onclick="openImage('${imageBase64}')"
    /><br/>
    <a href="https://www.google.com/maps?q=${lat},${lng}"
       target="_blank">구글맵으로 열기</a>`
  );

  marker.openPopup();

  // 리버스 지오코딩, 좌표를 주소로 안내
  fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`)
    .then(res => res.json())
    .then(data => {
      const address = data.display_name || '주소 정보 없음';

      const googleMapUrl = `https://www.google.com/maps/search/?api=1query=${lat},${lng}`;

      //주소와 링크 알림
      alert(
        `주차 위치 저장됨\n\n주소:\n${address}`
      );

    });

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