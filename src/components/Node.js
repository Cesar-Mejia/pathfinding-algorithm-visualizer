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
  const conditionalClass = isEndNode
    ? 'node-end'
    : isStartNode
    ? 'node-start'
    : isWallNode
    ? 'node-wall'
    : ''

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
