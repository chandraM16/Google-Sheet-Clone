async function isGraphCyclicTracePath(graphComponentMatrix, cycleResponse) {
  let [srow, scol] = cycleResponse;
  let visited = [];
  let dfsVisited = [];
  let row = 100;
  let col = 26;
  console.log(1);
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

  let response = await dfsCycleDetectionTracePath(
    graphComponentMatrix,
    srow,
    scol,
    visited,
    dfsVisited
  );
  if (response) {
    return new Promise((resolve) => resolve(true));
  }
  return new Promise((resolve) => resolve(false));
}

async function dfsCycleDetectionTracePath(
  graphComponentMatrix,
  i,
  j,
  visited,
  dfsVisited
) {
  visited[i][j] = true;
  dfsVisited[i][j] = true;

  let cell = document.querySelector(`.cell[row = "${i}"][col = "${j}"]`);
  cell.style.backgroundColor = "lightblue";
  await colorDelay();
  for (
    let children = 0;
    children < graphComponentMatrix[i][j].length;
    children++
  ) {
    let [childRowID, childColID] = graphComponentMatrix[i][j][children];
    if (visited[childRowID][childColID] == false) {
      let response = await dfsCycleDetectionTracePath(
        graphComponentMatrix,
        childRowID,
        childColID,
        visited,
        dfsVisited
      );
      if (response == true) {
        cell.style.backgroundColor = "transparent";
        await colorDelay();
        return new Promise((resolve) => resolve(true));
      }
    } else if (
      visited[childRowID][childColID] &&
      dfsVisited[childRowID][childColID]
    ) {
      let cyclicCell = document.querySelector(
        `.cell[row = "${childRowID}"][col = "${childColID}"]`
      );
      cyclicCell.style.backgroundColor = "lightsalmon";
      await colorDelay();

      cyclicCell.style.backgroundColor = "transparent";
      await colorDelay();

      cell.style.backgroundColor = "transparent";
      await colorDelay();
      return new Promise((resolve) => resolve(true));
    }
  }

  dfsVisited[i][j] = false;
  return new Promise((resolve) => resolve(false));
}

function colorDelay() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}
