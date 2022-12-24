import { useState, useContext } from 'react'
import { nodesContext } from '../App'
import { startNode, endNode } from '../algorithms'
import Node from './Node'
import './Grid.css'

function Grid({
  totalRows,
  totalCols,
  // startNode,
  // endNode,
  // setStartNode,
  // setEndNode,
  nodeRefs,
  isAnimating,
  setIsAnimating,
  animationDone,
  setAnimationDone
  // visualizationDone,
  // reComputeAlgorithm,
  // setVisualizationDone
  // setRecompute
}) {
  const [nodes, setNodes] = useContext(nodesContext)

  const [startNodePressed, setStartNodePressed] = useState(false)
  const [endNodePressed, setEndNodePressed] = useState(false)
  const [mouseIsPressed, setMouseIsPressed] = useState(false)

  function toggleWallNode(node) {
    let newNodes = { ...nodes }
    newNodes[node].isWallNode = !newNodes[node].isWallNode
    setNodes(newNodes)
  }

  function resetStartNode(newStartNode) {
    let newNodes = { ...nodes }
    let prevStartNode = startNode(nodes)
    // for (let node in newNodes) {
    // if (newNodes[node].isStartNode) {
    newNodes[prevStartNode].isStartNode = false
    // }
    // }
    newNodes[newStartNode].isStartNode = true
    setNodes(newNodes)
  }

  function resetEndNode(newEndNode) {
    let newNodes = { ...nodes }
    let prevEndNode = endNode(nodes)
    // for (let node in newNodes) {
    // if (newNodes[node].isStartNode) {
    newNodes[prevEndNode].isEndNode = false
    // }
    // }
    newNodes[newEndNode].isEndNode = true
    setNodes(newNodes)
  }

  function onMouseDown(e) {
    setMouseIsPressed(true)
    const pressedNode = e.target.id
    // console.log(nodes[pressedNode])
    // if (pressedNode === startNode) setStartNodePressed(true)
    // if (pressedNode === nodes.startNode) setStartNodePressed(true)

    if (nodes[pressedNode].isEndNode) setEndNodePressed(true)
    if (nodes[pressedNode].isStartNode) setStartNodePressed(true)
    if (!nodes[pressedNode].isStartNode && !nodes[pressedNode].isEndNode) {
      toggleWallNode(pressedNode)
    }
  }

  function onMouseEnter(e) {
    // if (!mouseIsPressed) return
    // if (!mouseIsPressed) return
    const enteredNode = e.target.id

    if (startNodePressed && !nodes[enteredNode].isWallNode && !nodes[enteredNode].isEndNode) {
      resetStartNode(enteredNode)
      // setStartNode(e.target.id)
      // if (visualizationDone) setRecompute(prev => !prev)
    }

    if (endNodePressed && !nodes[enteredNode].isWallNode && !nodes[enteredNode].isStartNode) {
      resetEndNode(enteredNode)
      // setEndNode(e.target.id)
      // if (visualizationDone) setRecompute(prev => !prev)
    }

    if (
      !startNodePressed &&
      !endNodePressed &&
      !nodes[enteredNode].isStartNode &&
      !nodes[enteredNode].isEndNode
    ) {
      toggleWallNode(enteredNode)
      // if (visualizationDone) setRecompute(prev => !prev)
    }
  }

  function onMouseUp() {
    setMouseIsPressed(false)
    setStartNodePressed(false)
    setEndNodePressed(false)
  }

  function buildGrid() {
    const rows = []
    for (let i = 1; i <= totalRows; i++) {
      const colNodes = []
      for (let j = 1; j <= totalCols; j++) {
        let currentNode = nodes[`r${i}c${j}`]
        colNodes.push(
          <Node
            key={currentNode.value}
            id={currentNode.value}
            isStartNode={currentNode.isStartNode}
            isEndNode={currentNode.isEndNode}
            isWallNode={currentNode.isWallNode}
            onMouseUp={onMouseUp}
            onMouseDown={onMouseDown}
            onMouseEnter={onMouseEnter}
            mouseIsPressed={mouseIsPressed}
            nodeRefs={nodeRefs}
          />
        )
      }
      rows.push(
        <tr key={`r${i}`} id={`r${i}`}>
          {colNodes}
        </tr>
      )
    }
    return rows
  }

  function handleAnimationEnd(e) {
    if (e.target.id !== endNode(nodes)) return
    setTimeout(() => {
      setIsAnimating(false)
    }, 400)
    setAnimationDone(true)
  }

  return (
    <table
      className="grid"
      onAnimationEnd={isAnimating ? e => handleAnimationEnd(e) : null}
      style={isAnimating ? { pointerEvents: 'none' } : {}}
    >
      {<tbody>{buildGrid()}</tbody>}
    </table>
  )
}

export default Grid