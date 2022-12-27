import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap'
import { useState, useContext, useEffect } from 'react'
import { nodesContext } from '../App'
import { dijkstra, aStar, DFS_recursive, greedy_BFS } from '../algorithms'
import { borderNodes, recursiveBacktrackingm, randomWallNodes } from '../mazes'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Header.css'

function Header({
  totalRows,
  totalCols,
  nodeRefs,
  isAnimating,
  setIsAnimating,
  animationDone,
  setAnimationDone,
  chosenAlgorithm,
  setChosenAlgorithm,
  setSelectedMaze
}) {
  const [nodes, setNodes] = useContext(nodesContext)
  const [visitedNodes, setVisitedNodes] = useState([])
  const [shortestPath, setShortestPath] = useState([])

  // const [mazeNodes, setMazeNodes] = useState(null)

  useEffect(() => {
    activateAlgorithm()
  }, [nodes, chosenAlgorithm])

  useEffect(() => {
    if (animationDone) {
      recomputeColors()
    }
  }, [visitedNodes])

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
    console.log('activate algorithm')
    switch (chosenAlgorithm) {
      case "Dijkstra's Algorithm":
        const dijstraResults = dijkstra(nodes, totalRows, totalCols)
        setShortestPath(dijstraResults.shortestPath)
        setVisitedNodes(dijstraResults.visitedNodes)
        break
      case 'A* Search Algorithm':
        const aStarResults = aStar(nodes, totalRows, totalCols)
        setShortestPath(aStarResults.shortestPath)
        setVisitedNodes(aStarResults.visitedNodes)
        break
      case 'Depth First Search':
        const dfsResults = DFS_recursive(nodes, totalRows, totalCols)
        setShortestPath(dfsResults.shortestPath)
        setVisitedNodes(dfsResults.visitedNodes)
        break
      case 'Breadth First Search':
        const breadthFirstResults = dijkstra(nodes, totalRows, totalCols)
        setShortestPath(breadthFirstResults.shortestPath)
        setVisitedNodes(breadthFirstResults.visitedNodes)
        break
      case 'Greedy Best First Search':
        console.log('greedy')
        const greedy_BFSResults = greedy_BFS(nodes, totalRows, totalCols)
        setShortestPath(greedy_BFSResults.shortestPath)
        setVisitedNodes(greedy_BFSResults.visitedNodes)
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
    setSelectedMaze(null)
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

  function handleMazeSelection(e) {
    clearBoard()
    let result = randomWallNodes(nodes, totalRows, totalCols)
    let newNodes = { ...nodes }
    for (let i = 0; i < result.length; i++) {
      let node = result[i]
      newNodes[node].isWallNode = true
    }
    setNodes(newNodes)
    setSelectedMaze(e.target.innerHTML)
  }

  // function animateMaze() {}

  // useEffect(() => {
  //   if (mazeNodes) {
  //     let newNodes = { ...nodes }

  //     for (let i = 0; i <= mazeNodes.length; i++) {
  //       if (i === mazeNodes.length) {
  //         setNodes(newNodes)
  //         break
  //       }
  //       setTimeout(() => {
  //         if (i === mazeNodes.length - 1) console.log('animating')
  //         const node = mazeNodes[i]
  //         const nodeElement = nodeRefs.current[node]
  //         const currentClass = nodeElement.className
  //         nodeElement.className = currentClass + ' node-wall-animated'
  //         newNodes[node].isWallNode = true
  //       }, 10 * i)
  //     }
  //   }
  // }, [mazeNodes])

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
                <NavDropdown.Item onClick={e => chooseAlgorithm(e)}>
                  Dijkstra's Algorithm
                </NavDropdown.Item>
                <NavDropdown.Item onClick={e => chooseAlgorithm(e)}>
                  A* Search Algorithm
                </NavDropdown.Item>
                <NavDropdown.Item onClick={e => chooseAlgorithm(e)}>
                  Greedy Best First Search
                </NavDropdown.Item>
                <NavDropdown.Item onClick={e => chooseAlgorithm(e)}>
                  Breadth First Search
                </NavDropdown.Item>
                <NavDropdown.Item onClick={e => chooseAlgorithm(e)}>
                  Depth First Search
                </NavDropdown.Item>
              </NavDropdown>

              <Button
                variant="light"
                onClick={animateAlgorithm}
                disabled={isAnimating}
              >{`Visualize!`}</Button>
              <NavDropdown
                title="Add Maze"
                id="basic-nav-dropdown"
                className="nav-dropdown"
                disabled={isAnimating}
              >
                <NavDropdown.Item onClick={e => handleMazeSelection(e)}>
                  Random Walls
                </NavDropdown.Item>
              </NavDropdown>
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
