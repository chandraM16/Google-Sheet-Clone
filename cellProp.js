//storage
let collectedSheetDB = [];
// /*Here we are going to use two way binding for store and update the cell. We are going to create a matrix with 100 row and 26 col for our cells ("sheetBD") . This sheetDB is going to store all  property of cell . When user changes any prop of cell then we will update that cell in sheetDb as well as in UI*/
// let sheetDB = [];

{
  const sheetAddBtn = document.querySelector(".sheet-add-btn");
  sheetAddBtn.click();
  console.log(90)
  handleSheetProp();
}
// for (let i = 0; i < row; i++) {
//
//   let sheetRow = [];
//   for (let j = 0; j < col; j++) {
//     let cellProp = {
//       boldval: false,
//       italicval: false,
//       underlineval: false,
//       alignmentval: "left",
//       fontFamilyval: "monospace",
//       fontSizeval: 14,
//       fontColorval: "#000000",
//       cellColorval: "#dfe4ea", //just for indication propose
//       value: "", // to store data of cell
//       formulaval: "", // store thr formula of that
//       childcells: [],
//     };
//     sheetRow.push(cellProp);
//   }
//   sheetDB.push(sheetRow);
// }

//selectors for cell properties
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let alignment = document.querySelectorAll(".alignment");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];
let fontSize = document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-prop");
let fontColor = document.querySelector(".font-color-prop");
let cellColor = document.querySelector(".cell-color-prop");

// variable for storing the color
let activePropColor = "#8395a7";
let inActivePropColor = "#c8d6e5";

//bold Property
bold.addEventListener("click", (e) => {
  // find the cell on which  user click
  // to find the cell we will use address-bar
  let addressBarVal = addressBar.value; // return string
  if (addressBarVal == "") {
    addressBarVal = "A1"; // default cell will be A1
  }

  // pass the cell address to "getCellAndCellProp" function to get cell from UI and SheetDB
  let [cell, cellProp] = getCellAndCellProp(addressBarVal);

  //toggle the bold prop in sheetDB storage. if it is on turn off vise vasa
  cellProp.boldval = !cellProp.boldval;

  // change the property in dom/UI
  cell.style.fontWeight = cellProp.boldval ? "bold" : "normal";

  // change/toggle the background color of cellProp
  bold.style.backgroundColor = cellProp.boldval
    ? activePropColor
    : inActivePropColor;
  console.log(`Bold Task is done for ${addressBarVal}`);
});

//same function for Italic CellProp
//Italic Prop
italic.addEventListener("click", (e) => {
  let addressBarVal = addressBar.value; // return string
  if (addressBarVal == "") {
    addressBarVal = "A1";
  }
  let [cell, cellProp] = getCellAndCellProp(addressBarVal);
  cellProp.italicval = !cellProp.italicval;
  cell.style.fontStyle = cellProp.italicval ? "italic" : "normal";
  italic.style.backgroundColor = cellProp.italicval
    ? activePropColor
    : inActivePropColor;
  console.log(`Italic Task is done for ${addressBarVal}`);
});

//Underline Property
underline.addEventListener("click", (e) => {
  let addressBarVal = addressBar.value; // return string
  if (addressBarVal == "") {
    addressBarVal = "A1";
  }
  let [cell, cellProp] = getCellAndCellProp(addressBarVal);
  cellProp.underlineval = !cellProp.underlineval;
  cell.style.textDecoration = cellProp.underlineval ? "underline" : "none";
  underline.style.backgroundColor = cellProp.underlineval
    ? activePropColor
    : inActivePropColor;
  console.log(`UnderLine Task is done for ${addressBarVal}`);
});

//font size
fontSize.addEventListener("change", (e) => {
  let addressBarVal = addressBar.value; // return string
  if (addressBarVal == "") {
    addressBarVal = "A1";
  }
  let [cell, cellProp] = getCellAndCellProp(addressBarVal);
  cellProp.fontSizeval = fontSize.value;
  // console.log(cellProp);
  cell.style.fontSize = cellProp.fontSizeval + "px";
  fontSize.value = cellProp.fontSizeval;
  console.log(`Font Size Task is done for ${addressBarVal}`);
});

//font family
fontFamily.addEventListener("change", (e) => {
  let addressBarVal = addressBar.value; // return string
  if (addressBarVal == "") {
    addressBarVal = "A1";
  }
  let [cell, cellProp] = getCellAndCellProp(addressBarVal);
  cellProp.fontFamilyval = fontFamily.value;
  // console.log(cellProp);
  cell.style.fontFamily = cellProp.fontFamilyval;
  fontFamily.value = cellProp.fontFamilyval;
  console.log(`Font Family Task is done for ${addressBarVal}`);
});

//font color
fontColor.addEventListener("change", (e) => {
  let addressBarVal = addressBar.value; // return string
  if (addressBarVal == "") {
    addressBarVal = "A1";
  }
  let [cell, cellProp] = getCellAndCellProp(addressBarVal);

  //storing the color direct in sheetDB
  cellProp.fontColorval = fontColor.value;

  cell.style.color = cellProp.fontColorval;
  fontColor.value = cellProp.fontColorval;
  console.log(`Font Color Task is done for ${addressBarVal}`);
});

//cell color
cellColor.addEventListener("change", (e) => {
  let addressBarVal = addressBar.value; // return string
  if (addressBarVal == "") {
    addressBarVal = "A1";
  }
  let [cell, cellProp] = getCellAndCellProp(addressBarVal);
  cellProp.cellColorval = cellColor.value;
  // console.log(cellProp);
  cell.style.backgroundColor = cellProp.cellColorval;
  cellColor.value = cellProp.cellColorval;
  console.log(`Cell Color Task is done for ${addressBarVal}`);
});

//alignment
// we have attach alignment class on three div left, center and right we are using the for Each for add EventListener on each of them
alignment.forEach((alignEle) => {
  alignEle.addEventListener("click", (e) => {
    // get address of cell
    let addressBarVal = addressBar.value; // return string
    if (addressBarVal == "") {
      addressBarVal = "A1";
    }

    // get cell and cellProp
    let [cell, cellProp] = getCellAndCellProp(addressBarVal);

    // the 1st value in classList of each div is alignment value
    let alignValue = e.target.classList[0];
    console.log(alignValue);

    // sheetDB update
    cellProp.alignmentval = alignValue;

    // cell update
    cell.style.textAlign = cellProp.alignmentval;

    // change / Toggle BGcolor of that divs
    switch (alignValue) {
      case "left":
        leftAlign.style.backgroundColor = activePropColor;
        centerAlign.style.backgroundColor = inActivePropColor;
        rightAlign.style.backgroundColor = inActivePropColor;
        break;

      case "center":
        leftAlign.style.backgroundColor = inActivePropColor;
        centerAlign.style.backgroundColor = activePropColor;
        rightAlign.style.backgroundColor = inActivePropColor;
        break;
      case "right":
        leftAlign.style.backgroundColor = inActivePropColor;
        centerAlign.style.backgroundColor = inActivePropColor;
        rightAlign.style.backgroundColor = activePropColor;
        break;
      default:
        break;
    }
  });
});

// we have add all prop on cell and update that prop in SheetDB, Now we area going to update cell who are have the prop . Means once cell get its prop we move to next cell and when we come back to prev cell then all prop its got assign should be visible again

let allCell = document.querySelectorAll(".cell");
for (let i = 0; i < allCell.length; i++) {
  addListenerToAttachCellProperties(allCell[i]);
}

function addListenerToAttachCellProperties(cell) {
  cell.addEventListener("click", (e) => {
    let addressBarVal = addressBar.value; // return string
    if (addressBarVal == "") {
      addressBarVal = "A1";
    }
    let [c, cellProp] = getCellAndCellProp(addressBarVal);

    //apply cell Propreties
    cell.style.fontWeight = cellProp.boldval ? "bold" : "normal"; //
    cell.style.fontStyle = cellProp.italicval ? "italic" : "normal";
    cell.style.textDecoration = cellProp.underlineval ? "underline" : "none";
    cell.style.fontSize = cellProp.fontSizeval + "px";
    cell.style.fontFamily = cellProp.fontFamilyval;
    cell.style.color = cellProp.fontColorval;
    cell.style.backgroundColor = cellProp.cellColorval;
    cell.style.textAlign = cellProp.alignmentval;

    //apply property on cellprop bar
    bold.style.backgroundColor = cellProp.boldval
      ? activePropColor
      : inActivePropColor;
    italic.style.backgroundColor = cellProp.italicval
      ? activePropColor
      : inActivePropColor;
    underline.style.backgroundColor = cellProp.underlineval
      ? activePropColor
      : inActivePropColor;
    fontSize.value = cellProp.fontSizeval;
    fontFamily.value = cellProp.fontFamilyval;
    fontColor.value = cellProp.fontColorval;
    cellColor.value = cellProp.cellColorval;
    switch (cellProp.alignmentval) {
      case "left":
        leftAlign.style.backgroundColor = activePropColor;
        centerAlign.style.backgroundColor = inActivePropColor;
        rightAlign.style.backgroundColor = inActivePropColor;
        break;

      case "center":
        leftAlign.style.backgroundColor = inActivePropColor;
        centerAlign.style.backgroundColor = activePropColor;
        rightAlign.style.backgroundColor = inActivePropColor;
        break;
      case "right":
        leftAlign.style.backgroundColor = inActivePropColor;
        centerAlign.style.backgroundColor = inActivePropColor;
        rightAlign.style.backgroundColor = activePropColor;
        break;
      default:
        break;
    }
    let formulaBar = document.querySelector(".formula-bar");
    formulaBar.value = cellProp.formulaval;
    cell.value = cellProp.value;
  });
}

// abstract the cell from dom and cellProp object from sheetDB storage
function getCellAndCellProp(address) {
  /* Now Address of cell have two char , 1st is denoting col and 2nd id denoting row so we have to decode the address . For decoding we will use another function called "giverowIDColID" */

  let [rowNo, colNo] = giverowIDColID(address);
  // array structuring . it will store element index wise in declared array

  //access cell and storage object
  let cell = document.querySelector(
    `.cell[row = "${rowNo}"][col = "${colNo}"]`
  );

  // cellProp is Object which has a diff property of cell
  let cellProp = sheetDB[rowNo][colNo];

  // returning the cell and cellProp from UI and SheetDb resp.
  return [cell, cellProp];
}

//it give rowNo and colNo
function giverowIDColID(address) {
  // get a Col no.
  let colNo = address.charCodeAt(0) - 65;

  //Get a Row No.
  let rowNo = Number(address.charAt(1) - 1);

  return [rowNo, colNo];
}
