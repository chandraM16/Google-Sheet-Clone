let row = 100;
let col = 26;

let addressColCont = document.querySelector(".address-no-cont");
let addressRowCont = document.querySelector(".address-row-cont");
let cellsCont = document.querySelector(".cells-cont");
let addressBar = document.querySelector(".address-bar");
console.log(cellsCont);

// adding the 100 row
for (let i = 0; i < row; i++) {
  let addressCol = document.createElement("div");
  addressCol.setAttribute("class", "address-col");
  addressCol.innerText = i + 1;
  addressColCont.appendChild(addressCol);
}

//adding the 26 col
for (let i = 0; i < col; i++) {
  let addressRow = document.createElement("div");
  addressRow.setAttribute("class", "address-row");
  addressRow.innerText = String.fromCharCode(65 + i);
  addressRowCont.appendChild(addressRow);
}

// adding the cells
for (let i = 0; i < row; i++) {
  let rowCont = document.createElement("div");
  rowCont.setAttribute("class", "rowCont");
  for (let j = 0; j < col; j++) {
    let cell = document.createElement("div");
    cell.setAttribute("class", "cell");
    cell.setAttribute("contenteditable", "true");
    cell.setAttribute("spellcheck", "false");

    // Attribute for cell row and col storage identification
    cell.setAttribute("row", i);
    cell.setAttribute("col", j);
    rowCont.appendChild(cell);
    addressBarDisplay(cell, i, j);
  }
  cellsCont.appendChild(rowCont);
}

//addressing the cell
function addressBarDisplay(cell, i, j) {
  cell.addEventListener("click", (e) => {
    let rowId = i + 1;
    let colId = String.fromCharCode(65 + j);
    addressBar.value = `${colId}${rowId}`;
  });
}

//by defaulr click 

