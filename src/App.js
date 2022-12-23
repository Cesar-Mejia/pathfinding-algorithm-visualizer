import './App.css'
import { useState, createContext, useRef, useEffect } from 'react'
import Header from './components/Header'
import Grid from './components/Grid'
// import { dijkstra, aStar, DFS_recursive } from './algorithms'

export const nodesContext = createContext()

function App() {
  const CELL_DIMENSIONS = 25
  const TOTAL_ROWS = Math.floor(window.innerHeight / CELL_DIMENSIONS) - 8
  const TOTAL_COLS = Math.floor(window.innerWidth / CELL_DIMENSIONS) - 1
  // const TOTAL_ROWS = 4
  // const TOTAL_COLS = 4

  const INITIAL_ROW = Math.floor(TOTAL_ROWS / 2)
  const INITIAL_START_COL = Math.floor(TOTAL_COLS / 4)
  const INITIAL_END_COL = TOTAL_COLS - INITIAL_START_COL

  // const [startNode, setStartNode] = useState(`r${INITIAL_ROW}c${INITIAL_START_COL}`)
  // const [endNode, setEndNode] = useState(`r${INITIAL_ROW}c${INITIAL_END_COL}`)

  const [nodes, setNodes] = useState(initializeNodes())
  // const [isAnimating, setIsAnimating] = useState(false)
  // const [visualizationDone, setVisualizationDone] = useState(false)

  // const [recompute, setRecompute] = useState(false)

  const nodeRefs = useRef({})

  // useEffect(() => {
  //   reComputeAlgorithm()
  // }, [recompute])

  function createNode(row, col) {
    return {
      row,
      col,
      value: `r${row}c${col}`,
      adjacentNodes: [],
      distance: null,
      weight: 1,
      previous: null,
      isStartNode: false,
      isEndNode: false,
      isWallNode: false,
      gScore: Infinity,
      fScore: Infinity
    }
  }

  function initializeNodes() {
    let nodes = {}
    for (let row = 1; row <= TOTAL_ROWS; row++) {
      for (let col = 1; col <= TOTAL_COLS; col++) {
        let newNode = createNode(row, col)
        nodes[newNode.value] = newNode
      }
    }
    nodes[`r${INITIAL_ROW}c${INITIAL_START_COL}`].isStartNode = true
    nodes[`r${INITIAL_ROW}c${INITIAL_END_COL}`].isEndNode = true
    return nodes
  }

  function clearAnimations() {
    for (let node in nodeRefs.current) {
      const element = nodeRefs.current[node]
      element.classList.remove(
        'node-visited',
        'node-final-path',
        'node-visited-recompute',
        'node-final-path-recompute'
      )
    }
  }

  function resetNodes() {
    clearAnimations()
    let newNodes = { ...nodes }
    for (let node in newNodes) {
      newNodes[node].adjacentNodes = []
      newNodes[node].distance = null
      newNodes[node].previous = null
      newNodes[node].gScore = Infinity
      newNodes[node].fScore = Infinity
    }
    setNodes(newNodes)
  }

  // function reComputeAlgorithm() {
  //   // console.log('startNode-recomp', startNode)
  //   resetNodes()
  //   // console.log('recompute activated')
  //   switch (chosenAlgorithm) {
  //     case "Dijkstra's":
  //       const dijkstraResults = dijkstra(nodes, nodes.startNode, nodes.endNode, TOTAL_ROWS, TOTAL_COLS)
  //       console.log('dijkstraResults', dijkstraResults)
  //       setVisitedNodes(dijkstraResults.visitedNodes)
  //       setShortestPath(dijkstraResults.shortestPath)
  //       break
  //     case 'A*':
  //       const aStarResults = aStar(nodes, nodes.startNode, nodes.endNode, TOTAL_ROWS, TOTAL_COLS)
  //       setVisitedNodes(aStarResults.visitedNodes)
  //       setShortestPath(aStarResults.shortestPath)
  //       break
  //     case 'Depth First':
  //       const dfsResults = DFS_recursive(nodes, nodes.startNode, nodes.endNode, TOTAL_ROWS, TOTAL_COLS)
  //       setVisitedNodes(dfsResults.visitedNodes)
  //       setShortestPath(dfsResults.shortestPath)
  //       break
  //     case 'Breadth First':
  //       const breadthFirstResults = dijkstra(nodes, nodes.startNode, nodes.endNode, TOTAL_ROWS, TOTAL_COLS)
  //       setVisitedNodes(breadthFirstResults.visitedNodes)
  //       setShortestPath(breadthFirstResults.shortestPath)
  //       break
  //   }
  //   recomputeColors()
  // }

  // function recomputeColors() {
  //   console.log('shortestPath', visitedNodes)
  //   for (let i = 0; i <= visitedNodes.length; i++) {
  //     if (i === visitedNodes.length) {
  //       for (let j = 0; j < shortestPath.length; j++) {
  //         let node2 = shortestPath[j]
  //         const node2Element = nodeRefs.current[node2]
  //         const currentClass2 = node2Element.className
  //         node2Element.className = currentClass2 + ' node-final-path-recompute'
  //       }
  //       break
  //     }
  //     let node1 = visitedNodes[i]
  //     console.log('visitedNodes[i]', visitedNodes[i])
  //     const node1Element = nodeRefs.current[node1]
  //     const currentClass1 = node1Element.className
  //     node1Element.className = currentClass1 + ' node-visited-recompute'
  //   }
  // }

  return (
    <nodesContext.Provider value={[nodes, setNodes]}>
      <div className="App">
        <Header
          // startNode={startNode}
          // endNode={endNode}
          totalRows={TOTAL_ROWS}
          totalCols={TOTAL_COLS}
          nodeRefs={nodeRefs}
          // isAnimating={isAnimating}
          // setIsAnimating={setIsAnimating}
          // initializeNodes={initializeNodes}
          // visualizationDone={visualizationDone}
          // setVisualizationDone={setVisualizationDone}
          // chosenAlgorithm={chosenAlgorithm}
          // setChosenAlgorithm={setChosenAlgorithm}
          // visitedNodes={visitedNodes}
          // setVisitedNodes={setVisitedNodes}
          // shortestPath={shortestPath}
          // setShortestPath={setShortestPath}
          clearAnimations={clearAnimations}
          resetNodes={resetNodes}
        />
        <Grid
          totalRows={TOTAL_ROWS}
          totalCols={TOTAL_COLS}
          // startNode={startNode}
          // endNode={endNode}
          // setStartNode={setStartNode}
          // setEndNode={setEndNode}
          nodeRefs={nodeRefs}
          // isAnimating={isAnimating}
          // setIsAnimating={setIsAnimating}
          // reComputeAlgorithm={reComputeAlgorithm}
          // visualizationDone={visualizationDone}
          // setVisualizationDone={setVisualizationDone}
          // setRecompute={setRecompute}
        />
      </div>
    </nodesContext.Provider>
  )
}

export default App
