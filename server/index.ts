
const express = require('express');

const cors=require('cors');
const mongoose = require("mongoose");
const app=express();
app.use(express.static('assets'));
require('dotenv').config();
const corsOptions ={
    origin:'http://localhost:5175',
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(express.json());


/*app.post('/signup', async (req,res)=>{

});*/

type Player = 'X' | 'O' | '';
type GameState = Player[];

class TicTacToe{
    private board: GameState;
    private currentPlayer: Player;
    private gameActive = true;
    private statusDisplay = document.getElementById('status')!;

    constructor(){
        this.initializeGame();
    }


    initializeGame() {
        document.querySelectorAll('.cell').forEach((cell) =>
            cell.addEventListener('click', (e) => this.handleCellClick(e))
        );
        document.getElementById('reset')!.addEventListener('click', () =>
            this.resetGame()
        );
        this.updateStatus();
    }
}




app.listen(3000,()=>{
    console.log("server is running");
});
