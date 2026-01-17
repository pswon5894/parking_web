export function createSaveButton(){
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
    return saveBtn;
}