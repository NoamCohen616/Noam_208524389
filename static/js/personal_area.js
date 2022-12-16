const activeUser = JSON.parse((window.localStorage['activeUser']));
const activeUserSpacesList = JSON.parse((window.localStorage['activeUserSpacesList']));
const activeNonAtomicObjectsList = JSON.parse((window.localStorage['activeNonAtomicObjectsList']));
const activeObjectsList = JSON.parse((window.localStorage['activeObjectsList']));
const activeAtomicObjectsList = JSON.parse((window.localStorage['activeAtomicObjectsList']));
const activeStockObjectsList = JSON.parse((window.localStorage['activeStockObjectsList']));
// const activeUserAlerts;
// const activeSharingRequests;
// const activeObjectStatusUpdates;


const alertsCenterStyle = document.getElementById("alerts_center").style;
const createItemWindowStyle = document.getElementById("create-item-window").style;

const searchItemForm = document.querySelector('#searchItemForm');
const searchResultsContainer = document.querySelector('#searchResults');
const itemSearched = document.querySelector('#itemSearched');
const smsg = document.getElementById('searchMessage');
const cmsg = document.getElementById('createMessage');

document.getElementById("bell").onclick = () => makeVisible(alertsCenterStyle);
document.getElementById("exit_alerts_center").onclick =() => makeInvisible(alertsCenterStyle);
document.getElementById("add_item_button").onclick = () => {
  makeInvisible(searchResultsContainer.style);
  isChecked();
  makeVisible(createItemWindowStyle);
}

document.getElementById("exit_create-item-form").onclick = () => makeInvisible(createItemWindowStyle);
document.getElementById("atomic").onclick = () => isChecked();
document.getElementById("non-atomic").onclick = () => isChecked();
document.getElementById("is-stock").onclick = () => isChecked();

window.onload= () => {
  const helloUser = document.querySelector('#hello-user');
  helloUser.innerHTML=`היי ${activeUser.name}!`;
  const objectsContainer = document.querySelector('#objects-placer');
  if(activeUserSpacesList.length>0){
    for (let i=0; i<activeUserSpacesList.length; i++){
      let space = document.createElement('a');
      space.href = "non_atomic_zone.html";
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
  const containers = document.getElementById("selectContainer");
  for(let i=0; i<activeNonAtomicObjectsList.length; i++){
    let option = document.createElement('option');
    option.innerHTML = activeNonAtomicObjectsList[i].name;
    containers.appendChild(option);
  }
}
const validItemSearch = (e) => {
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
        item.href = "object_details.html";
      }else{
        item.href = "non_atomic_zone.html";
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
searchItemForm.addEventListener('submit', validItemSearch);


const createItemForm = document.querySelector('#createItemForm');
const newItemName = document.querySelector('#newItemName');

const validItemCreation = (e) => {
  e.preventDefault();
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
    /*createNewSpace(itemName, isPrivateSpace.checked);*/
    location.href = "personal_area.html";
    alert("הפריט נוצר בהצלחה!");
  }
}
createItemForm.addEventListener('submit', validItemCreation);

