// import { calculateAdjacentNodes } from './algorithms'
import { startNode } from './algorithms'
function calculateNeighboringNodes(node, nodes, totalRows, totalCols) {
  let currentNode = nodes[node]
  let adjacentNodes = []
  let nodeAbove = `r${currentNode.row - 2}c${currentNode.col}`
  let nodeBelow = `r${currentNode.row + 2}c${currentNode.col}`
  let nodeLeft = `r${currentNode.row}c${currentNode.col - 2}`
  let nodeRight = `r${currentNode.row}c${currentNode.col + 2}`

  if (currentNode.row > 2) {
    adjacentNodes.push([nodeAbove, `r${currentNode.row - 1}c${currentNode.col}`])
  }
  if (currentNode.col <= totalCols - 2) {
    adjacentNodes.push([nodeRight, `r${currentNode.row}c${currentNode.col + 1}`])
  }
  if (currentNode.row <= totalRows - 2) {
    adjacentNodes.push([nodeBelow, `r${currentNode.row + 1}c${currentNode.col}`])
  }
  if (currentNode.col > 2) {
    adjacentNodes.push([nodeLeft, `r${currentNode.row}c${currentNode.col - 1}`])
  }
  return adjacentNodes
}

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

export function binaryTree(nodes, totalRows, totalCols) {
  let border = borderNodes(nodes, totalRows, totalCols)
  let path = []
  let wallNodes = []
  for (let node in nodes) {
    if (!border.includes(node)) {
      let adjacentNodes = []
      let nodeRight = `r${nodes[node].row}c${nodes[node].col + 1}`
      let nodeBelow = `r${nodes[node].row + 1}c${nodes[node].col}`

      if (nodes[node].col !== totalCols && !border.includes(node)) {
        adjacentNodes.push(nodeRight)
      }
      if (nodes[node].row !== totalRows && !border.includes(node)) {
        adjacentNodes.push(nodeBelow)
      }

      if (adjacentNodes.length) {
        const randomIndex = Math.floor(Math.random() * adjacentNodes.length)
        const item = adjacentNodes[randomIndex]
        path.push(item)
      }
    }
  }
  for (let node in nodes) {
    if (!path.includes(node) && !nodes[node].isStartNode && !nodes[node].isEndNode)
      wallNodes.push(node)
  }
  return border.concat(wallNodes)
}

// export function recursiveBackTracking(currentNodes, totalRows, totalCols) {
//   console.log('recursive backtracking')
//   let result = []
//   let visited = {}
//   let nodes = currentNodes
//   let start = 'r2c2'
//   let path = [start]

//   function dfs(currentNode) {
//     result.push(currentNode)
//     console.log('result', result)
//     visited[currentNode] = true

//     let adjacentNodes = calculateNeighboringNodes(currentNode, nodes, totalRows, totalCols)
//     console.log('adjacentNodes', adjacentNodes)

//     adjacentNodes.forEach(adjacentNode => {
//       console.log(adjacentNode)
//       // if (!visited[adjacentNode.node]) {
//       if (adjacentNode.nodeAbove) {
//         console.log('inside nodeAbove check')
//         console.log('adjacentNode', adjacentNode)
//         path.push(adjacentNode.nodeAbove)
//         let current = adjacentNode.nodeAbove
//         let currentNeighbors = calculateNeighboringNodes(current, nodes, totalRows, totalCols)
//         let neighborAbove = currentNeighbors.filter(neighbor => neighbor['nodeAbove'])[0].nodeAbove
//         dfs(neighborAbove)
//       }
//       if (adjacentNode.nodeBelow && !visited[adjacentNode.nodeBelow]) {
//         path.push(adjacentNode.nodeBelow)
//         let current = adjacentNode.nodeBelow
//         let currentNeighbors = calculateNeighboringNodes(current, nodes, totalRows, totalCols)
//         let neighborBelow = currentNeighbors.filter(neighbor => neighbor['nodeBelow'])[0].nodeBelow
//         dfs(neighborBelow)
//       }
//       if (adjacentNode.nodeRight && !visited[adjacentNode.nodeRight]) {
//         path.push(adjacentNode.nodeRight)
//         let current = adjacentNode.nodeRight
//         let currentNeighbors = calculateNeighboringNodes(current, nodes, totalRows, totalCols)
//         let neighborRight = currentNeighbors.filter(neighbor => neighbor['nodeRight'])[0].nodeRight
//         dfs(neighborRight)
//       }
//       if (adjacentNode.nodeLeft && !visited[adjacentNode.nodeLeft]) {
//         path.push(adjacentNode.nodeLeft)
//         let current = adjacentNode.nodeLeft
//         let currentNeighbors = calculateNeighboringNodes(current, nodes, totalRows, totalCols)
//         let neighborLeft = currentNeighbors.filter(neighbor => neighbor['nodeLeft'])[0].nodeLeft
//         dfs(neighborLeft)
//       }
//       // }
//     })
//   }
//   dfs(start)

//   let wallNodes = []
//   for (let node in nodes) {
//     if (!path.includes(node) && !nodes[node].isStartNode && !nodes[node].isEndNode)
//       wallNodes.push(node)
//   }
//   console.log('path', path)
//   return wallNodes
//   // let finishIdx = result.indexOf(finish)
//   // visitedNodes = result.slice(0, finishIdx + 1)
//   // finalPath = visitedNodes
// }

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }

  return array
}

export function recursiveBackTracking(nodes, totalRows, totalCols) {
  let border = borderNodes(nodes, totalRows, totalCols)
  let start = startNode(nodes)
  let result = []
  let stack = [start]
  let visited = {}
  let currentNode
  let path = [start]

  visited[start] = true
  console.log(stack.length)
  while (stack.length) {
    currentNode = stack.pop()
    result.push(currentNode)
    // path.push(currentNode)

    let adjacentNodes = calculateNeighboringNodes(currentNode, nodes, totalRows, totalCols)
    console.log('adjacentNodes', adjacentNodes)
    // adjacentNodes.forEach(adjacentNode => {

    while (adjacentNodes.length) {
      shuffle(adjacentNodes)
      const randomNeighbor = adjacentNodes.pop()
      if (!visited[randomNeighbor[0]] && !path.includes(randomNeighbor[0])) {
        if (!nodes[randomNeighbor[1]].isStartNode && !nodes[randomNeighbor[1]].isEndNode) {
          path.push(randomNeighbor[1])
          stack.push(randomNeighbor[1])
          visited[randomNeighbor[0]] = true
        }
      }
    }
    // const randomIndex = Math.floor(Math.random() * adjacentNodes.length)

    // })
  }
  let wallNodes = []
  for (let node in nodes) {
    if (!path.includes(node) && !nodes[node].isStartNode && !nodes[node].isEndNode)
      wallNodes.push(node)
  }
  return border.concat(wallNodes)
}

export function randomWallNodes(nodes, totalRows, totalCols) {
  let border = borderNodes(nodes, totalRows, totalCols)
  let wallNodes = []
  for (let node in nodes) {
    let randomNum = Math.floor(Math.random() * 10)
    if (randomNum > 7 && !nodes[node].isStartNode && !nodes[node].isEndNode) {
      wallNodes.push(node)
    }
  }
  return border.concat(wallNodes)
}
