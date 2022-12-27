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

function resetNodes(prevNodes) {
  // clearAnimations()
  let newNodes = { ...prevNodes }
  for (let node in newNodes) {
    newNodes[node].adjacentNodes = []
    newNodes[node].distance = null
    newNodes[node].previous = null
    newNodes[node].gScore = Infinity
    newNodes[node].fScore = Infinity
  }
  return newNodes
}

export function calculateAdjacentNodes(node, nodes, totalRows, totalCols) {
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

export function dijkstra(prevNodes, totalRows, totalCols) {
  let nodes = resetNodes(prevNodes)
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

  while (queueNodes.values.length) {
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

export function aStar(prevNodes, totalRows, totalCols) {
  let nodes = resetNodes(prevNodes)
  let start = startNode(nodes)
  let finish = endNode(nodes)

  let visitedNodes = []
  let shortestPath = []
  let queue = new priorityQueue()
  let current

  queue.enqueue(start, 0)
  nodes[start].gScore = 0
  nodes[start].fScore = heuristic(nodes, start, finish)

  while (queue.values.length) {
    current = queue.dequeue().value
    visitedNodes.push(current)

    if (current === finish) {
      while (nodes[current].previous) {
        shortestPath.push(current)
        current = nodes[current].previous
      }
      shortestPath.push(current)
      break
    }

    let adjacentNodes = calculateAdjacentNodes(current, nodes, totalRows, totalCols)

    for (let neighbor of adjacentNodes) {
      if (nodes[neighbor].gScore === Infinity) {
        nodes[neighbor].gScore = nodes[current].gScore + 1
        nodes[neighbor].fScore = nodes[neighbor].gScore + heuristic(nodes, neighbor, finish)
        nodes[neighbor].previous = current
        if (!queue.valuesArray().includes(neighbor)) {
          queue.enqueue(neighbor, nodes[neighbor].fScore)
        }
      }
    }
  }
  return { visitedNodes, shortestPath }
}

export function DFS_recursive(prevNodes, totalRows, totalCols) {
  let nodes = resetNodes(prevNodes)
  let start = startNode(nodes)
  let finish = endNode(nodes)
  let result = []
  let visited = {}
  let shortestPath = []

  function dfs(vertex) {
    result.push(vertex)
    visited[vertex] = true

    let adjacentNodes = calculateAdjacentNodes(vertex, nodes, totalRows, totalCols)
    let unvisitedAdjacentNodes = adjacentNodes.filter(node => !visited[node])
    if (unvisitedAdjacentNodes.length || vertex === finish) shortestPath.push(vertex)

    adjacentNodes.forEach(neighbor => {
      if (!visited[neighbor]) {
        dfs(neighbor)
      }
    })
  }
  dfs(start)

  let finishIdx_result, finishIdx_shortestPath, visitedNodes

  if (result.includes(finish)) {
    finishIdx_result = result.indexOf(finish)
    finishIdx_shortestPath = shortestPath.indexOf(finish)
    visitedNodes = result.slice(0, finishIdx_result + 1)
    shortestPath = shortestPath.slice(0, finishIdx_shortestPath + 1)
  } else {
    visitedNodes = result
    shortestPath = []
  }

  return { visitedNodes, shortestPath }
}

export function greedy_BFS(prevNodes, totalRows, totalCols) {
  let nodes = resetNodes(prevNodes)
  let start = startNode(nodes)
  let finish = endNode(nodes)

  let visitedNodes = []
  let shortestPath = []
  let queue = new priorityQueue()
  let current

  queue.enqueue(start, 0)
  nodes[start].gScore = 0
  nodes[start].fScore = heuristic(nodes, start, finish)

  while (queue.values.length) {
    current = queue.dequeue().value
    visitedNodes.push(current)

    if (current === finish) {
      while (nodes[current].previous) {
        shortestPath.push(current)
        current = nodes[current].previous
      }
      shortestPath.push(current)
      break
    }

    let adjacentNodes = calculateAdjacentNodes(current, nodes, totalRows, totalCols)

    for (let neighbor of adjacentNodes) {
      if (nodes[neighbor].fScore === Infinity) {
        nodes[neighbor].fScore = heuristic(nodes, neighbor, finish)
        nodes[neighbor].previous = current
        if (!queue.valuesArray().includes(neighbor)) {
          queue.enqueue(neighbor, nodes[neighbor].fScore)
        }
      }
    }
  }
  return { visitedNodes, shortestPath }
}
