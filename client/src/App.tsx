import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import"./GameStyle.scss"

function App() {
    const [board,setBoard]=useState<number[]>(Array(9).fill(0));

    useEffect(() => {
       // setBoard(Array(9).fill(''));
    }, []);

    function resetGame():void{
        console.log(board);
      setBoard(Array(9).fill(''));
    }
    function handleCellClick(idx:number):void{
        const newBoard:number[] = board;
        newBoard[idx] = 1;
        setBoard(newBoard);
        console.log(board);

    }

   /* const handleCellClick = (index: number) => {
        if (board[index] || calculateWinner(board)) return;

        const newBoard = [...board];
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        const winner = calculateWinner(newBoard);

        if (winner) {
            setStatus(`Player ${winner} Wins!`);
        } else if (!newBoard.includes('')) {
            setStatus("It's a Draw!");
        } else {
            setIsXNext(!isXNext);
            setStatus(`Player ${isXNext ? 'O' : 'X'}'s turn`);
        }
    };*/

  return (

    <div className="main">
        <h2>Tic-Tac-Toe</h2>

      <div className="board">
          {
              board.map((val,idx) => {
                  return(
                  <div key={idx} className="cell" onClick={() => handleCellClick(idx)}/>
                  )
              })
          }


      </div>
        <div className="btn" onClick={resetGame}>Reset</div>

    </div>
  )
}

export default App
