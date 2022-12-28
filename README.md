# Pathfinding Algorithm Visualizer

 This project allows you to visualize how different pathfinding algorithms work to find the shortest path between two points. The visualizer was built using React and Bootstrap.

## Algorithms

The following pathfinding algorithms are implemented in this visualizer:

- Dijkstra's Algorithm
- A* Search
- Depth First Search (DFS)
- Breadth First Search (BFS)
- Greedy Best-First Search

### Dijkstra's Algorithm

Dijkstra's Algorithm is a graph search algorithm that works by iteratively computing the cost of reaching a node from the start node. It is guaranteed to find the shortest path between the start and end nodes.

### A* Search

A* Search is a heuristic search algorithm that uses a combination of the cost to reach a node from the start and an estimate of the cost to reach the end node from that node to guide its search. It is guaranteed to find the shortest path between the start and end nodes. The heuristic used in this project is the manhattan distance between nodes.

### Depth First Search (DFS)

Depth First Search explores nodes as deep as possible along a branch before backtracking. It is not guaranteed to find the shortest path between the start and end nodes.

### Breadth First Search (BFS)

Breadth First Search visits all of the neighbor nodes at the present depth level before moving on to the nodes at the next depth level. It is guaranteed to find the shortest path between the start and end nodes, assuming that the graph is unweighted.

### Greedy Best-First Search

Greedy Best-First Search prioritizes exploring nodes that are closest to the end node, as estimated by a heuristic function. The heuristic function used in this project is the manhattan distance between nodes. It is not guaranteed to find the shortest path between the start and end nodes.

## Mazes

The following mazes are available to use in the visualizer:

- Binary Tree Maze
- Recursive Backtracking Maze
- Aldous-Broder Maze

