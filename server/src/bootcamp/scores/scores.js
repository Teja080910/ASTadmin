import { db } from "../../db.js"

export const Scores = async (task1score,task2score,res) =>{
    
    try {
        const scores = await db.collection("Scores").insertOne({ Task1:task1score,Task2:task2score})
        
    } catch (error) {
        console.log(error)
    }
}
