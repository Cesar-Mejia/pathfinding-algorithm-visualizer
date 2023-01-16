import Figure from 'react-bootstrap/Figure'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Information.css'

function Information({ chosenAlgorithm, selectedMaze, animationSpeed }) {
  return (
    <div className="info-container">
      <div className="info d-flex justify-content-around">
        <Figure className="text-center">
          <Figure.Image width={25} height={25} className="info-start-node" />
          <Figure.Caption className="caption">Start Node</Figure.Caption>
        </Figure>
        <Figure className="text-center">
          <Figure.Image width={25} height={25} className="info-end-node" />
          <Figure.Caption className="caption">End Node</Figure.Caption>
        </Figure>
        <Figure className="text-center">
          <Figure.Image width={25} height={25} className="info-wall-node" />
          <Figure.Caption className="caption">Wall Node</Figure.Caption>
        </Figure>
        <Figure className="text-center">
          <Figure.Image width={25} height={25} className="info-visited-node" />
          <Figure.Caption className="caption">Visited Node</Figure.Caption>
        </Figure>
        <Figure className="text-center">
          <Figure.Image width={25} height={25} className="info-shortest-path-node" />
          <Figure.Caption className="caption">Shortest Path Node</Figure.Caption>
        </Figure>
        <Figure className="text-center">
          <Figure.Image
            width={25}
            height={25}
            className="info-unvisited-node border border-secondary"
          />
          <Figure.Caption className="caption">Unvisited Node</Figure.Caption>
        </Figure>
      </div>

      <div className="current-selections">
        <p className="info-current-algorithm">
          <span style={{ fontWeight: 'bold' }}>Current Algorithm:</span> {chosenAlgorithm}
        </p>
        {selectedMaze && (
          <p className="info-current-algorithm">
            <span style={{ fontWeight: 'bold' }}>Current Maze:</span> {selectedMaze}
          </p>
        )}
        <p className="info-current-algorithm">
          <span style={{ fontWeight: 'bold' }}>Animation Speed:</span> {animationSpeed}
        </p>
      </div>
    </div>
  )
}

export default Information
