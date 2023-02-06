//to store the data of the cell we will use "value" key in sheetDB
// to do this we will use blur and focus event listener on every cell
// read one Note

/// get access of the cells
for (let i = 0; i < row; i++) {
  for (let j = 0; j < col; j++) {
    let cell = document.querySelector(`.cell[row = "${i}"][col = "${j}"]`);
    // blur- we you move mouse from one element then it store the reference of that element
    cell.addEventListener("blur", (e) => {
      let address = addressBar.value;

      // get element which blurred by moving mouse to next element
      let [activeBox, cellProp] = getCellAndCellProp(address);

      // get value enter by user
      let enteredData = activeBox.innerText;

      // store that data in sheetDB , if sheetDB has same value already then do nothing
      if (enteredData == cellProp.value) {
        return;
      }

      // update the changed value in sheetDB
      cellProp.value = enteredData;

      // if data modifies remove Parent - Child relation , formula empty update children
      removeChildFromParent(cellProp.formulaval);
      cellProp.formulaval = "";
      updateChildCell(address);
    });
  }
}

let formulaBar = document.querySelector(".formula-bar");

formulaBar.addEventListener("keydown", async (e) => {
  // get formula
  let formulaBarInput = formulaBar.value;

  // if "enter" key is pressed then do further action
  if (e.key == "Enter" && formulaBarInput) {
    let address = addressBar.value;
    let [cell, cellprop] = getCellAndCellProp(address);

    // If formula changes then break parent ad child relation and form new parent child relation
    if (formulaBarInput !== cellprop.formulaval) {
      removeChildFromParent(cellprop.formulaval);
    }

    // add child to graph component
    addChildToGraphComponent(formulaBarInput, address);
    // check that is there any cycle in parent an child
    // check formula is cylic or not , if it is not cyclic then only evaluate
    // true - > cyclic
    // false -> not cyclic

    let cycleResponse = isGraphCyclic(graphComponentMatrix);
    if (cycleResponse) {
      alert("Your Formula Is Cyclic");
      // return;
      let response = confirm(
        "Your Formula is Cyclic, Do you want to trace your path?"
      );
      while (response === true) {
        // keep on tracking color until user is satisfied
        await isGraphCyclicTracePath(graphComponentMatrix, cycleResponse);
        response = confirm(
          "Your Formula is Cyclic, Do you want to trace your path?"
        );
      }
      removeChildFromGraphComponent(formulaBarInput, address);
      return;
    }

    // Evaluate the given formula
    let evaluatedValue = evaluateFormula(formulaBarInput);

    // update evaluatedValue in cell and cellprop
    // store the formula for cell in cellprop
    setCellAndCellPropFormulaNValue(evaluatedValue, formulaBarInput, address);

    // to know which cell depend on which cell , we must update and maintain the "childcells" array of each cell this will help us to find cycle of formula

    addChildToParent(formulaBarInput);

    // to update cells which are depend on "this" cell, we are going to use a recursion function
    updateChildCell(address);
  }
});

//we have to add this child to graph matrix in child's parent location
function addChildToGraphComponent(formula, childAddress) {
  // get child's row and col
  let [childRowID, childColID] = giverowIDColID(childAddress);

  // split the formula text and find parent address
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      // get parent' row and col
      let [parentRowID, parentColID] = giverowIDColID(encodedFormula[i]);
      // B1: A1 + 10;

      // now child' row and col at parent row and col location
      graphComponentMatrix[parentRowID][parentColID].push([
        childRowID,
        childColID,
      ]);
    }
  }
}

function removeChildFromGraphComponent(formula, childAddress) {
  let [childRowID, childColID] = giverowIDColID(childAddress);
  let encodesFormula = formula.split(" ");
  for (let i = 0; i < encodesFormula.length; i++) {
    let asciiValue = encodesFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [parentRowID, parentColID] = giverowIDColID(encodesFormula[i]);
      // B1: A1 + 10;
      graphComponentMatrix[parentRowID][parentColID].pop();
      // pop() remove last element
    }
  }
}

// Remove all this Child from Parent using old formula text
function removeChildFromParent(formulaText) {
  let childAddress = addressBar.value;

  // console.log(childAddress);
  let formulaTextArr = formulaText.split(" ");
  for (let i = 0; i < formulaTextArr.length; i++) {
    let asciiValue = formulaTextArr[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      // console.log(formulaTextArr[i]);
      let [parentCell, parentCellprop] = getCellAndCellProp(formulaTextArr[i]);
      let idx = parentCellprop.childcells.indexOf(childAddress);
      parentCellprop.childcells.splice(idx, 1);
      // console.log(`${childAddress} is removed from ${formulaTextArr[i]}`);
    }
  }
}

// It will Evaluate the formula Text
function evaluateFormula(formulaText) {
  // formula can contain a mathematical formula or cell relation formula .
  // To find out whether it is a relational formula or not  we need to split the formula

  // A1 + C1 + 10 (for sample)

  let formulaTextArr = formulaText.split(" ");
  // [A1, +, C1, +, 10]

  for (let i = 0; i < formulaTextArr.length; i++) {
    let asciiValue = formulaTextArr[i].charCodeAt(0);
    // A

    // check is asciiValue  between  A and Z
    if (asciiValue >= 65 && asciiValue <= 90) {
      // mean "formulaTextArr[i]" is cell Address
      let [parentCell, parentCellprop] = getCellAndCellProp(formulaTextArr[i]);

      // get value of parentCell
      if (parentCellprop.value) {
        // update the value of parent cell in formula text
        formulaTextArr[i] = parentCellprop.value;
      } else {
        formulaTextArr[i] = "0";
      }
    }
  }

  // get new updated formula for evaluation
  let decodedFormula = formulaTextArr.join(" ");

  return eval(decodedFormula);
}

// it will update the cell and cellProp with formula and its evaluated value
function setCellAndCellPropFormulaNValue(evaluatedValue, formula, address) {
  let [cell, cellprop] = getCellAndCellProp(address);
  cell.innerText = evaluatedValue;
  cellprop.value = evaluatedValue;
  cellprop.formulaval = formula;
  console.log(`${address} is updated with formula and value`);
}

// Add This cell in its parent cell
function addChildToParent(formulaText) {
  let childAddress = addressBar.value;
  let formulaTextArr = formulaText.split(" ");
  for (let i = 0; i < formulaTextArr.length; i++) {
    let asciiValue = formulaTextArr[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [cell, parentCellprop] = getCellAndCellProp(formulaTextArr[i]);
      parentCellprop.childcells.push(childAddress);
      // console.log(
      //   `${childAddress} is added to its ${formulaTextArr[i]} parent`
      // );
      // console.log(`${formulaTextArr[i]} -> ${parentCellprop.childcells}`);
    }
  }
}

// Recursion Function to Update child cell of "this cell"
function updateChildCell(parentAddress) {
  //1st get parent cellProp
  let [parentCell, parentCellProp] = getCellAndCellProp(parentAddress);

  // 2nd - get access the children arr of parent cell which store all cell who are depend on this cell
  let children = parentCellProp.childcells;

  // 3rd - loop over them
  for (let i = 0; i < children.length; i++) {
    // get child address
    const childAddress = children[i];

    let [childCell, childCellPorp] = getCellAndCellProp(childAddress);

    // get child formula
    let childFormula = childCellPorp.formulaval;

    // evaluate the child formula again
    let evaluatedValue = evaluateFormula(childFormula);

    // update UI and sheetDB
    setCellAndCellPropFormulaNValue(evaluatedValue, childFormula, childAddress);

    // recursive call for its child cells
    updateChildCell(childAddress);
  }
}
