import './App.css'
import { useState, createContext, useRef } from 'react'
import Header from './components/Header'
import Grid from './components/Grid'
import Information from './components/Information'

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

  const [nodes, setNodes] = useState(initializeNodes())
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationDone, setAnimationDone] = useState(false)
  const [chosenAlgorithm, setChosenAlgorithm] = useState("Dijkstra's")

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
          totalRows={TOTAL_ROWS}
          totalCols={TOTAL_COLS}
          nodeRefs={nodeRefs}
          isAnimating={isAnimating}
          setIsAnimating={setIsAnimating}
          animationDone={animationDone}
          setAnimationDone={setAnimationDone}
          chosenAlgorithm={chosenAlgorithm}
          setChosenAlgorithm={setChosenAlgorithm}
        />
        <Information chosenAlgorithm={chosenAlgorithm} />
        <Grid
          totalRows={TOTAL_ROWS}
          totalCols={TOTAL_COLS}
          nodeRefs={nodeRefs}
          isAnimating={isAnimating}
          setIsAnimating={setIsAnimating}
          animationDone={animationDone}
          setAnimationDone={setAnimationDone}
        />
      </div>
    </nodesContext.Provider>
  )
}

export default App

// Change the computation of the algorithm to button press
// Add compare functionality
