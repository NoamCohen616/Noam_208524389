const loginForm = document.querySelector('#login-user');
const email = document.querySelector('#userEmail');
const password = document.querySelector('#userPassword');
const msg = document.querySelector('.msg');

window.onload = () =>{
  window.localStorage['activeUser'] = null;
  window.localStorage['activeUserSpacesList'] = JSON.stringify([]);
  window.localStorage['activeNonAtomicObjectsList'] = JSON.stringify([]);
  window.localStorage['activeObjectsList'] = JSON.stringify([]);
  window.localStorage['activeAtomicObjectsList'] = JSON.stringify([]);
  window.localStorage['activeStockObjectsList'] = JSON.stringify([]);
  window.localStorage['activeUserAlerts'] = JSON.stringify([]);
  window.localStorage['activeSharingRequests'] = JSON.stringify([]);
  window.localStorage['activeObjectStatusUpdates'] = JSON.stringify([]);
  window.localStorage['activeUser'] = null;
  window.localStorage['currentObject'] = null;
}

const validLogin = (e) => {
  e.preventDefault();
  if(email.value==='' || password.value===''){
    msg.innerHTML="יש למלא את כל השדות המסומנים בכוכבית";
    msg.classList.add('error');
    setTimeout(() => {
      msg.innerHTML='';
      msg.classList.remove('error');
    }, 4000);
  }else if(!emailExists(email.value) || !emailMatchesPassword(email.value, password.value)){
    msg.innerHTML="המייל או הסיסמה שהוזנו אינם תקינים";
    msg.classList.add('error');
    setTimeout(() => {
      msg.innerHTML='';
      msg.classList.remove('error');
    }, 4000);
  }else{
    msg.innerHTML="מתחבר";
    msg.classList.add('success');
    setTimeout(() => {
      msg.innerHTML='';
      msg.classList.remove('success');
    }, 4000);

    user = currentUser(email.value);
    window.localStorage['activeUser'] = JSON.stringify(user);

    userSpacesList = getSharedSpaces(email.value);
    window.localStorage['activeUserSpacesList'] = JSON.stringify(userSpacesList);

    nonAtomicObjectsList = getUserNonAtomicObjects(email.value);
    window.localStorage['activeNonAtomicObjectsList'] = JSON.stringify(privacyFilter(user, nonAtomicObjectsList));

    objectsList = getAllSharedObjects(userSpacesList);
    window.localStorage['activeObjectsList'] = JSON.stringify((objectsList));

    atomicObjectsList = getAllAtomicDescendants(nonAtomicObjectsList);
    window.localStorage['activeAtomicObjectsList'] = JSON.stringify(privacyFilter(user, atomicObjectsList));

    stockObjectsList = getStockObjectsList(atomicObjectsList);
    window.localStorage['activeStockObjectsList'] = JSON.stringify(privacyFilter(user, stockObjectsList));

    location.href = "/personal_area";
  }
}
loginForm.addEventListener('submit', validLogin);
