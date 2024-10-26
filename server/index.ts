"use server";

const express = require('express');
import OpenAI from "openai";


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

const openai = new OpenAI({
    apiKey: process.env.API_KEY,
});



app.post('/aiMove', async (req:Request,res:Response)=>{
  const {board}=req.body;
  const prompt = generatePrompt(board);
  const aiMove = await getAIMove(prompt);
  const index = aiMove.indexOf("**");
    console.log(aiMove.substring(index, 3));
});


function generatePrompt(board:string[]):string{
    return `You are playing Tic Tac Toe. 'X' indicates cell chosen by your opponent. You cannot choose cells that are already occupied by 'X'. The current board state is:
${board.map((cell, i) => (cell || '-')).join(' ')}
Return the index (0-8) for the best move.`;
}

async function getAIMove(prompt:string):Promise<string>{

     const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are playing a game of Tic Tac Toe. Your goal is to win. 'X' indicates cell chosen by your opponent.  Respond with the index (0-8) where you want to place 'O'. You cannot place 'O' on cells that are already occupied by 'X'. Write the answer in form: ' **$index**'." },
            {
                role: "user",
                content: prompt,
            },
        ],
    });

    return completion.choices[0].message.content;

}
/*
 const getAIMove = async (prompt: string): Promise<number | null> => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          model: 'text-davinci-003', // or 'gpt-4' if available
          prompt,
          max_tokens: 10,
          temperature: 0.1,
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const move = parseInt(response.data.choices[0].text.trim(), 10);
      return !isNaN(move) && board[move] === '' ? move : null;
    } catch (error) {
      console.error('Error getting AI move:', error);
      return null;
    }
  };
 */



app.listen(3000,()=>{
    console.log("server is running");
});
