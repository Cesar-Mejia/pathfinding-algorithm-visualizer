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
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationDone, setAnimationDone] = useState(false)

  // const [recompute, setRecompute] = useState(false)

  const nodeRefs = useRef({})

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

  return (
    <nodesContext.Provider value={[nodes, setNodes]}>
      <div className="App">
        <Header
          // startNode={startNode}
          // endNode={endNode}
          totalRows={TOTAL_ROWS}
          totalCols={TOTAL_COLS}
          nodeRefs={nodeRefs}
          isAnimating={isAnimating}
          setIsAnimating={setIsAnimating}
          animationDone={animationDone}
          setAnimationDone={setAnimationDone}
          // initializeNodes={initializeNodes}
          // visualizationDone={visualizationDone}
          // setVisualizationDone={setVisualizationDone}
          // chosenAlgorithm={chosenAlgorithm}
          // setChosenAlgorithm={setChosenAlgorithm}
          // visitedNodes={visitedNodes}
          // setVisitedNodes={setVisitedNodes}
          // shortestPath={shortestPath}
          // setShortestPath={setShortestPath}

          // resetNodes={resetNodes}
        />
        <Grid
          totalRows={TOTAL_ROWS}
          totalCols={TOTAL_COLS}
          // startNode={startNode}
          // endNode={endNode}
          // setStartNode={setStartNode}
          // setEndNode={setEndNode}
          nodeRefs={nodeRefs}
          isAnimating={isAnimating}
          setIsAnimating={setIsAnimating}
          animationDone={animationDone}
          setAnimationDone={setAnimationDone}
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
