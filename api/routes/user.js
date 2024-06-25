import express from "express";

const router = express.Router();

router.get('/register',(req,res)=>{
    res.send("Abar eli tui");
})

export default router;