// class Node {
//   constructor(row, col) {
//     this.value = this.row = row
//     this.col = col
//     this.adjacentNodes = []
//     this.distance = null
//     this.previous = null
//     this.isWallNode = false
//     this.isVisitedNode = false
//     this.gScore = Infinityn
//     this.fScore = Infinity
//   }
// }

// function createNode(row, col) { // done
//   return {
//     value: `r${row}c${col}`,
//     row,
//     col,
//     adjacentNodes: [],
//     distance: null,
//     previous: null,
//     isWallNode: null,
//     isVisitedNode: null,
//     gScore: Infinity,
//     fScore: Infinity
//   }
// }

// class priorityQueue { // done
//   constructor() {
//     this.values = []
//   }
//   enqueue(val, distance) {
//     this.values.push({ val, distance })
//     this.sort()
//   }
//   dequeue() {
//     return this.values.shift()
//   }
//   sort() {
//     this.values.sort((a, b) => a.distance - b.distance)
//   }
//   valuesArray() {
//     return this.values.map(node => node.val)
//   }
// }

// let nodes = {}    // done
// let totalRows = null
// let totalCols = null
// let visitedNodes = []
// let finalPath = []

// function populateGraph() { // done
//   for (let row = 1; row <= totalRows; row++) {
//     for (let col = 1; col <= totalCols; col++) {
//       let newNode = new Node(row, col)
//       nodes[newNode.value] = newNode
//     }
//   }
// }

// function calculateAdjacentNodes() {     // done
//   for (let node in nodes) {
//     let currentNode = nodes[node]
//     let nodeAbove = `r${currentNode.row - 1}c${currentNode.col}`
//     let nodeBelow = `r${currentNode.row + 1}c${currentNode.col}`
//     let nodeLeft = `r${currentNode.row}c${currentNode.col - 1}`
//     let nodeRight = `r${currentNode.row}c${currentNode.col + 1}`

//     if (currentNode.row !== 1) {
//       // && nodeAbove !isWallNode
//       addEdge(currentNode.value, nodeAbove)
//     }
//     if (currentNode.col !== totalCols) {
//       addEdge(currentNode.value, nodeRight)
//     }
//     if (currentNode.row !== totalRows) {
//       addEdge(currentNode.value, nodeBelow)
//     }
//     if (currentNode.col !== 1) {
//       addEdge(currentNode.value, nodeLeft)
//     }
//   }
// }

// function addEdge(node1, node2) {     // done
//   const n1AdjacentNodes = nodes[node1].adjacentNodes.map(neighbor => neighbor.node)
//   const n2AdjacentNodes = nodes[node2].adjacentNodes.map(neighbor => neighbor.node)
//   const weight = 1

//   if (!n1AdjacentNodes.includes(node2)) {
//     nodes[node1].adjacentNodes.push({ node: node2, weight })
//   }
//   if (!n2AdjacentNodes.includes(node1)) {
//     nodes[node2].adjacentNodes.push({ node: node1, weight })
//   }
// }

// function removeEdge(node1, node2) {   // done
//   nodes[node1].adjacentNodes = nodes[node1].adjacentNodes.filter(node => node !== node2)
//   nodes[node2].adjacentNodes = nodes[node2].adjacentNodes.filter(node => node !== node1)
// }

// function removeNode(node) {   // done
//   while (nodes[node].adjacentNodes.length) {
//     const adjacentNode = nodes[node].adjacentNodes.pop()
//     removeEdge(node, adjacentNode)
//   }
//   delete nodes[node]
// }

// function animateAlgorithm() {   // done
//   for (let i = 0; i <= visitedNodes.length; i++) {
//     if (i === visitedNodes.length) {
//       setTimeout(() => {
//         this.animateShortestPath()
//       }, 10 * i)
//       return
//     }
//     setTimeout(() => {
//       const node = this.visitedNodes[i]
//       const currentClass = document.getElementById(node).className
//       document.getElementById(node).className = currentClass + 'node-visited'
//     }, 10 * i)
//   }
// }

// function animateShortestPath() {    // done
//   for (let i = 0; i < finalPath.length; i++) {
//     setTimeout(() => {
//       const node = finalPath[i]
//       const currentClass = document.getElementById(node).className
//       document.getElementById(node).className = currentClass + 'node node-final-path'
//     }, 50 * i)
//   }
// }

// function toggleWallNode(node) {  // Not needed anymore
//   nodes[node].isWallNode = true

//   return removeNode(node)
// }

// function setNodeAsVisited(node) {  // Will come back to this
//   // console.log(node, nodes[node].isVisitedNode)
//   nodes[node].isVisitedNode = true
//   // console.log(node, nodes[node].isVisitedNode)
// }

// function dijkstra(start, finish) {
//   const queueNodes = new priorityQueue()
//   let path = []
//   let visited = []
//   let smallest

//   // build up initial state (distance, queue)
//   for (let node in this.nodes) {
//     if (node === start) {
//       nodes[node].distance = 0
//       queueNodes.enqueue(node, 0)
//     } else {
//       nodes[node].distance = Infinity
//       queueNodes.enqueue(node, Infinity)
//     }
//   }
//   while (true) {
//     smallest = queueNodes.dequeue().val
//     visited.push(smallest)
//     if (smallest === finish) {
//       while (this.nodes[smallest].previous) {
//         path.push(smallest)
//         smallest = this.nodes[smallest].previous
//       }
//       break
//     }
//     for (let neighbor of nodes[smallest].adjacentNodes) {
//       let candidateDistance = nodes[smallest].distance + neighbor.weight
//       let currentNeighborDistance = nodes[neighbor.node].distance
//       if (candidateDistance < currentNeighborDistance) {
//         nodes[neighbor.node].distance = candidateDistance
//         nodes[neighbor.node].previous = smallest
//         queueNodes.enqueue(neighbor.node, candidateDistance)
//       }
//     }
//   }

//   visitedNodes = visited
//   finalPath = path.concat(smallest).reverse()
// }

// function DFS_recursive(start, finish) {
//   let result = []
//   let visited = {}
//   let nodes = nodes
//   function dfs(vertex) {
//     result.push(vertex)
//     visited[vertex] = true

//     nodes[vertex].adjacentNodes.forEach(adjacentNode => {
//       if (!visited[adjacentNode.node]) {
//         dfs(adjacentNode.node)
//       }
//     })
//   }
//   dfs(start)

//   let finishIdx = result.indexOf(finish)
//   visitedNodes = result.slice(0, finishIdx + 1)
//   finalPath = visitedNodes
// }

// function BFS(start, finish) {
//   let result = []
//   let queue = [start]
//   let visited = {}
//   let currentNode
//   visited[start] = true
//   while (queue.length) {
//     currentNode = queue.shift()
//     result.push(currentNode)
//     nodes[currentNode].adjacentNodes.forEach(adjacentNode => {
//       if (!visited[adjacentNode.node]) {
//         queue.push(adjacentNode.node)
//         visited[adjacentNode.node] = true
//       }
//     })
//   }

//   let finishIdx = result.indexOf(finish)
//   visitedNodes = result.slice(0, finishIdx + 1)
// }

// function heuristic(node1, node2) {
//   // calculates the manhattan distance between nodes
//   const rowDifference = Math.abs(nodes[node1].row - nodes[node2].row)
//   const colDifference = Math.abs(nodes[node1].col - nodes[node2].col)
//   return rowDifference + colDifference
// }

// function astar(start, finish) {
//   let count = 0
//   let visitedNodes = []
//   let shortestPath = []
//   let openSet = new priorityQueue()
//   openSet.enqueue(start, 0)
//   nodes[start].gScore = 0
//   nodes[start].fScore = heuristic(start, finish)
//   // openSetHash = {start}
//   while (openSet.values.length) {
//     let current = openSet.dequeue().val
//     visitedNodes.push(current)
//     // delete openSetHash[current]
//     if (current === finish) {
//       let currentNode = finish
//       while (nodes[currentNode].previous) {
//         shortestPath.push(currentNode)
//         currentNode = nodes[currentNode].previous
//       }
//     }

//     for (let neighbor of nodes[current].adjacentNodes) {
//       let tempGscore = nodes[current].gScore + 1

//       if (tempGscore < nodes[neighbor.node].gScore) {
//         nodes[neighbor.node].previous = current
//         nodes[neighbor.node].gScore = tempGscore
//         nodes[neighbor.node].fScore = tempGscore + heuristic(neighbor.node, finish)
//         if (!openSet.valuesArray().includes(neighbor.node)) {
//           // count += 1
//           openSet.enqueue(neighbor.node, nodes[neighbor.node].fScore)
//         }
//       }
//     }
//     finalPath = shortestPath
//     let finishIdx = visitedNodes.indexOf(finish)
//     visitedNodes = visitedNodes.slice(0, finishIdx + 1)
//     // this.visitedNodes = visitedNodes
//     // if (current !=== start) {
//     //   current.make_closed()
//     // }
//   }
// }

// class WeightedGraph {
// constructor(totalRows, totalCols) {
//   this.nodes = {}
//   this.totalRows = totalRows
//   this.totalCols = totalCols
//   this.visitedNodes = []
//   this.finalPath = []

//   this.populateGraph()
//   this.calculateAdjacentNodes()
// }

// addEdge(node1, node2) {
//   const n1AdjacentNodes = this.nodes[node1].adjacentNodes.map(neighbor => neighbor.node)
//   const n2AdjacentNodes = this.nodes[node2].adjacentNodes.map(neighbor => neighbor.node)
//   const weight = 1

//   if (!n1AdjacentNodes.includes(node2)) {
//     this.nodes[node1].adjacentNodes.push({ node: node2, weight })
//   }
//   if (!n2AdjacentNodes.includes(node1)) {
//     this.nodes[node2].adjacentNodes.push({ node: node1, weight })
//   }
// }
////// *************************************************** /////////////////

// removeEdge(node1, node2) {
//   this.nodes[node1].adjacentNodes = this.nodes[node1].adjacentNodes.filter(node => node !== node2)
//   this.nodes[node2].adjacentNodes = this.nodes[node2].adjacentNodes.filter(node => node !== node1)
// }
// removeNode(node) {
//   while (this.nodes[node].adjacentNodes.length) {
//     const adjacentNode = this.nodes[node].adjacentNodes.pop()
//     this.removeEdge(node, adjacentNode)
//   }
//   delete this.nodes[node]
//   return this
// }

//// ****************************************************** /////
// populateGraph() {
//   for (let row = 1; row <= this.totalRows; row++) {
//     for (let col = 1; col <= this.totalCols; col++) {
//       let newNode = new Node(row, col)
//       this.nodes[newNode.value] = newNode
//     }
//   }
// }
// calculateAdjacentNodes() {
//   for (let node in this.nodes) {
//     let currentNode = this.nodes[node]
//     let nodeAbove = `r${currentNode.row - 1}c${currentNode.col}`
//     let nodeBelow = `r${currentNode.row + 1}c${currentNode.col}`
//     let nodeLeft = `r${currentNode.row}c${currentNode.col - 1}`
//     let nodeRight = `r${currentNode.row}c${currentNode.col + 1}`
//     // console.log('currentNode', currentNode.value)
//     // console.log('nodeAbove', nodeAbove)

//     if (
//       currentNode.row > 1 &&
//       currentNode.row < this.totalRows &&
//       currentNode.col > 1 &&
//       currentNode.col < this.totalCols
//     ) {
//       this.addEdge(currentNode.value, nodeAbove)
//       this.addEdge(currentNode.value, nodeBelow)
//       this.addEdge(currentNode.value, nodeLeft)
//       this.addEdge(currentNode.value, nodeRight)
//     }
//     if (currentNode.row === this.totalRows && currentNode.col === 1) {
//       this.addEdge(currentNode.value, nodeAbove)
//       this.addEdge(currentNode.value, nodeRight)
//     }
//     if (currentNode.row === this.totalRows && currentNode.col === this.totalCols) {
//       this.addEdge(currentNode.value, nodeAbove)
//       this.addEdge(currentNode.value, nodeLeft)
//     }
//     if (
//       (currentNode.row === 1 || currentNode.row === this.totalRows) &&
//       currentNode.col < this.totalCols - 1 &&
//       currentNode.col !== 1
//     ) {
//       this.addEdge(currentNode.value, nodeRight)
//     }

//     if (currentNode.row === 1 && currentNode.col === 1) {
//       this.addEdge(currentNode.value, nodeRight)
//       this.addEdge(currentNode.value, nodeBelow)
//     }

//     if (currentNode.row === 1 && currentNode.col === this.totalCols) {
//       this.addEdge(currentNode.value, nodeBelow)
//       this.addEdge(currentNode.value, nodeLeft)
//     }

//     if (
//       (currentNode.col === 1 || currentNode.col === this.totalCols) &&
//       currentNode.row < this.totalRows - 1 &&
//       currentNode.row !== 1
//     ) {
//       this.addEdge(currentNode.value, nodeBelow)
//     }
//   }
// }
// visualizeFinalPath() {
//   for (let node of this.finalPath) {
//     this.nodes[node].isPath = true
//   }
// }
// animateAlgorithm() {f
//   for (let i = 0; i <= this.visitedNodes.length; i++) {
//     if (i === this.visitedNodes.length) {
//       setTimeout(() => {
//         this.animateShortestPath()
//       }, 10 * i)
//       return
//     }
//     setTimeout(() => {
//       const node = this.visitedNodes[i]
//       const currentClass = document.getElementById(node).className
//       document.getElementById(node).className = currentClass + 'node-visited'
//     }, 10 * i)
//   }
//   return false
// }
// animateShortestPath() {
//   for (let i = 0; i < this.finalPath.length; i++) {
//     setTimeout(() => {
//       const node = this.finalPath[i]
//       const currentClass = document.getElementById(node).className
//       document.getElementById(node).className = currentClass + 'node node-final-path'
//     }, 50 * i)
//   }
// }
// toggleWallNode(node) {
//   this.nodes[node].isWallNode = true

//   return this.removeNode(node)
// }
// setNodeAsVisited(node) {
//   console.log(node, this.nodes[node].isVisitedNode)
//   this.nodes[node].isVisitedNode = true
//   console.log(node, this.nodes[node].isVisitedNode)
//   return this
// }
// dijkstra(start, finish) {
//   const queueNodes = new priorityQueue()
//   let path = []
//   let visited = []
//   let smallest

//   // build up initial state (distance, queue)
//   for (let node in this.nodes) {
//     if (node === start) {
//       this.nodes[node].distance = 0
//       queueNodes.enqueue(node, 0)
//     } else {
//       this.nodes[node].distance = Infinity
//       queueNodes.enqueue(node, Infinity)
//     }
//   }
//   while (true) {
//     smallest = queueNodes.dequeue().val
//     visited.push(smallest)
//     if (smallest === finish) {
//       while (this.nodes[smallest].previous) {
//         path.push(smallest)
//         smallest = this.nodes[smallest].previous
//       }
//       break
//     }
//     for (let neighbor of this.nodes[smallest].adjacentNodes) {
//       // this.visitedNodes.push(neighbor.node)
//       let candidateDistance = this.nodes[smallest].distance + neighbor.weight
//       let currentNeighborDistance = this.nodes[neighbor.node].distance
//       if (candidateDistance < currentNeighborDistance) {
//         this.nodes[neighbor.node].distance = candidateDistance
//         this.nodes[neighbor.node].previous = smallest
//         queueNodes.enqueue(neighbor.node, candidateDistance)
//       }
//     }
//   }

//   this.visitedNodes = visited
//   this.finalPath = path.concat(smallest).reverse()
// }
// DFS_recursive(start, finish) {
//   let result = []
//   let visited = {}
//   let nodes = this.nodes
//   function dfs(vertex) {
//     // console.log(vertex)

//     result.push(vertex)
//     visited[vertex] = true
//     // console.log(nodes[vertex].adjacentNodes)
//     nodes[vertex].adjacentNodes.forEach(adjacentNode => {
//       // console.log(adjacentNode)
//       if (!visited[adjacentNode.node]) {
//         dfs(adjacentNode.node)
//       }
//     })
//   }
//   dfs(start)

//   let finishIdx = result.indexOf(finish)
//   this.visitedNodes = result.slice(0, finishIdx + 1)
//   this.finalPath = this.visitedNodes
// }
// BFS(start, finish) {
//   let result = []
//   let queue = [start]
//   let visited = {}
//   let currentNode
//   visited[start] = true
//   while (queue.length) {
//     currentNode = queue.shift()
//     result.push(currentNode)
//     this.nodes[currentNode].adjacentNodes.forEach(adjacentNode => {
//       if (!visited[adjacentNode.node]) {
//         queue.push(adjacentNode.node)
//         visited[adjacentNode.node] = true
//       }
//     })
//   }

//   let finishIdx = result.indexOf(finish)
//   this.visitedNodes = result.slice(0, finishIdx + 1)
// }
// heuristic(node1, node2) {
//   // calculates the manhattan distance between nodes
//   const rowDifference = Math.abs(this.nodes[node1].row - this.nodes[node2].row)
//   const colDifference = Math.abs(this.nodes[node1].col - this.nodes[node2].col)
//   return rowDifference + colDifference
// }
// astar(start, finish) {
//   let count = 0
//   let visitedNodes = []
//   let shortestPath = []
//   let openSet = new priorityQueue()
//   openSet.enqueue(start, 0)
//   this.nodes[start].gScore = 0
//   this.nodes[start].fScore = this.heuristic(start, finish)
//   // openSetHash = {start}
//   while (openSet.values.length) {
//     let current = openSet.dequeue().val
//     visitedNodes.push(current)
//     // delete openSetHash[current]
//     if (current === finish) {
//       let currentNode = finish
//       while (this.nodes[currentNode].previous) {
//         shortestPath.push(currentNode)
//         currentNode = this.nodes[currentNode].previous
//       }
//     }

//     for (let neighbor of this.nodes[current].adjacentNodes) {
//       let tempGscore = this.nodes[current].gScore + 1
//       // console.log('neighbor', neighbor)
//       // console.log('gScore', this.nodes[neighbor.node].gScore)
//       if (tempGscore < this.nodes[neighbor.node].gScore) {
//         this.nodes[neighbor.node].previous = current
//         this.nodes[neighbor.node].gScore = tempGscore
//         this.nodes[neighbor.node].fScore = tempGscore + this.heuristic(neighbor.node, finish)
//         if (!openSet.valuesArray().includes(neighbor.node)) {
//           // count += 1
//           openSet.enqueue(neighbor.node, this.nodes[neighbor.node].fScore)
//           // neighbor.make_open()
//         }
//       }
//     }
//     this.finalPath = shortestPath
//     let finishIdx = visitedNodes.indexOf(finish)
//     this.visitedNodes = visitedNodes.slice(0, finishIdx + 1)
//     // this.visitedNodes = visitedNodes
//     // if (current !=== start) {
//     //   current.make_closed()
//     // }
//   }
// }
// }

// export default WeightedGraph

// ********************************************************************* //
// class Node {
//   constructor(value) {
//     this.value = value
//     this.adjacentNodes = []
//   }
// }

// class Graph {
//   constructor() {
//     this.nodes = {}
//   }
//   addNode(val) {
//     let newNode = new Node(val)
//     this.nodes[val] = newNode
//   }
//   addEdge(node1, node2) {
//     this.nodes[node1].adjacentNodes.push(node2)
//     this.nodes[node2].adjacentNodes.push(node1)
//   }
//   removeEdge(node1, node2) {
//     this.nodes[node1].adjacentNodes = this.nodes[node1].adjacentNodes.filter(node => node !== node2)
//     this.nodes[node2].adjacentNodes = this.nodes[node2].adjacentNodes.filter(node => node !== node1)
//   }
//   removeNode(node) {
//     while (this.nodes[node].adjacentNodes.length) {
//       const adjacentNode = this.nodes[node].adjacentNodes.pop()
//       this.removeEdge(node, adjacentNode)
//     }
//     delete this.nodes[node]
//   }
//   DFS_recursive(start) {
//     let result = []
//     let visited = {}
//     let nodes = this.nodes
//     function dfs(vertex) {
//       result.push(vertex)
//       visited[vertex] = true
//       nodes[vertex].adjacentNodes.forEach(adjacentNode => {
//         if (!visited[adjacentNode]) {
//           dfs(adjacentNode)
//         }
//       })
//     }
//     dfs(start)
//     return result
//   }
//   DFS_iterative(start) {
//     let result = []
//     let stack = [start]
//     let visited = {}
//     let currentNode
//     visited[start] = true
//     while (stack.length) {
//       currentNode = stack.pop()
//       result.push(currentNode)
//       this.nodes[currentNode].adjacentNodes.forEach(adjacentNode => {
//         if (!visited[adjacentNode]) {
//           stack.push(adjacentNode)
//           visited[adjacentNode] = true
//         }
//       })
//     }
//     return result
//   }
//   BFS(start) {
//     let result = []
//     let queue = [start]
//     let visited = {}
//     let currentNode
//     visited[start] = true
//     while (queue.length) {
//       currentNode = queue.shift()
//       result.push(currentNode)
//       this.nodes[currentNode].adjacentNodes.forEach(adjacentNode => {
//         if (!visited[adjacentNode]) {
//           queue.push(adjacentNode)
//           visited[adjacentNode] = true
//         }
//       })
//     }
//     return result
//   }
// }
