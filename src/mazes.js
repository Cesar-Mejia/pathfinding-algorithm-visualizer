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
  let odd_cols = oddColumns(nodes, totalRows, totalCols)
  let odd_rows = oddRows(nodes, totalRows, totalCols)
  let totalWalls = border.concat(odd_cols).concat(odd_rows)
  let emptyNodes = []
  let path = []

  for (let node in nodes) {
    if (!totalWalls.includes(node)) emptyNodes.push(node)
  }
  // let result = new Set(totalWalls)

  for (let node of emptyNodes) {
    let nodeRight = `r${nodes[node].row}c${nodes[node].col + 1}`
    let nodeBelow = `r${nodes[node].row + 1}c${nodes[node].col}`
    let adjacentNodes = []

    if (nodes[node].col !== totalCols - 1) {
      adjacentNodes.push(nodeRight)
    }
    if (nodes[node].row !== totalRows - 1) {
      adjacentNodes.push(nodeBelow)
    }

    if (adjacentNodes.length) {
      const randomIndex = Math.floor(Math.random() * adjacentNodes.length)
      const item = adjacentNodes[randomIndex]
      path.push(item)
    }
  }

  return totalWalls.filter(wallNode => !path.includes(wallNode))
}

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
  while (stack.length) {
    currentNode = stack.pop()
    result.push(currentNode)

    let adjacentNodes = calculateNeighboringNodes(currentNode, nodes, totalRows, totalCols)

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
  }
  let wallNodes = []
  for (let node in nodes) {
    if (!path.includes(node) && !nodes[node].isStartNode && !nodes[node].isEndNode)
      wallNodes.push(node)
  }
  return border.concat(wallNodes)
}

export function recursiveBackTracking_narrow(nodes, totalRows, totalCols) {
  let border = borderNodes(nodes, totalRows, totalCols)
  let odd_cols = oddColumns(nodes, totalRows, totalCols)
  let odd_rows = oddRows(nodes, totalRows, totalCols)
  let totalWalls = border.concat(odd_cols).concat(odd_rows)
  let emptyNodes = Object.keys(nodes).filter(node => !totalWalls.includes(node))

  let path = []
  let visited = {}
  let stack = []

  let current = emptyNodes[Math.floor(Math.random() * emptyNodes.length)]
  visited[current] = true
  stack.push(current)

  // stack.length
  let count = 0
  while (stack.length) {
    count++
    current = stack.pop()
    // this function returns 2d array
    let currentNeighbors = calculateNeighboringNodes(current, nodes, totalRows, totalCols)
    let currentUnvisitedNeighbors = currentNeighbors.filter(neighbor => !visited[neighbor[0]])

    if (currentUnvisitedNeighbors.length) {
      stack.push(current)
      let randomUnvisitedNeighbor =
        currentUnvisitedNeighbors[Math.floor(Math.random() * currentUnvisitedNeighbors.length)]
      path.push(randomUnvisitedNeighbor[1])
      visited[randomUnvisitedNeighbor[0]] = true
      stack.push(randomUnvisitedNeighbor[0])
    }
  }

  return totalWalls.filter(wallNode => !path.includes(wallNode))
}

export function randomWallNodes(nodes, totalRows, totalCols) {
  let border = borderNodes(nodes, totalRows, totalCols)
  let wallNodes = []
  for (let node in nodes) {
    let randomNum = Math.floor(Math.random() * 10)
    if (randomNum > 6 && !nodes[node].isStartNode && !nodes[node].isEndNode) {
      wallNodes.push(node)
    }
  }
  return border.concat(wallNodes)
}

function randomRow(nodes, totalRows) {
  let start = startNode(nodes)
  let randomRow
  do {
    randomRow = Math.floor(Math.random() * totalRows + 1)
  } while (randomRow === nodes[start].row)
  return randomRow
}

function randomCol(nodes, totalCols) {
  let start = startNode(nodes)
  let randomCol
  do {
    randomCol = Math.floor(Math.random() * totalCols + 1)
  } while (randomCol === nodes[start].col)
  return randomCol
}

function oddColumns(nodes, totalRows, totalCols) {
  let oddCols = []

  for (let i = 1; i <= totalCols; i += 2) {
    for (let j = 1; j <= totalRows; j++) {
      oddCols.push(`r${j}c${i}`)
    }
  }
  return oddCols
}
function oddRows(nodes, totalRows, totalCols) {
  let oddRows = []

  for (let i = 1; i <= totalRows; i += 2) {
    for (let j = 1; j <= totalCols; j++) {
      oddRows.push(`r${i}c${j}`)
    }
  }
  return oddRows
}
export function aldousBroder(nodes, totalRows, totalCols) {
  let border = borderNodes(nodes, totalRows, totalCols)
  let odd_cols = oddColumns(nodes, totalRows, totalCols)
  let odd_rows = oddRows(nodes, totalRows, totalCols)
  let totalWalls = border.concat(odd_cols).concat(odd_rows)
  let emptyNodes = []
  let path = []

  for (let node in nodes) {
    if (!totalWalls.includes(node)) emptyNodes.push(node)
  }
  let visited = {}

  let unvisitedNodes = [...emptyNodes]
  let unvisitedNodesObj = {}
  for (let node of unvisitedNodes) unvisitedNodesObj[node] = node

  let current = unvisitedNodes[Math.floor(Math.random() * unvisitedNodes.length)]
  visited[current] = true
  delete unvisitedNodesObj[current]

  let count = 0

  while (Object.keys(unvisitedNodesObj).length) {
    count++
    // this function returns 2D array
    let neighbors = calculateNeighboringNodes(current, nodes, totalRows, totalCols)
    let randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)]

    if (!visited[randomNeighbor[0]]) {
      path.push(randomNeighbor[1])
      visited[randomNeighbor[0]] = true
      delete unvisitedNodesObj[randomNeighbor[0]]
    }
    current = randomNeighbor[0]
  }
  totalWalls = totalWalls.filter(wallNode => !path.includes(wallNode))
  return totalWalls
}
