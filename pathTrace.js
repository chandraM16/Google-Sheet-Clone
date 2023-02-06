function isGraphCyclicTracePath(graphComponentMatrix, cycleResponce) {
  let [srow, scol] = cycleResponce;
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

  //   for (let i = 0; i < row; i++) {
  //     for (let j = 0; j < col; j++) {
  //       if (visited[i][j] == false) {
  //         let responce = dfsCycleDetectionTracePath(
  //           graphComponentMatrix,
  //           i,
  //           j,
  //           visited,
  //           dfsVisited
  //         );
  //         if (responce) {
  //           return true;
  //         }
  //       }
  //     }
  //   }
  let responce = dfsCycleDetectionTracePath(
    graphComponentMatrix,
    srow,
    scol,
    visited,
    dfsVisited
  );
  if (responce) {
    return true;
  }
  return false;
}

function dfsCycleDetectionTracePath(
  graphComponentMatrix,
  i,
  j,
  visited,
  dfsVisited
) {
  visited[i][j] = true;
  dfsVisited[i][j] = true;

  let cell = document.querySelector(`.cell[row = "${i}"][col = "${j}"]`);
  setTimeout(() => {
    cell.style.backgroundColor = "lightblue";
  }, 1000);
  for (
    let children = 0;
    children < graphComponentMatrix[i][j].length;
    children++
  ) {
    let [childRowID, childColID] = graphComponentMatrix[i][j][children];
    if (visited[childRowID][childColID] == false) {
      let responce =
        (graphComponentMatrix, childRowID, childColID, visited, dfsVisited);
      if (responce == true) {
        setTimeout(() => {
          cell.style.backgroundColor = "transparent";
          // cell.style.backgroundColor = "lightblue";
        }, 1000);
        return true;
      }
    } else if (
      visited[childRowID][childColID] &&
      dfsVisited[childRowID][childColID]
    ) {
      let cyclicCell = document.querySelector(
        `.cell[row = "${childRowID}"][col = "${childColID}"]`
      );
      setTimeout(() => {
        // cell.style.backgroundColor = "lightblue";
        cyclicCell.style.backgroundColor = "lightsalmon";
      }, 1000);
      cyclicCell.style.backgroundColor = "transparent";
      return true;
    }
  }

  dfsVisited[i][j] = false;
  return false;
}
