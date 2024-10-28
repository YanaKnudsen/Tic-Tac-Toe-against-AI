import {useEffect, useState} from 'react'
import"./GameStyle.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import AxiosInstance from "./axios/AxiosInstance.tsx"

function App() {
    const [board,setBoard]=useState<string[]>(Array(9).fill(''));
    const [isX,setIsX]=useState<boolean>(true);
    const [status,setStatus]=useState<boolean>(true);
    const [winnerName,setWinnerName]=useState<string>("");
    const [aiMove,setAiMove]=useState<string>("");
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


    useEffect(() => {
    }, []);

    function resetGame():void{
        setBoard(Array(9).fill(''));
        setIsX(true);
        setStatus(true);
    }
    function handleCellClick(idx:number):void{
        const newBoard:string[] = [...board];
        if (newBoard[idx]==""){
            newBoard[idx] =isX? "X":"O";
            setIsX(!isX);
            setBoard(newBoard);

        }


    }

    useEffect(() => {
        const winner = calculateWinner(board);
        console.log(winner);
        if (winner){
            setStatus(false);
            setWinnerName(isX?"X":"O");
        }
        else if (!board.includes('')){
            console.log("no one wins")
            setStatus(false);
        }
        else if (!isX){
            makeAIMove();
        }
    }, [board]);

    useEffect(() => {
        if(!status){
            alert(`Game over. Winner is ${!winnerName}`);
            resetGame();
        }
    }, [status]);

    function makeAIMove():void{
        console.log("board before ai move",board)
        AxiosInstance.post('/aiMove', {board,winPatterns},{withCredentials:true})
            .then(res => {
                checkAIMove(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }


    useEffect(() => {
        if (aiMove){
            const newBoard = [...board];
            newBoard[aiMove] = 'O';
            setIsX(!isX);
            setBoard(newBoard);
        }
    }, [aiMove]);


    function checkAIMove(aiMove:string):void{
        let emptyCells= board.map((elm, idx) => elm !== "" ? idx : null).filter((val) => val !== null);
        console.log("emptyCells",emptyCells);
        if (emptyCells.includes(Number(aiMove))){
            console.log("bad ai move");
            makeAIMove();
        }
        else{
             setAiMove(aiMove);
        }

    }



    function calculateWinner(currentBoard:string[]):string|null{

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
