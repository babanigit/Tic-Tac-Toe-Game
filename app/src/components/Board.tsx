import { useState } from "react";
import Square from "./Square";

const Board = () => {
  const [board, setBoard] = useState(["x", "x", "o", "o", "x", "x", "o", "o", "x"]);

  return (
    <div className="board bg-yellow- gap-3 border-2 p-3 rounded-xl ">
      {/* columns */}
      <div className=" row  gap-1 bg-red-  ">
        {/* rows */}
        <Square  val={board[0]} />
        <Square  val={board[1]} />
        <Square  val={board[2]} />
      </div>

      <div className="  gap-1 bg-purple- row ">
        <Square  val={board[3]} />
        <Square  val={board[4]} />
        <Square  val={board[5]} />
      </div>

      <div className="  gap-1 bg-blue- row ">
        <Square  val={board[6]} />
        <Square  val={board[7]} />
        <Square  val={board[8]} />
      </div>
    </div>
  );
};

export default Board;
