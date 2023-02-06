// storage - 2D array
let graphComponentMatrix = [];

for (let i = 0; i < row; i++) {
  let Row = [];
  for (let j = 0; j < col; j++) {
    // Why array -> More than one child relation(dependance)
    let arr = [];
    Row.push(arr);
  }
  graphComponentMatrix.push(Row);
}

// true - > cyclic
// false -> not cyclic
function isGraphCyclic(graphComponentMatrix) {
  // dependency -> visited, dfsVisited
  let visited = [];
  let dfsVisited = [];
  for (let i = 0; i < row; i++) {
    let visitedRow = [];
    let dfsVisitedRow = [];
    for (let j = 0; j < col; j++) {
      visitedRow.push(false);
      dfsVisitedRow.push(false);
    }
    visited.push(visitedRow);
    dfsVisited.push(dfsVisitedRow);
  }

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (visited[i][j] == false) {
        let response = dfsCycleDetection(
          graphComponentMatrix,
          i,
          j,
          visited,
          dfsVisited
        );
        if (response) {
          return [i, j];
        }
      }
    }
  }

  return null;
}

//Start -> visited = true, dfsvisited = true
//End -> dfsvisited = false;
// cycle detection condition -> if(visited[i][j] == true && dfsvisited[i][j] == ture)
// return value is boolean
function dfsCycleDetection(graphComponentMatrix, i, j, visited, dfsVisited) {
  visited[i][j] = true;
  dfsVisited[i][j] = true;
  for (
    let children = 0;
    children < graphComponentMatrix[i][j].length;
    children++
  ) {
    let [childRowID, childColID] = graphComponentMatrix[i][j][children];
    if (visited[childRowID][childColID] == false) {
      let response = dfsCycleDetection(
        graphComponentMatrix,
        childRowID,
        childColID,
        visited,
        dfsVisited
      );
      if (response == true) {
        return true;
        // Found the cycle so return true immediately, no need to explore more path
      }
    } else if (
      visited[childRowID][childColID] &&
      dfsVisited[childRowID][childColID]
    ) {
      return true;
    }
  }

  dfsVisited[i][j] = false;
  return false;
}
