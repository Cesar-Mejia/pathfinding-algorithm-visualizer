import { useState, useContext } from 'react'
import { nodesContext } from '../App'
import { startNode, endNode } from '../algorithms'
import Node from './Node'
import './Grid.css'

function Grid({ totalRows, totalCols, nodeRefs, isAnimating }) {
  const [nodes, setNodes] = useContext(nodesContext)

  const [startNodePressed, setStartNodePressed] = useState(false)
  const [endNodePressed, setEndNodePressed] = useState(false)
  const [mouseIsPressed, setMouseIsPressed] = useState(false)

  // function to toggle wall node
  function toggleWallNode(node) {
    let newNodes = { ...nodes }
    newNodes[node].isWallNode = !newNodes[node].isWallNode
    setNodes(newNodes)
  }

  // resets the start node location
  function resetStartNode(newStartNode) {
    let newNodes = { ...nodes }
    let prevStartNode = startNode(nodes)

    newNodes[prevStartNode].isStartNode = false

    newNodes[newStartNode].isStartNode = true
    setNodes(newNodes)
  }

  // resets end node location
  function resetEndNode(newEndNode) {
    let newNodes = { ...nodes }
    let prevEndNode = endNode(nodes)

    newNodes[prevEndNode].isEndNode = false

    newNodes[newEndNode].isEndNode = true
    setNodes(newNodes)
  }

  // handles mouse down - resets start/end node
  function onMouseDown(e) {
    setMouseIsPressed(true)
    const pressedNode = e.target.id

    if (nodes[pressedNode].isEndNode) setEndNodePressed(true)
    if (nodes[pressedNode].isStartNode) setStartNodePressed(true)
    if (!nodes[pressedNode].isStartNode && !nodes[pressedNode].isEndNode) {
      toggleWallNode(pressedNode)
    }
  }

  // resets start/end nodes on mouse enter on node
  function onMouseEnter(e) {
    const enteredNode = e.target.id

    if (startNodePressed && !nodes[enteredNode].isWallNode && !nodes[enteredNode].isEndNode) {
      resetStartNode(enteredNode)
    }

    if (endNodePressed && !nodes[enteredNode].isWallNode && !nodes[enteredNode].isStartNode) {
      resetEndNode(enteredNode)
    }

    if (
      !startNodePressed &&
      !endNodePressed &&
      !nodes[enteredNode].isStartNode &&
      !nodes[enteredNode].isEndNode
    ) {
      toggleWallNode(enteredNode)
    }
  }

  // resets state on mouse up
  function onMouseUp() {
    setMouseIsPressed(false)
    setStartNodePressed(false)
    setEndNodePressed(false)
  }

  // builds grid given totalRows, totalCols
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

  return (
    <table className="grid" style={isAnimating ? { pointerEvents: 'none' } : {}}>
      {<tbody>{buildGrid()}</tbody>}
    </table>
  )
}

export default Grid
