/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import Square from "./Square";
import { Patterns } from "./WinningPattern";

import { useChannelStateContext, useChatContext } from "stream-chat-react";

export type ResultType = {
  winner: string;
  state: string;
};

export type SetResultType = React.Dispatch<React.SetStateAction<ResultType>>;

interface IProps {
  result: ResultType;
  setResult: SetResultType;
}

const Board = ({ result, setResult }: IProps) => {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);

  const [player, setPlayer] = useState("X");
  const [turn, setTurn] = useState("X");

  const { channel } = useChannelStateContext();
  const { client } = useChatContext();

  useEffect(() => {
    CheckWin()
  },[board])

  const chooseSquare = async (square: number) => {
    if (turn === player && board[square] === "") {
      setTurn(player === "X" ? "O" : "X");

      await channel.sendEvent({
        type: "game-move",
        data: { square, player },
      });

      setBoard(
        board.map((val, idx) => {
          if (idx === square && val === "") {
            return player;
          }
          return val;
        })
      );
    }
  };

  // Define an interface for the event
  interface GameMoveEvent {
    type: "game-move";
    user: { id: string }; // Assuming user has an id property
    data: {
      square: number;
      player: string;
    };
  }

  channel.on((event) => {
    if (event.type == "game-move" && event.user!.id != client.userID) {
      const gameMoveEvent = event as unknown as GameMoveEvent; // Casting the event to GameMoveEvent

      const currentPlayer = gameMoveEvent.data.player === "X" ? "O" : "X";
      setPlayer(currentPlayer);
      setTurn(currentPlayer);

      setBoard(
        board.map((val, idx) => {
          if (idx === gameMoveEvent.data.square && val === "") {
            return gameMoveEvent.data.player;
          }
          return val;
        })
      );
    }
  });

  const CheckWin = () => {
    Patterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];
      if (firstPlayer == "") return;

      let foundWinningPattern = true;
      currPattern.forEach((idx) => {
        if (board[idx] != firstPlayer) {
          foundWinningPattern = false;
        }
      });

      if (foundWinningPattern) {
        alert("Winner", board[currPattern[0]])
        setResult({
          winner: board[currPattern[0]],
          state: "Won",
        });
      }
    });
  };

  return (
    <div className="board bg-yellow- gap-3 border-2 p-3 rounded-xl ">
      {/* columns */}
      <div className=" row  gap-1 bg-red-  ">
        {/* rows */}
        <Square
          chooseSquare={() => {
            chooseSquare(0);
          }}
          val={board[0]}
        />
        <Square
          chooseSquare={() => {
            chooseSquare(1);
          }}
          val={board[1]}
        />
        <Square
          chooseSquare={() => {
            chooseSquare(2);
          }}
          val={board[2]}
        />
      </div>

      <div className="  gap-1 bg-purple- row ">
        <Square
          chooseSquare={() => {
            chooseSquare(3);
          }}
          val={board[3]}
        />
        <Square
          chooseSquare={() => {
            chooseSquare(4);
          }}
          val={board[4]}
        />
        <Square
          chooseSquare={() => {
            chooseSquare(5);
          }}
          val={board[5]}
        />
      </div>

      <div className="  gap-1 bg-blue- row ">
        <Square
          chooseSquare={() => {
            chooseSquare(6);
          }}
          val={board[6]}
        />
        <Square
          chooseSquare={() => {
            chooseSquare(7);
          }}
          val={board[7]}
        />
        <Square
          chooseSquare={() => {
            chooseSquare(8);
          }}
          val={board[8]}
        />
      </div>
    </div>
  );
};

export default Board;
