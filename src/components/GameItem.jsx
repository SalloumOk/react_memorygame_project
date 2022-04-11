import "./GameItem.css";
import * as React from "react";

class GameItem extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div
        className="GameItem-div"
        style={{ backgroundColor: "#" + this.props.value.color }}
      >
        <p>{this.props.value.content}</p>
      </div>
    );
  }
}

export default GameItem;