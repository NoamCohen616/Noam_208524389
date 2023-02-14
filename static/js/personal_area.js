let alertsCenterStyle, createItemWindowStyle, searchItemForm, 
searchResultsContainer, itemSearched, smsg, cmsg, 
createItemForm, newItemName, isPrivateItem, atomic,
is_stock, stock_status;

window.onload= () => {
  setTimeout(() => {
    let helloUser = document.querySelector('#hello-user');
    helloUser.innerHTML=`היי ${activeUser.name}!`;
    let objectsContainer = document.querySelector('#objects-placer');
    if(activeUserSpacesList.length>0){
      for (let i=0; i<activeUserSpacesList.length; i++){
        let space = document.createElement('a');
        space.href = "/non_atomic_zone";
        space.id = activeUserSpacesList[i].ID;
        space.className = "object";
        space.innerHTML = `${activeUserSpacesList[i].name}`;
        objectsContainer.appendChild(space);
        space.onclick = () => {
          currentObject = getSpace(space.id);
          window.localStorage['currentObject'] = JSON.stringify(currentObject);
        }
      }
    }
    let containers = document.getElementById("selectContainer");
    for(let i=0; i<activeNonAtomicObjectsList.length; i++){
      let option = document.createElement('option');
      option.value = activeNonAtomicObjectsList[i].ID;
      option.innerHTML = activeNonAtomicObjectsList[i].name;
      containers.appendChild(option);
    }
  }, 300);
}

function loadAlerts() {
  let alertsElem = document.getElementById('alert_center_content');
  if (alertsElem) {
    for (let i=0; i<alerts.length; i++) {
      let alert = alerts[i];
      alertsElem.innerHTML += `
        <p class="alert">
          <strong>${alert.title}</strong>
          <span>${alert.message}</span>
        </p>
      `;
    }
  }

  alertsCenterStyle = document.getElementById("alerts_center").style;
  createItemWindowStyle = document.getElementById("create-item-window").style;
  searchItemForm = document.querySelector('#searchItemForm');
  searchResultsContainer = document.querySelector('#searchResults');
  itemSearched = document.querySelector('#itemSearched');
  smsg = document.getElementById('searchMessage');
  cmsg = document.getElementById('createMessage');

  document.getElementById("bell").onclick = () => makeVisible(alertsCenterStyle);
  document.getElementById("exit_alerts_center").onclick =(e) => {
    e.preventDefault();
    makeInvisible(alertsCenterStyle);
  };
  document.getElementById("add_item_button").onclick = (e) => {
    e.preventDefault();
    makeInvisible(searchResultsContainer.style);
    isChecked();
    makeVisible(createItemWindowStyle);
  }

  document.getElementById("exit_create-item-form").onclick = (e) => {
    e.preventDefault();
    makeInvisible(createItemWindowStyle);
  };

  document.getElementById("atomic").onclick = () => isChecked();
  document.getElementById("non-atomic").onclick = () => isChecked();
  document.getElementById("is-stock").onclick = () => isChecked();

  searchItemForm.addEventListener('submit', validItemSearch);

  createItemForm = document.querySelector('#createItemForm');
  createItemForm.addEventListener('submit', validItemCreation);
}

setTimeout(() => {
  loadAlerts();
}, 500);

let validItemSearch = (e) => {
  e.preventDefault();
  searchResultsContainer.innerHTML = '';
  let searchResultsList = searchResults(itemSearched.value);
  if(itemSearched.value===''){
    smsg.innerHTML="יש להזין את שם הפריט";
    smsg.classList.add('error');
    setTimeout(() => {
      smsg.innerHTML='';
      smsg.classList.remove('error');
    }, 4000);
  }else if(searchResultsList.length===0){
    smsg.innerHTML="פריט לא נמצא";
    smsg.classList.add('error');
    setTimeout(() => {
      smsg.innerHTML='';
      smsg.classList.remove('error');
    }, 4000);
  }else{
    smsg.classList.add('success');
    makeVisible(searchResultsContainer.style);
    for (let i=0; i<searchResultsList.length; i++){
      let item = document.createElement('a');
      item.className = "searchedItem";
      item.id = searchResultsList[i].ID;
      item.innerHTML = searchResultsList[i].name;
      if(isAtomic(item.id)){
        item.style.backgroundColor= "#B5D7FF";
        item.href = "/object_details";
      }else{
        item.href = "/non_atomic_zone";
      }
      searchResultsContainer.appendChild(item);
      item.onclick = () => {
        currentObject = getObject(item.id);
        window.localStorage['currentObject'] = JSON.stringify(currentObject);
      }
    }
    setTimeout(() => {
      smsg.innerHTML='';
      smsg.classList.remove('success');
    }, 1);
  }
}

let validItemCreation = (e) => {
  e.preventDefault();

  newItemName = document.querySelector('#newItemName');
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
  }else if(itemNameExists(newItemName.value)){
    cmsg.innerHTML="כבר קיים אצלך פריט עם אותו שם, יש להזין שם חדש כדי לא להתבלבל";
    cmsg.classList.add('error');
    setTimeout(() => {
      cmsg.innerHTML='';
      cmsg.classList.remove('error');
    }, 4000);
  }else{
    cmsg.innerHTML="יוצר פריט חדש";
    cmsg.classList.add('success');
    setTimeout(() => {
      cmsg.innerHTML='';
      cmsg.classList.remove('success');
    }, 4000);

    const inside = document.getElementById("selectContainer").value;
    createNewItem(newItemName.value, isPrivateItem.checked, atomic.checked, is_stock, stock_status, inside);
  }
}