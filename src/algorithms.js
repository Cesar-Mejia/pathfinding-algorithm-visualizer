class priorityQueue {
  constructor() {
    this.values = []
  }
  enqueue(value, distance) {
    this.values.push({ value, distance })
    this.sort()
  }
  dequeue() {
    return this.values.shift()
  }
  sort() {
    this.values.sort((a, b) => a.distance - b.distance)
  }
  valuesArray() {
    return this.values.map(node => node.value)
  }
}

export function startNode(nodes) {
  for (let node in nodes) {
    if (nodes[node].isStartNode) return node
  }
}

export function endNode(nodes) {
  for (let node in nodes) {
    if (nodes[node].isEndNode) return node
  }
}

function calculateAdjacentNodes(node, nodes, totalRows, totalCols) {
  let currentNode = nodes[node]
  let adjacentNodes = []
  let nodeAbove = `r${currentNode.row - 1}c${currentNode.col}`
  let nodeBelow = `r${currentNode.row + 1}c${currentNode.col}`
  let nodeLeft = `r${currentNode.row}c${currentNode.col - 1}`
  let nodeRight = `r${currentNode.row}c${currentNode.col + 1}`

  if (currentNode.row !== 1 && !nodes[nodeAbove].isWallNode) {
    adjacentNodes.push(nodeAbove)
  }
  if (currentNode.col !== totalCols && !nodes[nodeRight].isWallNode) {
    adjacentNodes.push(nodeRight)
  }
  if (currentNode.row !== totalRows && !nodes[nodeBelow].isWallNode) {
    adjacentNodes.push(nodeBelow)
  }
  if (currentNode.col !== 1 && !nodes[nodeLeft].isWallNode) {
    adjacentNodes.push(nodeLeft)
  }
  return adjacentNodes
}

export function dijkstra(nodes, totalRows, totalCols) {
  console.log('dijkstras activated')
  let start = startNode(nodes)
  let finish = endNode(nodes)
  let visitedNodes = []
  let shortestPath = []
  const queueNodes = new priorityQueue()
  let smallest

  // build up initial state (distance, queue)
  for (let node in nodes) {
    if (node === start) {
      nodes[node].distance = 0
      queueNodes.enqueue(node, 0)
    } else {
      nodes[node].distance = Infinity
      queueNodes.enqueue(node, Infinity)
    }
  }

  while (true) {
    smallest = queueNodes.dequeue().value
    if (nodes[smallest].distance !== Infinity) visitedNodes.push(smallest)

    if (smallest === finish || nodes[smallest].distance === Infinity) {
      while (nodes[smallest].previous) {
        shortestPath.push(smallest)
        smallest = nodes[smallest].previous
      }
      break
    }
    let adjacentNodes = calculateAdjacentNodes(smallest, nodes, totalRows, totalCols)
    for (let neighbor of adjacentNodes) {
      let candidateDistance = nodes[smallest].distance + nodes[neighbor].weight
      let currentNeighborDistance = nodes[neighbor].distance
      if (candidateDistance < currentNeighborDistance) {
        nodes[neighbor].distance = candidateDistance
        nodes[neighbor].previous = smallest
        queueNodes.enqueue(neighbor, candidateDistance)
      }
    }
  }
  shortestPath = shortestPath.concat(smallest).reverse()
  if (nodes[smallest].distance === Infinity) shortestPath = []
  return { visitedNodes, shortestPath }
}

function heuristic(nodes, node1, node2) {
  // calculates the manhattan distance between nodes
  const rowDifference = Math.abs(nodes[node1].row - nodes[node2].row)
  const colDifference = Math.abs(nodes[node1].col - nodes[node2].col)
  return rowDifference + colDifference
}

export function aStar(nodes, start, finish, totalRows, totalCols) {
  let visitedNodes = []
  let shortestPath = []
  let openSet = new priorityQueue()
  let current

  openSet.enqueue(start, 0)
  nodes[start].gScore = 0
  nodes[start].fScore = heuristic(nodes, start, finish)

  while (openSet.values.length) {
    current = openSet.dequeue().value
    visitedNodes.push(current)

    if (current === finish) {
      while (nodes[current].previous) {
        shortestPath.push(current)
        current = nodes[current].previous
      }
    }

    let adjacentNodes = calculateAdjacentNodes(current, nodes, totalRows, totalCols)

    for (let neighbor of adjacentNodes) {
      let tempGscore = nodes[current].gScore + 1
      if (tempGscore < nodes[neighbor].gScore) {
        nodes[neighbor].previous = current
        nodes[neighbor].gScore = tempGscore
        nodes[neighbor].fScore = tempGscore + heuristic(nodes, neighbor, finish)
        if (!openSet.valuesArray().includes(neighbor)) {
          openSet.enqueue(neighbor, nodes[neighbor].fScore)
        }
      }
    }
  }
  let finishIdx
  if (visitedNodes.includes(finish)) {
    finishIdx = visitedNodes.indexOf(finish)
    visitedNodes = visitedNodes.slice(0, finishIdx + 1)
    shortestPath = shortestPath.concat(start).reverse()
  } else {
    shortestPath = []
  }

  return { visitedNodes, shortestPath }
}

export function DFS_recursive(nodes, start, finish, totalRows, totalCols) {
  let result = []
  let visited = {}

  function dfs(vertex) {
    result.push(vertex)
    visited[vertex] = true

    let adjacentNodes = calculateAdjacentNodes(vertex, nodes, totalRows, totalCols)
    adjacentNodes.forEach(neighbor => {
      if (!visited[neighbor]) {
        dfs(neighbor)
      }
    })
  }
  dfs(start)

  let finishIdx, visitedNodes, shortestPath
  if (result.includes(finish)) {
    finishIdx = result.indexOf(finish)
    visitedNodes = result.slice(0, finishIdx + 1)
    shortestPath = visitedNodes
  } else {
    visitedNodes = result
    shortestPath = []
  }

  return { visitedNodes, shortestPath }
}
