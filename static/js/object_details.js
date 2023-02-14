let alertsCenterStyle, createItemWindowStyle, searchItemForm, 
searchResultsContainer, itemSearched, smsg, cmsg, 
createItemForm, newItemName, isPrivateItem, atomic,
is_stock, stock_status;

window.onload= () => {
  setTimeout(() => {
    const editItemWindowStyle = document.getElementById("edit-item-window").style;
    const objectDetailsZoneStyle = document.getElementById("object-details-zone").style;
    
    let e = document.getElementById('back-link');
    e.setAttribute('href', document.referrer);
    e.onclick = () => {
      history.back();
      return false;
    }
    
    document.getElementById("edit-item").onclick = () =>{
      isChecked();
      makeVisible(editItemWindowStyle);
      makeInvisible(objectDetailsZoneStyle);
    }
    document.getElementById("exit_edit-item-form").onclick = () =>{
    
      makeInvisible(editItemWindowStyle);
      makeVisible(objectDetailsZoneStyle);
    }
    document.getElementById("atomic").onclick = () => isChecked();
    document.getElementById("non-atomic").onclick = () => isChecked();
    document.getElementById("is-stock").onclick = () => isChecked();
    cmsg = document.getElementById('createMessage');

    currentObject = JSON.parse((window.localStorage['currentObject']));
    document.querySelector('.object-title').innerText = currentObject.name;
    const stockStatus = activeStockObjectsList.find(i => i.ID === currentObject.ID);
    if (stockStatus) {
      document.querySelector('.stock-status').innerText = stockStatus.stockStatus;
    }
    else {
      document.querySelector('.stock-status').remove();
    }
    
    const concatenation = document.querySelector('.concatenation');
    const fArray = [currentObject];
    
    let id = currentObject.ID;
    
    while (getFather(id)) {
      let father = getFather(id);
      fArray.push(father);
      id = father.ID;
    }

    let html = ``;
    for (let i=fArray.length-1; i>0; i--) {
      html += `
        <span onclick="setCurrentObject('${fArray[i].ID}')" class="object-label">${fArray[i].name}</span>
        <div class="arrow"><img src="../static/img/arrow.png" alt="contains"></div>
      `;
    }
    html += `<div class="object-label">${currentObject.name}</div>`;

    concatenation.innerHTML = html;

    createItemForm = document.querySelector('#createItemForm');
    createItemForm.addEventListener('submit', validItemUpdate);

    document.querySelector('input[name="name"]').value = currentObject.name;

    let containers = document.getElementById("selectContainer");
    for(let i=0; i<activeNonAtomicObjectsList.length; i++){
      let option = document.createElement('option');
      option.value = activeNonAtomicObjectsList[i].ID;
      option.innerHTML = activeNonAtomicObjectsList[i].name;
      containers.appendChild(option);
    }

  }, 300);
};

let validItemUpdate = (e) => {
  e.preventDefault();
  newItemName = document.querySelector('input[name="name"]');
  isPrivateItem = document.querySelector('input[name="private"]');
  atomic = document.querySelector('input[name="atomic"]');
  is_stock = document.querySelector('#is-stock').checked;

  if (is_stock) {
    stock_status = document.getElementById('status-options').value;
  }

  if(newItemName.value===''){
    cmsg.innerHTML="יש להזין את שם הפריט";
    cmsg.classList.add('error');
    setTimeout(() => {
      cmsg.innerHTML='';
      cmsg.classList.remove('error');
    }, 4000);
  }else{
    cmsg.innerHTML="מעדכן פריט";
    cmsg.classList.add('success');
    setTimeout(() => {
      cmsg.innerHTML='';
      cmsg.classList.remove('success');
    }, 4000);

    const inside = document.getElementById("selectContainer").value;
    updateItem(newItemName.value, isPrivateItem.checked, atomic.checked, is_stock, stock_status, inside);
  }
}

function setCurrentObject(id) {
  let currentObject = getObject(id);
  window.localStorage['currentObject'] = JSON.stringify(currentObject);
  window.location = 'non_atomic_zone';
}