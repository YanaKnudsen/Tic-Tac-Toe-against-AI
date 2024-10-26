import {useEffect, useState} from 'react'
import"./GameStyle.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons'

function App() {
    const [board,setBoard]=useState<string[]>(Array(9).fill(''));
    const [isX,setIsX]=useState<boolean>(true);
    const [status,setStatus]=useState<boolean>(true);


    useEffect(() => {
    }, []);

    function resetGame():void{
        setBoard(Array(9).fill(''));
        setIsX(true);
        setStatus(true);
    }
    function handleCellClick(idx:number):void{
        const newBoard:string[] = [...board];
        newBoard[idx] =isX? "X":"O";
        setBoard(newBoard);
        setIsX(!isX);


    }

    useEffect(() => {
        const winner = calculateWinner(board);
        console.log(winner);
        if (winner){
            console.log("winner is", winner)
            setStatus(false);

        }
    }, [board]);

    useEffect(() => {
        if(!status){
           alert("Game over")
        }
    }, [status]);

    function calculateWinner(currentBoard:string[]):string|null{
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a]=="X"&&board[b]=="X"&&board[c]=="X"){
                return "X";
            }
            if (board[a]=="O"&&board[b]=="O"&&board[c]=="O"){
                return "O";
            }
        }



        return null;


    }





/*
    const calculateWinner = (squares: string[]): string | null => {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }

        return null;
    };
*/


  return (

    <div className="main">
        <h2>Tic-Tac-Toe</h2>

      <div className="board">
          {
              board.map((val,idx) => {
                  return(
                      <div key={idx} className="cell" onClick={() => handleCellClick(idx)}>
                          {board[idx]==="X"?(<FontAwesomeIcon icon={faXmark} className="icon"/>):null}
                          {board[idx]==="O"?(<FontAwesomeIcon icon={faCircle} className="icon"/>):null}
                      </div>
                  )
              })
          }


      </div>
        <div className="btn" onClick={resetGame}>Reset</div>

    </div>
  )
}

export default App
