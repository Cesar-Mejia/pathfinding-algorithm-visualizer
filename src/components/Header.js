import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap'
import { useState, useContext, useEffect } from 'react'
import { nodesContext } from '../App'
import { dijkstra, aStar, DFS_recursive } from '../algorithms'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Header.css'

function Header({
  // startNode,
  // endNode,
  totalRows,
  totalCols,
  nodeRefs,
  isAnimating,
  setIsAnimating,
  animationDone,
  setAnimationDone,
  chosenAlgorithm,
  setChosenAlgorithm,
  // initializeNodes,
  visualizationDone,
  setVisualizationDone,
  // chosenAlgorithm,
  // setChosenAlgorithm,
  // visitedNodes,
  // setVisitedNodes,
  // shortestPath,
  // setShortestPath,

  resetNodes
}) {
  const [nodes, setNodes] = useContext(nodesContext)
  const [visitedNodes, setVisitedNodes] = useState([])
  const [shortestPath, setShortestPath] = useState([])

  useEffect(() => {
    activateAlgorithm()
  }, [nodes, chosenAlgorithm])

  useEffect(() => {
    if (animationDone) recomputeColors()
  }, [shortestPath])

  function animateAlgorithm() {
    setIsAnimating(true)
    clearAnimations()
    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        setTimeout(() => {
          animateShortestPath()
        }, 10 * i)
        return
      }
      setTimeout(() => {
        const node = visitedNodes[i]
        const nodeElement = nodeRefs.current[node]
        const currentClass = nodeElement.className
        nodeElement.className = currentClass + ' node-visited'
      }, 10 * i)
    }
  }

  function animateShortestPath() {
    for (let i = 0; i < shortestPath.length; i++) {
      setTimeout(() => {
        const node = shortestPath[i]
        const nodeElement = nodeRefs.current[node]
        const currentClass = nodeElement.className
        nodeElement.className = currentClass + ' node-final-path'
      }, 50 * i)
    }
  }

  function chooseAlgorithm(e) {
    setChosenAlgorithm(e.target.innerHTML)
  }

  function activateAlgorithm() {
    switch (chosenAlgorithm) {
      case "Dijkstra's":
        const dijstraResults = dijkstra(nodes, totalRows, totalCols)
        setVisitedNodes(dijstraResults.visitedNodes)
        setShortestPath(dijstraResults.shortestPath)
        break
      case 'A*':
        const aStarResults = aStar(nodes, totalRows, totalCols)
        setVisitedNodes(aStarResults.visitedNodes)
        setShortestPath(aStarResults.shortestPath)
        break
      case 'Depth First':
        const dfsResults = DFS_recursive(nodes, totalRows, totalCols)
        setVisitedNodes(dfsResults.visitedNodes)
        setShortestPath(dfsResults.shortestPath)
        break
      case 'Breadth First':
        const breadthFirstResults = dijkstra(nodes, totalRows, totalCols)
        setVisitedNodes(breadthFirstResults.visitedNodes)
        setShortestPath(breadthFirstResults.shortestPath)
        break
    }
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

  function clearBoard() {
    setAnimationDone(false)
    clearAnimations()
    let newNodes = { ...nodes }
    for (let node in newNodes) {
      if (newNodes[node].isWallNode) {
        newNodes[node].isWallNode = false
      }
    }
    setNodes(newNodes)
  }

  function recomputeColors() {
    clearAnimations()
    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        for (let j = 0; j < shortestPath.length; j++) {
          let node2 = shortestPath[j]
          const node2Element = nodeRefs.current[node2]
          const currentClass2 = node2Element.className
          node2Element.className = currentClass2 + ' node-final-path-recompute'
        }
        break
      }
      let node1 = visitedNodes[i]
      const node1Element = nodeRefs.current[node1]
      const currentClass1 = node1Element.className
      node1Element.className = currentClass1 + ' node-visited-recompute'
    }
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" className="navbar">
        <Container>
          <Navbar.Brand>Pathifinding Algorithm Visualizer</Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown
                title="Algorithms"
                id="basic-nav-dropdown"
                className="nav-dropdown"
                disabled={isAnimating}
              >
                <NavDropdown.Item onClick={e => chooseAlgorithm(e)}>Dijkstra's</NavDropdown.Item>
                <NavDropdown.Item onClick={e => chooseAlgorithm(e)}>A*</NavDropdown.Item>
                <NavDropdown.Item onClick={e => chooseAlgorithm(e)}>Depth First</NavDropdown.Item>
                <NavDropdown.Item onClick={e => chooseAlgorithm(e)}>Breadth First</NavDropdown.Item>
              </NavDropdown>
              <Button
                variant="light"
                onClick={animateAlgorithm}
                disabled={isAnimating}
              >{`Visualize!`}</Button>
              <Button variant="dark" onClick={clearBoard} disabled={isAnimating}>
                {`Clear Board`}{' '}
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
