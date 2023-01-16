import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Button,
  Popover,
  OverlayTrigger
} from 'react-bootstrap'
import { useState, useContext, useEffect } from 'react'
import { nodesContext } from '../App'
import { dijkstra, aStar, DFS_recursive, greedy_BFS } from '../algorithms'
import {
  randomWallNodes,
  binaryTree,
  recursiveBackTracking,
  aldousBroder,
  recursiveBackTracking_narrow
} from '../mazes'
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
  setSelectedMaze,
  animationSpeed,
  setAnimationSpeed
}) {
  const [nodes, setNodes] = useContext(nodesContext)
  const [visitedNodes, setVisitedNodes] = useState([])
  const [shortestPath, setShortestPath] = useState([])
  const [visitedSpeed, setVisitedSpeed] = useState(10)

  // activates algorithm given change in nodes/chosen algorithms
  useEffect(() => {
    if (animationDone) {
      activateAlgorithm()
    }
  }, [nodes, chosenAlgorithm])

  // animates algorithms for initial activation and recomputation
  useEffect(() => {
    if (animationDone) {
      recomputeColors()
    } else if (visitedNodes.length) {
      animateAlgorithm()
    }
  }, [visitedNodes])

  // sets animation speed
  useEffect(() => {
    switch (animationSpeed) {
      case 'Fast':
        setVisitedSpeed(10)
        break
      case 'Medium':
        setVisitedSpeed(20)
        break
      case 'Slow':
        setVisitedSpeed(30)
        break
    }
  }, [animationSpeed])

  // initiates algorithm animations
  function animateAlgorithm() {
    setIsAnimating(true)
    clearAnimations()
    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        setTimeout(() => {
          animateShortestPath()
        }, visitedSpeed * i)
        return
      }
      setTimeout(() => {
        const node = visitedNodes[i]
        const nodeElement = nodeRefs.current[node]
        const currentClass = nodeElement.className
        nodeElement.className = currentClass + ' node-visited'
      }, visitedSpeed * i)
    }
  }

  // helper function for animation of shortest path
  function animateShortestPath() {
    if (shortestPath.length === 0) {
      setIsAnimating(false)
      setAnimationDone(true)
    }
    for (let i = 0; i < shortestPath.length; i++) {
      setTimeout(() => {
        const node = shortestPath[i]
        const nodeElement = nodeRefs.current[node]
        const currentClass = nodeElement.className
        nodeElement.className = currentClass + ' node-final-path'
        if (i === shortestPath.length - 1) {
          setIsAnimating(false)
          setAnimationDone(true)
        }
      }, visitedSpeed * 5 * i)
    }
  }

  // resets chosen algorithm
  function chooseAlgorithm(e) {
    setChosenAlgorithm(e.target.innerHTML)
  }

  // initites pathfinding algorithm given current chosen algorithm
  function activateAlgorithm() {
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
        const greedy_BFSResults = greedy_BFS(nodes, totalRows, totalCols)
        setShortestPath(greedy_BFSResults.shortestPath)
        setVisitedNodes(greedy_BFSResults.visitedNodes)
        break
    }
  }

  // clears animations - keeps walls
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

  // clears board of walls and animations
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

  // recomputes colors on algorithm recomputation
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

  // sets new maze on board
  function handleMazeSelection(e) {
    clearBoard()
    let result
    switch (e.target.innerHTML) {
      case 'Binary Tree Maze':
        result = binaryTree(nodes, totalRows, totalCols)
        break
      case 'Random Wall Nodes':
        result = randomWallNodes(nodes, totalRows, totalCols)
        break
      case 'Recursive Back Tracking (Wide)':
        result = recursiveBackTracking(nodes, totalRows, totalCols)
        break
      case 'Aldous-Broder Maze':
        result = aldousBroder(nodes, totalRows, totalCols)
        break
      case 'Recursive Back Tracking (Narrow)':
        result = recursiveBackTracking_narrow(nodes, totalRows, totalCols)
        break
    }

    let newNodes = { ...nodes }
    for (let i = 0; i < result.length; i++) {
      let node = result[i]
      newNodes[node].isWallNode = true
    }

    setNodes(newNodes)
    setSelectedMaze(e.target.innerHTML)
  }

  // changes animation speed
  function handleAnimationSpeed(e) {
    setAnimationSpeed(e.target.innerHTML)
  }

  // activates algorithm when 'visualize' button clicked
  function handleVisualizeButton() {
    activateAlgorithm()
    setAnimationDone(false)
  }

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h1" align="center">
        Instructions
      </Popover.Header>
      <Popover.Body>
        <ul>
          <li>
            Click and drag to create <i>walls</i>
          </li>
          <li>
            Move <i>start</i> and <i>end</i> nodes
          </li>
          <br></br>
          <li>
            Choose algorithm in <strong>Algorithms</strong> dropdown menu
          </li>
          <li>
            Click <strong>Visualize</strong> to animate chosen algorithm
          </li>
          <li>
            Choose maze in <strong>Add Maze</strong> dropdown menu
          </li>
          <li>
            Click <strong>Animation Speed</strong> to adjust animation speed
          </li>
          <li>
            <strong>Clear Board</strong> resets the board
          </li>
        </ul>
        <p>
          <strong>Tip</strong>: Move Start and End nodes after animation is complete to recompute
          visited nodes and shortest path
        </p>
      </Popover.Body>
    </Popover>
  )

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
                onClick={handleVisualizeButton}
                disabled={isAnimating}
              >{`Visualize!`}</Button>
              <NavDropdown
                title="Add Maze"
                id="basic-nav-dropdown"
                className="nav-dropdown"
                disabled={isAnimating}
              >
                <NavDropdown.Item onClick={e => handleMazeSelection(e)}>
                  Binary Tree Maze
                </NavDropdown.Item>
                <NavDropdown.Item onClick={e => handleMazeSelection(e)}>
                  Recursive Back Tracking (Wide)
                </NavDropdown.Item>
                <NavDropdown.Item onClick={e => handleMazeSelection(e)}>
                  Recursive Back Tracking (Narrow)
                </NavDropdown.Item>
                <NavDropdown.Item onClick={e => handleMazeSelection(e)}>
                  Aldous-Broder Maze
                </NavDropdown.Item>
                <NavDropdown.Item onClick={e => handleMazeSelection(e)}>
                  Random Wall Nodes
                </NavDropdown.Item>
              </NavDropdown>
              <Button variant="dark" onClick={clearBoard} disabled={isAnimating}>
                {`Clear Board`}{' '}
              </Button>
              <NavDropdown
                title="Animation Speed"
                id="basic-nav-dropdown"
                className="nav-dropdown animation-speed"
                disabled={isAnimating}
              >
                <NavDropdown.Item onClick={e => handleAnimationSpeed(e)}>Fast</NavDropdown.Item>
                <NavDropdown.Item onClick={e => handleAnimationSpeed(e)}>Medium</NavDropdown.Item>
                <NavDropdown.Item onClick={e => handleAnimationSpeed(e)}>Slow</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <OverlayTrigger trigger="click" placement="left" overlay={popover} rootClose={true}>
              <Button id="help-button" className="btn" variant="dark">
                ?
              </Button>
            </OverlayTrigger>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
