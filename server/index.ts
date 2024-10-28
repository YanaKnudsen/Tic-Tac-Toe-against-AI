"use server";

const express = require('express');
import OpenAI from "openai";


const cors=require('cors');
const mongoose = require("mongoose");
const app=express();
app.use(express.static('assets'));
require('dotenv').config();
const corsOptions ={
    origin:'http://localhost:5173',
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.API_KEY,
});



app.post('/aiMove', async (req:Request,res:Response)=>{
  const {board,winPatterns}=req.body;
    try{
        const prompt = generatePrompt(board,winPatterns);
        console.log(prompt);
        const aiMove = await getAIMove(prompt);
        console.log(aiMove);
        res.json(aiMove);
    }
    catch(e){
        res.status(422).json(e);
    }

});


function generatePrompt(board:string[],winPatterns:number[]):string{
    return `You are playing Tic Tac Toe. 'X' indicates cell chosen by your opponent and 'O' indicates cells chosen by you. You cannot choose cells that are already occupied by 'X' or 'O'. The current board state is:
${board.map((cell, i) => (cell || 'null')).join(' ')}Patterns to win:${winPatterns}.
Return the index (0-8) for the best move.`;
}

async function getAIMove(prompt:string):Promise<string>{

     const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
        messages: [
            { role: "system", content:prompt},
            {
                role: "user",
                content: "Make your move. Answer only with one word",
            },
        ],
    });

    return completion.choices[0].message.content;

}




app.listen(3000,()=>{
    console.log("server is running");
});
