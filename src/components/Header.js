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
  // setIsAnimating,
  // initializeNodes,
  visualizationDone,
  setVisualizationDone,
  // chosenAlgorithm,
  // setChosenAlgorithm,
  // visitedNodes,
  // setVisitedNodes,
  // shortestPath,
  // setShortestPath,
  clearAnimations,
  resetNodes
}) {
  const [nodes, setNodes] = useContext(nodesContext)
  const [visitedNodes, setVisitedNodes] = useState([])
  const [shortestPath, setShortestPath] = useState([])
  const [chosenAlgorithm, setChosenAlgorithm] = useState("Dijkstra's")

  useEffect(() => {
    activateAlgorithm()
  }, [nodes])

  function animateAlgorithm() {
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
    // setIsAnimating(true)
    // resetNodes()
    switch (chosenAlgorithm) {
      case "Dijkstra's":
        const dijstraResults = dijkstra(nodes, totalRows, totalCols)
        setVisitedNodes(dijstraResults.visitedNodes)
        setShortestPath(dijstraResults.shortestPath)
        break
      case 'A*':
        const aStarResults = aStar(nodes, nodes.startNode, nodes.endNode, totalRows, totalCols)
        setVisitedNodes(aStarResults.visitedNodes)
        setShortestPath(aStarResults.shortestPath)
        break
      case 'Depth First':
        const dfsResults = DFS_recursive(
          nodes,
          nodes.startNode,
          nodes.endNode,
          totalRows,
          totalCols
        )
        setVisitedNodes(dfsResults.visitedNodes)
        setShortestPath(dfsResults.shortestPath)
        break
      case 'Breadth First':
        const breadthFirstResults = dijkstra(
          nodes,
          nodes.startNode,
          nodes.endNode,
          totalRows,
          totalCols
        )
        setVisitedNodes(breadthFirstResults.visitedNodes)
        setShortestPath(breadthFirstResults.shortestPath)
        break
    }
  }

  function clearBoard() {
    clearAnimations()
    // setNodes(initializeNodes())
    setVisualizationDone(false)
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
                disabled={isAnimating || visualizationDone}
              >
                <NavDropdown.Item onClick={e => chooseAlgorithm(e)}>Dijkstra's</NavDropdown.Item>
                <NavDropdown.Item onClick={e => chooseAlgorithm(e)}>A*</NavDropdown.Item>
                <NavDropdown.Item onClick={e => chooseAlgorithm(e)}>Depth First</NavDropdown.Item>
                <NavDropdown.Item onClick={e => chooseAlgorithm(e)}>Breadth First</NavDropdown.Item>
              </NavDropdown>
              <Button
                variant="light"
                className="btn animated"
                onClick={animateAlgorithm}
                disabled={isAnimating || visualizationDone}
              >{`Visualize ${chosenAlgorithm}!`}</Button>
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
