let users = [];
let nonAtomicObjects = [];
let spaces = [];
let sharedSpaces = [];
let nonAtomicInNonAtomic = [];
let atomicObjects = [];
let stockObjects = [];
let alerts = [];
let sharingRequests = [];
let objectStatusUpdates = [];
let counter = 0;

const currentPage = window.location.pathname;
const activeNonAtomicObjectsList = JSON.parse((window.localStorage['activeNonAtomicObjectsList']));
const activeUserSpacesList = JSON.parse((window.localStorage['activeUserSpacesList']));
const activeObjectsList = JSON.parse((window.localStorage['activeObjectsList']));
const activeAtomicObjectsList = JSON.parse((window.localStorage['activeAtomicObjectsList']));
const activeStockObjectsList = JSON.parse((window.localStorage['activeStockObjectsList']));
const activeUser = JSON.parse((window.localStorage['activeUser']));

let obj_urls = [
    '/users',
    '/nonAtomicObjects',
    '/spaces',
    '/sharedSpaces',
    '/nonAtomicInNonAtomic',
    '/atomicObjects',
    '/stockObjects',
    '/alerts',
    '/sharingRequests',
    '/objectStatusUpdates'
];

Promise.all(obj_urls.map(url =>
    fetch(url).then(resp => resp.json())
)).then(res => {
    users = res[0].data;
    nonAtomicObjects = res[1].data;
    spaces = res[2].data;
    sharedSpaces = res[3].data;
    nonAtomicInNonAtomic = res[4].data;
    atomicObjects = res[5].data;
    stockObjects = res[6].data;
    alerts = res[7].data;
    sharingRequests = res[8].data;
    objectStatusUpdates = res[9].data;
});

function createNewUser(email, password, name){
    fetch(`/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email, 
            password,
            name
        }),
    })
        .then((response) => response.json())
        .then((response) => {
            if (response.data) {
                const user = response.data[0];
                users.push(user);
                location.href = "login.html";
            } 
            else {
                alert("Error while creating new user!");
                window.location.reload();
            }
        })
        .catch((e) => {
            console.log(e);
            alert("A server error occurred");
            window.location.reload();
        });
}

function updateItem(name, isPrivate, isAtomic, is_stock, stock_status, inside) {
  let obj = {
    name,
    ID: addNum(),
    owner: activeUser.email, 
    isPersonal: isPrivate ? 1 : 0,
    inside
  };

  fetch(isAtomic ? `/atomicObjects`: `/nonAtomicObjects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
  })
      .then((response) => response.json())
      .then((response) => {
          if (response.data) {
              if (!isAtomic) {
                fetch(`/nonAtomicInNonAtomic`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    ID: obj.ID,
                    inside
                  }),
              })
                  .then((response) => response.json())
                  .then((response) => {
                    })
                      .catch((e) => {
                        console.log(e);
                        alert("A server error occurred");
                        window.location.reload();
                    });
              }

              if (is_stock && stock_status) {
                fetch(`/stockObjects`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    ID: obj.ID,
                    stockStatus: stock_status
                  }),
              })
                  .then((response) => response.json())
                  .then((response) => {

                  }).catch((e) => {
                    console.log(e);
                    alert("A server error occurred");
                });
              }
          } 
          else {
              alert("Error while creating new Object!");
              window.location.reload();
          }
      })
      .catch((e) => {
          console.log(e);
          alert("A server error occurred");
          window.location.reload();
      });
}

function createNewItem(name, isPrivate, isAtomic, is_stock, stock_status, inside) {
  let obj = {
    name,
    ID: addNum(),
    owner: activeUser.email, 
    isPersonal: isPrivate ? 1 : 0,
    inside
  };

  fetch(isAtomic ? `/atomicObjects`: `/nonAtomicObjects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
  })
      .then((response) => response.json())
      .then((response) => {
          if (response.data) {
              if (!isAtomic) {
                fetch(`/nonAtomicInNonAtomic`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    ID: obj.ID,
                    inside
                  }),
              })
                  .then((response) => response.json())
                  .then((response) => {
                    })
                      .catch((e) => {
                        console.log(e);
                        alert("A server error occurred");
                    });
              }

              if (is_stock && stock_status) {
                fetch(`/stockObjects`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    ID: obj.ID,
                    stockStatus: stock_status
                  }),
              })
                  .then((response) => response.json())
                  .then((response) => {

                  }).catch((e) => {
                    console.log(e);
                    alert("A server error occurred");
                });
              }
          } 
          else {
              alert("Error while creating new Object!");
              window.location.reload();
          }
      })
      .catch((e) => {
          console.log(e);
          alert("A server error occurred");
          window.location.reload();
      });
}

function createNewSpace(name, isPrivate) {
  const obj = {
    name,
    ID: "SP-" + addNum(), 
    owner: activeUser.email, 
    isPersonal: isPrivate ? 1 : 0
};
    fetch(`/nonAtomicObjects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
    })
        .then((response) => response.json())
        .then((response) => {
            if (response.data) {
                nonAtomicObjects.push(obj);

                fetch(`/spaces`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(obj),
                })
                    .then((response) => response.json())
                    .then((response) => {
                        if (response.data) {
                            spaces.push(space);
                            alert("החלל נוצר בהצלחה!");
                            location.href = "personal_area.html";
                        }
                        else {
                            alert("Error while creating new space!");
                            window.location.reload();
                        }
                    })
                    .catch((e) => {
                        console.log(e);
                        alert("A server error occurred");
                        window.location.reload();
                    });
            } 
            else {
                alert("Error while creating new nonAtomicObject!");
                window.location.reload();
            }
        })
        .catch((e) => {
            console.log(e);
            alert("A server error occurred");
            window.location.reload();
        });
}

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
    if(''+fatherID==''+nonAtomicInNonAtomic[i].inside){
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
    if(activeObjectsList[i].name?.includes(objectName)){
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