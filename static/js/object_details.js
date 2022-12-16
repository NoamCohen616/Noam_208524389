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
