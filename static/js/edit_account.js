const editAccountForm = document.querySelector('#editAccountForm');
const name = document.querySelector('#userName');
const password = document.querySelector('#newPassword');
const verification = document.querySelector('#verifyPassword');
const msg = document.querySelector('.msg');

const validEditAccount = (e) => {
    e.preventDefault();
    if(name.value==='' && password.value==='' && verification.value===''){
        msg.innerHTML="יש לעדכן לפחות את השם או את הסיסמה כדי לבצע עדכון של נתונים";
        msg.classList.add('error');
        setTimeout(() => {
            msg.innerHTML='';
            msg.classList.remove('error');
        }, 4000);
    }else if(password.value.length < 6 && password.value.length > 0){
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
        msg.innerHTML="מעדכן שינויים";
        msg.classList.add('success');
        setTimeout(() => {
            msg.innerHTML='';
            msg.classList.remove('success');
        }, 4000);
        updateUser(activeUser.email, password.value, name.value);
        location.href = "personal_area.html";
    }
}
editAccountForm.addEventListener('submit', validEditAccount);




let e = document.getElementById('back-link');
e.setAttribute('href', document.referrer);
e.onclick = () => {
  history.back();
  return false;
}

let c = document.getElementById('cancel_btn');
c.setAttribute('href', document.referrer);
c.onclick = () => {
   history.back();
   return false;
}

