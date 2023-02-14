let e = document.getElementById('back-link');
e.setAttribute('href', document.referrer);
e.onclick = () => {
  history.back();
  return false;
}

const table = document.getElementById('stock_tbl');
if (table) {
  let html = ``;
  for (let i=0; i<activeStockObjectsList?.length; i++) {
    let atomic, nonAtomic = undefined;
    const obj = activeStockObjectsList[i];
    console.log(obj);
    atomic = activeAtomicObjectsList.find(i => i.ID == obj.ID);
    nonAtomic = activeNonAtomicObjectsList.find(i => i.ID == obj.ID);


    if (atomic || nonAtomic) {
      html += `
        <span class="yellow_cell">${atomic?.name || nonAtomic?.name}</span>
        <span class="yellow_cell">${atomic ? activeObjectsList.find(i => i.ID == atomic.inside)?.name : ''}</span>
        <span class="yellow_cell">${obj.stockStatus}</span>
        <span></span>
      `;
    }
  }

  table.innerHTML += html;
}