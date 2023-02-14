let backLink = document.getElementById('back-link');
backLink.setAttribute('href', document.referrer);
backLink.onclick = () => {

  history.back();
  return false;
}

const editItemWindowStyle = document.getElementById("edit-item-window").style;
const nonAtomicZoneStyle = document.getElementById("non-atomic-zone").style;

document.getElementById("edit-item").onclick = () =>{
  isChecked();
  makeVisible(editItemWindowStyle);
  makeInvisible(nonAtomicZoneStyle);
}

document.getElementById("exit_edit-item-form").onclick = () =>{
  makeInvisible(editItemWindowStyle);
  makeVisible(nonAtomicZoneStyle);
}
document.getElementById("atomic").onclick = () => isChecked();
document.getElementById("non-atomic").onclick = () => isChecked();
document.getElementById("is-stock").onclick = () => isChecked();



window.onload= () => {
  setTimeout(() => {
    currentObject = JSON.parse((window.localStorage['currentObject']));
    const objectTitle = document.querySelector('#non-atomic-title');
    objectTitle.innerHTML=currentObject.name;
    const objectsContainerNonAtomic = document.querySelector('#objects-placer-non-atomic');
    const spaceID = document.querySelector('#object_id');
    if (!isSpaceType(currentObject.ID)){
      spaceID.style.visibility = "hidden";
    }else{
      spaceID.innerHTML = `מזהה:  ${currentObject.ID}`;
    }
    // let father = document.createElement('a');
    // if(getFather(currentObject.ID) !== null){
    //   father.id = getFather(currentObject.ID).id;
    //   father.className = "object";
    //   father.href = "non_atomic_zone.html";
    //   father.innerHTML =`אובייקט אב: ${getFather(currentObject.ID).name}`;
    //   father.style.backgroundColor = "#FFEFEB";
    //   objectsContainerNonAtomic.appendChild(father);
    //   father.onclick = () => {
    //     let currentObject = getObject(father.id);
    //     window.localStorage['currentObject'] = JSON.stringify(currentObject);
    //   };
    // }
    const nonAtomicChildren = privacyFilter(activeUser.email, getNonAtomicChildren(currentObject.ID));
    if(nonAtomicChildren.length>0){
      for (let i=0; i<nonAtomicChildren.length; i++){
        let object = document.createElement('a');
        object.href = "/non_atomic_zone";
        object.id = `${nonAtomicChildren[i].ID}`;
        object.className = "object";
        object.innerHTML = `${nonAtomicChildren[i].name}`;
        objectsContainerNonAtomic.appendChild(object);
        object.onclick = () => {
          let objectClicked = getObject(object.id);
          window.localStorage['currentObject'] = JSON.stringify(objectClicked);
        }
      }
    }
    const atomicChildren = getAtomicChildren(currentObject.ID);
    if(atomicChildren.length>0){
      for (let i=0; i<atomicChildren.length; i++){
        let atomicObject = document.createElement('a');
        atomicObject.href = "/object_details";
        atomicObject.id = `${atomicChildren[i].ID}`;
        atomicObject.className = "object";
        atomicObject.style.backgroundColor = "#B5D7FF";
        atomicObject.innerHTML = `${atomicChildren[i].name}`;
        objectsContainerNonAtomic.appendChild(atomicObject);
        atomicObject.onclick = () => {
          let currentObject = getObject(atomicObject.id);
          window.localStorage['currentObject'] = JSON.stringify(currentObject);
        };
      }
    }
    const containers = document.getElementById("selectContainer");
    for(let i=0; i<activeNonAtomicObjectsList.length; i++){
      let option = document.createElement('option');
      option.value =activeNonAtomicObjectsList[i].ID;
      option.innerHTML = activeNonAtomicObjectsList[i].name;
      containers.appendChild(option);
    }
  }, 300);
}