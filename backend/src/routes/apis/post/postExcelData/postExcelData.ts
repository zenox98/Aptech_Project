import express, {Router, Request, Response} from "express";
import db from "../../../../config/db.ts";  // Correct db import

const router : Router = express.Router(); // Use express.Router()

router.post('/', async (req: Request, res: Response) => { // Correct the router method to post
  try {
    const response = req.body
    console.log(response)
    res.status(201).json({
      response
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: 'Error in createNewTable'})
  }
})

export default router;
