import { initializeMap } from './components/Map.js';
import { createSaveButton } from './components/SaveButton.js';
import { createImageModal, openImage } from './components/ImageModal.js';
import { readImage } from './utils/imageUtils.js';

// 전역 스코프에 openImage 함수 할당
window.openImage = openImage;

// 지도 초기화
const { map, getCurrentLatLng } = initializeMap('map');

// 저장 버튼 생성 및 추가
const saveBtn = createSaveButton();
saveBtn.addTo(map);

// 이미지 모달 생성
createImageModal();

document.querySelector('.save-btn button').addEventListener('click', async () => {
   const currentLatLng = getCurrentLatLng();
  if (!currentLatLng) {
    return alert('현재 위치를 확인 중입니다. 잠시만 기다려주세요');
  }


  const fileInput = document.getElementById('photoInput');
  if (!fileInput.files.length) {
    return alert('주차 사진을 찍거나 선택해주세요.');
  }

  //Base64 문자열(Data URL)로 변환해주는 유틸 함수입니다.
  //이를 통해 업로드한 이미지를 화면에 바로 보여줌
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