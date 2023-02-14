const signUpForm = document.querySelector('#signup-user');
const name = document.querySelector('#userName');
const email = document.querySelector('#newUserEmail');
const password = document.querySelector('#signUpPassword');
const verification = document.querySelector('#signUpVerificationPassword');
const msg = document.querySelector('.msg');

let e = document.getElementById('back-link');
e.setAttribute('href', document.referrer);
e.onclick = () => {
  history.back();
  return false;
}

const validSignUp = (e) => {
    e.preventDefault();
    if(name.value==='' || email.value==='' || password.value==='' || verification.value===''){
        msg.innerHTML="יש למלא את כל השדות המסומנים בכוכבית";
        msg.classList.add('error');
        setTimeout(() => {
            msg.innerHTML='';
            msg.classList.remove('error');
        }, 4000);
    }else if(emailExists(email.value)){
        msg.innerHTML="המייל שהוזן כבר קיים במערכת";
        msg.classList.add('error');
        setTimeout(() => {
            msg.innerHTML='';
            msg.classList.remove('error');
        }, 4000);
    }else if(password.value.length < 6){
        msg.innerHTML="הסיסמה חייבת להכיל שישה תווים לכל הפחות";
        msg.classList.add('error');
        setTimeout(() => {
            msg.innerHTML='';
            msg.classList.remove('error');
        }, 4000);
    }else if(password.value !== verification.value){
        msg.innerHTML="הסיסמאות אינן תואמות";
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
        createNewUser(email.value, password.value, name.value);
    }
}
signUpForm.addEventListener('submit', validSignUp);