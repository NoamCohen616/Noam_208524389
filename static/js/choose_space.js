let e = document.getElementById('back-link');
e.setAttribute('href', document.referrer);
e.onclick = () => {
  history.back();
  return false;
}

const joinSpaceWindowStyle = document.getElementById("join-space-window").style;
const addSpaceStyle = document.getElementById("add-space").style;
const createSpaceWindowStyle = document.getElementById("create-space-window").style;
const joinSpaceInput = document.getElementById("input_space_id");
const activeUser = JSON.parse((window.localStorage['activeUser']));


document.getElementById("join-space").onclick = () => {
  makeVisible(joinSpaceWindowStyle);
  makeInvisible(addSpaceStyle);
}
document.getElementById("exit_join-space-window").onclick = () => {
  makeVisible(addSpaceStyle);
  makeInvisible(joinSpaceWindowStyle);
}
document.getElementById("create-new-space").onclick = () => {
  makeVisible(createSpaceWindowStyle);
  makeInvisible(addSpaceStyle);
}
document.getElementById("exit_create-space-window").onclick = () => {
  makeVisible(addSpaceStyle);
  makeInvisible(createSpaceWindowStyle);
}

document.getElementById('sendRequest').onclick = () => {
  const request = sendJoinRequest(joinSpaceInput.value);
  if(request){
    alert("הבקשה נשלחה בהצלחה!");
  }else{
    alert("בקשה לא תקינה: לא ניתן לשלוח בקשה עם הקלט שהוזן");
  }
}

const createSpaceForm = document.querySelector('#create-space-form');
const spaceName = document.querySelector('#newSpaceName');
//const isPrivateSpace = document.querySelector('#isPrivateSpace');
const msg = document.querySelector('.msg');
const activeObjectsList = JSON.parse((window.localStorage['activeObjectsList']));


const validSpaceCreation = (e) => {
  e.preventDefault();
  if(spaceName.value===''){
    msg.innerHTML="יש להזין שם לחלל";
    msg.classList.add('error');
    setTimeout(() => {
      msg.innerHTML='';
      msg.classList.remove('error');
    }, 4000);
  }else if(itemNameExists(spaceName.value)){
    msg.innerHTML="כבר קיים אצלך חלל עם אותו שם, יש להזין שם חדש כדי לא להתבלבל";
    msg.classList.add('error');
    setTimeout(() => {
      msg.innerHTML='';
      msg.classList.remove('error');
    }, 4000);
  }else{
    msg.innerHTML="יוצר חלל חדש";
    msg.classList.add('success');
    setTimeout(() => {
      msg.innerHTML='';
      msg.classList.remove('success');
    }, 4000);
    /*createNewSpace(spaceName, isPrivateSpace.checked);*/
    location.href = "personal_area.html";
    alert("החלל נוצר בהצלחה!");
  }
}
createSpaceForm.addEventListener('submit', validSpaceCreation);