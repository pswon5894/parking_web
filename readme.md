# 주차 위치를 지도에 표시하기 위한 웹

## 파일 구조
- **`src/app.js` (신규)**: 웹의 새로운 메인 진입점(Entry Point)입니다. 각 모듈을 가져와(import) 전체 앱의 동작을 통합하고 관리합니다.
- **`src/components/Map.js` (신규)**: Leaflet 지도를 초기화하고, 사용자의 현재 위치를 찾아 마커를 표시하는 역할을 담당합니다.
- **`src/components/SaveButton.js` (신규)**: '주차 위치 복사' 버튼과 사진 첨부 input을 포함하는 Leaflet 컨트롤을 생성하는 역할을 합니다.
- **`src/components/ImageModal.js` (신규)**: 주차된 차량의 사진을 클릭했을 때 전체 화면으로 보여주는 이미지 모달을 생성하고 제어합니다.
- **`src/utils/imageUtils.js` (신규)**: 사용자가 첨부한 이미지 파일을 읽어 Base64 형식으로 변환하는 유틸리티 함수를 제공합니다.

# 만든계기

## 가족간의 차량공유에 불편함을 줄이기 위해서

## 배포

### gitpage를 통해서 배포
https://pswon5894.github.io/parking_web/
#### 정적인 웹사이트, 서버에 큰 요청사항이 없을때

### firebase 호스팅을 통한 배포

### node.js 런타임을 이용하고 가벼운 웹 서버 프레임워크인 express

## 저작자표시 - OpenStreetMap 데이터를 자유롭게 복사, 배포, 전송 및 적용하려면 OpenStreetMap 기여자를 명시해야 합니다.

https://leafletjs.com/reference.html

인터프리터는 코드를 한 줄씩 읽어가며 실해하는 프로그램

컴파일러는 코드 전체를 한번에 읽어서 기계어로 번역한다, 그래서 인터프리터에 비에 빠르다