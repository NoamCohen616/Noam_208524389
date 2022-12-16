let user = null;
let userSpacesList = [];
let nonAtomicObjectsList = [];
let objectsList = [];
let atomicObjectsList = [];
let stockObjectsList = [];
let currentObject = null;
let userAlertsList = [];
let sharingRequestsList = [];
let objectStatusUpdatesList = [];
let counter = 0;
const currentPage = window.location.pathname;
function isChecked() {
  const atomic = document.getElementById("atomic").checked;
  const stockItem = document.getElementById("is-stock").checked;
  const selectStock = document.getElementById("select-stock-status");
  const statusOptions = document.getElementById("status-options");
  if(atomic){
    selectStock.style.visibility = "visible";
    if(stockItem){
      statusOptions.style.visibility = "visible";
    }else {
      statusOptions.style.visibility = "hidden";
    }
  }else {
    selectStock.style.visibility = "hidden";
    statusOptions.style.visibility = "hidden";
  }
}

function makeVisible(e) {
  e.visibility = "visible";
  e.transition = "1s";
  e.opacity = "1";
  e.pointerEvents = "visible";
}

function makeInvisible(e) {
  e.visibility = "hidden";
  e.transition = "1s";
  e.opacity = "0";
  e.pointerEvents = "none";
}
function emailExists(e){
  let res = false;
  users.forEach(function (user){
    if(user.email === e){
      res=true;
    }
  })
  return res;
}

function emailMatchesPassword(e, p){
  let res = false;
  users.forEach(function (user){
    if(user.email===e && user.password===p){
      res = true;
    }
  })
  return res;
}

function addNum(){
  counter = nonAtomicObjects.length + atomicObjects.length;
  counter+=1;
  return counter.toString();
}
//TODO sendJoinRequest
function sendJoinRequest(spaceID){
  if(isSpaceType(spaceID)){
    let space = null;
    for(let i=0; i<nonAtomicObjects.length; i++){
      if(nonAtomicObjects[i].ID===spaceID){
        space = nonAtomicObjects[i];
      }
    }
    if(space===null){
      return false;
    }
    for(let i=0; i<spaces.length; i++){
      if(!space.isPersonal && !spaceShared(spaceID, activeUser.email)){
        let sharingRequest = {};
        sharingRequest.user = space.owner;
        sharingRequest.number = alerts.length;
        sharingRequest.from = activeUser.email;
        sharingRequest.space = spaceID;
        sharingRequest.requestStatus = "ממתינה לאישור";
        sharingRequests.push(sharingRequest);
        let alert = {};
        alert.user = sharingRequest.user
        alert.number = sharingRequest.number;
        alert.time = Date.now();
        alert.title = "בקשת הצטרפות חדשה";
        alert.message = "בקשת הצטרפות חדשה";
        alert.read = false;
        alert.deleted = false;
        alerts.push(alert);
        return true;
      }
    }
  }

  return false;
}
function spaceShared(spaceID, sharedWith){
  for (let i=0; i<sharedSpaces.length; i++){
    if(sharedSpaces[i].space === spaceID && sharedSpaces[i].sharedWith === sharedWith){
      return true;
    }
  }
  return false;
}
function itemExists(itemName/*, userEmail*/){
  let res = false;
  nonAtomicObjects.forEach(function (object){
    if(object.name===itemName/* && this item is shared with this user*/){
      res = true;
    }
  })
  atomicObjects.forEach(function (object){
    if(object.name===itemName/* && this item is shared with this user*/){
      res = true;
    }
  })
  return res;
}

function currentUser(email){
  let currentUser = null;
  users.forEach(function (user){
    if(user.email===email){
      currentUser = user;
    }
  })
  return currentUser;
}

function getSharedSpaces(email){
  let userSharedSpaces = [];
  let space=null;
  for(let i=0; i<sharedSpaces.length; i++){
    if(sharedSpaces[i].sharedWith===email){
      space = sharedSpaces[i];
      for (let j=0; j<spaces.length; j++){
        if(spaces[j].ID===space.space){
          userSharedSpaces.push(spaces[j]);
        }
      }
    }
  }
  return userSharedSpaces;
}

function getUserNonAtomicObjects(email){
  let sharedSpaces = getSharedSpaces(email);
  let sharedNonAtomicDescendants = getAllNonAtomicDescendants(sharedSpaces);
  return sharedSpaces.concat(sharedNonAtomicDescendants);
}

function getAllSharedObjects(spacesList){
  let sharedObjects = spacesList;
  sharedObjects = sharedObjects.concat(getAllNonAtomicDescendants(spacesList));
  sharedObjects = sharedObjects.concat(getAllAtomicDescendants(sharedObjects));
  return sharedObjects;
}

function getAllNonAtomicDescendants(nonAtomicList){
  let descendants = [];
  for(let i=0; i<nonAtomicList.length; i++){
    let filteredList=[];
    filteredList = nonAtomicInNonAtomic.filter(function (e){
      return e.inside===nonAtomicList[i].ID
    });
    if(filteredList.length>0){
      let objectsConnectedToFiltered = getObjectsConnectedFromNonAtomicInNonAtomic(filteredList);
      for(let j=0; j<objectsConnectedToFiltered.length; j++){
        descendants.push(objectsConnectedToFiltered[j]);
      }
      let dd = getAllNonAtomicDescendants(objectsConnectedToFiltered);
      descendants = descendants.concat(dd);
    }
  }
  return descendants;
}

function getObjectsConnectedFromNonAtomicInNonAtomic(filteredList){
  let objectsList=[];
  for(let i=0; i<filteredList.length; i++){
    for (let j=0; j<nonAtomicObjects.length; j++){
      if(filteredList[i].ID===nonAtomicObjects[j].ID){
        objectsList.push(nonAtomicObjects[j]);
        break;
      }
    }
  }
  return objectsList;
}

function getAllAtomicDescendants(sharedObjects){
  let atomicDescendants = [];
  for(let i=0;i<sharedObjects.length;i++){
    for(let j=0;j<atomicObjects.length;j++){
      if(sharedObjects[i].ID===atomicObjects[j].inside){
        atomicDescendants.push(atomicObjects[j]);
      }
    }
  }
  return atomicDescendants;
}

function getStockObjectsList(atomicObjectsList){
  let stockObjectsList = [];
  for(let i=0; i<stockObjects.length; i++){
    for(let j=0; j<atomicObjects.length; j++){
      if(stockObjects[i].ID===atomicObjects[j].ID){
        stockObjectsList.push(stockObjects[i]);
        break;
      }
    }
  }
  return stockObjectsList;
}

function getNonAtomicChildren(fatherID){
  let children = [];
  for(let i=0; i<nonAtomicInNonAtomic.length; i++){
    if(fatherID===nonAtomicInNonAtomic[i].inside){
      children.push(nonAtomicInNonAtomic[i]);
    }
  }
  return getObjectsConnectedFromNonAtomicInNonAtomic(children);
}

function getAtomicChildren(fatherID){
  return atomicObjects.filter(function (e){
    return e.inside===fatherID;
  })
}
function getSpace(id){
  for(let i=0; i<activeUserSpacesList.length; i++) {
    if(activeUserSpacesList[i].ID===id){
      return activeUserSpacesList[i];
    }
  }
  return null;
}
function getObject(id){
  for(let i=0; i<activeObjectsList.length; i++) {
    if(activeObjectsList[i].ID===id){
      return activeObjectsList[i];
    }
  }
  return null;
}

function isSpaceType(id){
  const sp = "SP-";
  return id.includes(sp);
}
function searchResults(objectName){
  const results = [];
  for(let i=0; i<activeObjectsList.length; i++){
    if(activeObjectsList[i].name.includes(objectName)){
      results.push(activeObjectsList[i]);
    }
  }
  return results;
}
function isAtomic(itemID){
  for(let i=0; i<atomicObjects.length; i++){
    if(itemID===atomicObjects[i].ID){
      return true;
    }
  }
  return false;
}

function privacyFilter(email, objectList){
  let filteredList = [];
  for(let i=0; i<objectList.length; i++){
    if(email===objectList[i].owner){
      filteredList.push(objectList[i]);
    }else if(!objectList[i].isPersonal){
      filteredList.push(objectList[i]);
    }
  }
  return filteredList;
}

function updateUser(email, password, name){
  for(let i=0; i<users.length; i++){
    if(users[i].email===email){
      if(password !== ''){
        users[i].password = password;
      }
      if(name !== users[i].name){
        users[i].name = name;
      }
    }
  }
}

function getFather(itemID){
  let father = null;
  if(isAtomic(itemID)){
    for (let i=0; i<atomicObjects.length; i++){
      if(atomicObjects[i].ID ===itemID){
        father = getObject(atomicObjects[i].inside);
      }
    }
  }else{
    for(let i=0; i<nonAtomicInNonAtomic.length; i++){
      if(nonAtomicInNonAtomic[i].ID===itemID){
        father = getObject(nonAtomicInNonAtomic[i].inside);
      }
    }
  }
  return father;
}
function itemNameExists(name){
  for(let i=0; i<activeObjectsList.length; i++){
    if(name===activeObjectsList[i].name){
      return true;
    }
  }
  return false;
}