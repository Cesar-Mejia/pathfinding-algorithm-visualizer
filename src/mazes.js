import { calculateAdjacentNodes } from './algorithms'

export function borderNodes(nodes, totalRows, totalCols) {
  let borderNodes = []
  for (let node in nodes) {
    if (
      nodes[node].row === 1 ||
      nodes[node].col === totalCols ||
      nodes[node].row === totalRows ||
      nodes[node].col === 1
    )
      borderNodes.push(node)
  }
  return borderNodes
}

export function recursiveBacktracking(nodes, totalRows, totalCols) {
  // let result = []
  // let visited = {}
  // let shortestPath = []
  // function dfs(vertex) {
  //   result.push(vertex)

  //   visited[vertex] = true

  //   let adjacentNodes = calculateAdjacentNodes(vertex, nodes, totalRows, totalCols)
  //   let unvisitedAdjacentNodes = adjacentNodes.filter(node => !visited[node])
  //   if (unvisitedAdjacentNodes.length) shortestPath.push(vertex)

  //   unvisitedAdjacentNodes.forEach(neighbor => {
  //     if (!visited[neighbor]) {
  //       dfs(neighbor)
  //     }
  //   })
  // }
  // dfs('r2c2')
  // return result

  let border = borderNodes(nodes, totalRows, totalCols)
  let stack = []
  let start = 'r2c2'
  let visited = {}
  let path = []

  visited[start] = true
  stack.push(start)

  while (stack.length) {
    let current = stack.pop()
    path.push(current)

    let adjacentNodes = calculateAdjacentNodes(current, nodes, totalRows, totalCols)
    let unvisitedAdjacentNodes = adjacentNodes.filter(node => !visited[node])
    unvisitedAdjacentNodes = unvisitedAdjacentNodes.filter(node => !path.includes(node))

    if (unvisitedAdjacentNodes.length) {
      stack.push(current)
      let chosenCell = unvisitedAdjacentNodes[0]
      path.push(chosenCell)
      visited[chosenCell] = true
      stack.push(chosenCell)
    }
  }
  let wallNodes = []

  for (let node in nodes) {
    if (!path.includes(node)) wallNodes.push(node)
  }
  return path
}

export function randomWallNodes(nodes, totalRows, totalCols) {
  let border = borderNodes(nodes, totalRows, totalCols)
  let count = 0
  let wallNodes = []
  for (let node in nodes) {
    let randomNum = Math.floor(Math.random() * 10)
    if (randomNum > 7 && !nodes[node].isStartNode && !nodes[node].isEndNode) {
      count = 0
      wallNodes.push(node)
    }
    count++
  }
  return border.concat(wallNodes)
}
