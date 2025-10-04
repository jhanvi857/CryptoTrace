import ForceGraph2D from "react-force-graph-2d";

export default function GraphView({ graphData, highlightedTag }) {
  return (
    <div className="graph-container">
      <ForceGraph2D
  graphData={graphData}
  nodeAutoColorBy="type"
  linkColor={() => "white"} 
  nodeCanvasObject={(node, ctx) => {
    const label = node.name;
    const fontSize = 9;
    ctx.font = `${fontSize}px Sans-Serif`;
    ctx.fillStyle = node.color;
    ctx.beginPath();
    ctx.arc(node.x, node.y, 6, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillText(label, node.x + 8, node.y + 3);
  }}
  linkDirectionalArrowLength={5}
  linkLabel="label"
/>

    </div>
  );
}
