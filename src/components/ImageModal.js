export function createImageModal() {
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
}

// // 이미지 확대 함수 (전역)
// window.openImage = function(src) {
//   const modal = document.getElementById('imageModal');
//   const img = document.getElementById('modalImage');
//   img.src = src;
//   modal.style.display = 'flex';
// };

export function openImage(src) {
    const modal = document.getElementById('imageModal');
    const img = document.getElementById('modalImage');
    img.src = src;
    modal.style.display = 'flex';
}

// window.openImage → export function openImage
// 로 바꾸는 건 단순히 문법 차이가 아니라 코드 구조와 관리 방식을 바꾸는 의미가 있습니다.

// 1. 전역 함수(window.openImage)의 문제점
// - 전역 오염(Global Pollution)
// window에 붙이면 프로젝트 어디서든 접근 가능하지만, 다른 코드와 이름 충돌 위험이 큽니다.
// - 재사용성 낮음
// 특정 HTML 구조(imageModal, modalImage)에 강하게 의존해서 다른 컴포넌트나 프로젝트에서 
// 쓰기 어렵습니다.
// - 테스트/유지보수 어려움
// 전역에 퍼져 있는 함수는 모듈 단위로 관리하기 힘들고, 테스트하기도 까다롭습니다.

// 2. 모듈화(export function)의 장점
// - 스코프 분리
// 함수가 모듈 안에만 존재하고, 필요한 곳에서만 import해서 사용합니다.
// → 불필요하게 전역에 노출되지 않음.
// - 재사용성 증가
// 다른 컴포넌트에서 import { openImage } from './utils/openImage.js'처럼 
// 가져다 쓸 수 있습니다.
// - 유지보수 용이
// 모듈 단위로 관리되므로 코드 구조가 깔끔해지고, 테스트도 독립적으로 가능.
// - 컴포넌트화와 자연스러운 연결
// React/Vue 같은 프레임워크에서는 전역 대신 모듈 export/import 패턴을 쓰는 게 기본입니다.
// → 결국 UI 동작을 컴포넌트 내부 상태와 함수로 관리하는 방향으로 발전시킬 수 있습니다.

// 3. 컴포넌트화의 의미
// - 단순히 export function으로 바꾸는 건 모듈화이고,
// - 이를 React/Vue 같은 환경에서 쓰면 컴포넌트 내부 로직으로 흡수할 수 있습니다.
// 예를 들어 React에서는 openImage를 훅이나 컴포넌트 상태로 관리해서 모달을 제어합니다.

// ✅ 정리
// window.openImage → export function openImage로 바꾸는 이유는
// - 전역 오염을 피하고,
// - 모듈 단위로 관리하며,
// - 재사용성과 유지보수를 높이고,
// - 컴포넌트 기반 프레임워크와 자연스럽게 연결하기 위해서입니다.