import './Node.css'
function Node({
  id,
  isStartNode,
  isEndNode,
  isWallNode,
  onMouseUp,
  onMouseDown,
  onMouseEnter,
  mouseIsPressed,
  nodeRefs
}) {
  // set conditional class given end/start/wall node
  const conditionalClass = isEndNode
    ? 'node-end'
    : isStartNode
    ? 'node-start'
    : isWallNode
    ? 'node-wall'
    : ''

  // handles mouse enter in node
  function handleMouseEnter(e) {
    if (mouseIsPressed) onMouseEnter(e)
  }

  return (
    <td
      id={id}
      ref={element => (nodeRefs.current[id] = element)}
      className={`node ${conditionalClass}`}
      onMouseUp={onMouseUp}
      onMouseDown={e => onMouseDown(e)}
      onMouseEnter={e => handleMouseEnter(e)}
    ></td>
  )
}

export default Node
