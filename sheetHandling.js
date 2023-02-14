const sheetAddBtn = document.querySelector(".sheet-add-btn");
const sheetFolderCont = document.querySelector(".sheet-folder-cont");
sheetAddBtn.addEventListener("click", (e) => {
  const sheet = document.createElement("div");
  sheet.className = "sheet-folder";

  let allSheetFolder = document.querySelectorAll(".sheet-folder");
  sheet.id = allSheetFolder.length;

  sheet.innerHTML = `
  <div class="sheet-content">Sheet${allSheetFolder.length + 1}</div>
  `;
  sheetFolderCont.appendChild(sheet);
  createSheetDB();
  createGraphComponent();
  handleSheetActiveness(sheet);
  sheet.click();
});

function createSheetDB() {
  let sheetDB = [];
  for (let i = 0; i < row; i++) {
    //100
    let sheetRow = [];
    for (let j = 0; j < col; j++) {
      // 26
      //  2600
      let cellProp = {
        boldval: false,
        italicval: false,
        underlineval: false,
        alignmentval: "left",
        fontFamilyval: "monospace",
        fontSizeval: 14,
        fontColorval: "#000000",
        cellColorval: "#dfe4ea", //just for indication propose
        value: "", // to store data of cell
        formulaval: "", // store thr formula of that
        childcells: [],
      };
      sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow);
  }
  collectedSheetDB.push(sheetDB);
  // console.log(collectedSheetDB);
}

function createGraphComponent() {
  let graphComponentMatrix = [];

  for (let i = 0; i < row; i++) {
    let Row = [];
    for (let j = 0; j < col; j++) {
      let arr = [];
      Row.push(arr);
    }
    graphComponentMatrix.push(Row);
  }
  collectedGraphComponent.push(graphComponentMatrix);
  // console.log(collectedGraphComponent);
}

function handleSheetActiveness(sheet) {
  sheet.addEventListener("click", (e) => {
    let sheetIdx = +sheet.getAttribute("id");
    handleSheetDB(sheetIdx);
   
    console.log(collectedSheetDB)
   
    // handleSheetProp();
    handleSheetUI(sheet);
  });
}

function handleSheetUI(sheet) {
  let allSheetFolder = document.querySelectorAll(".sheet-folder");
  for (let i = 0; i < allSheetFolder.length; i++) {
    allSheetFolder[i].style.backgroundColor = "transparent";
  }
  sheet.style.backgroundColor = "#10ac84";
}

function handleSheetDB(sheetIdx) {
  sheetDB = collectedSheetDB[sheetIdx];
  graphComponentMatrix = collectedGraphComponent[sheetIdx];
}

function handleSheetProp() {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      let cell = document.querySelector(`.cell[row = "${i}"][col = "${j}"]`);
      cell.click();
    }
  }
  let firstCell = document.querySelector(".cell")
  firstCell.click();
}
