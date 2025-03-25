import express, { Router, Request, Response } from 'express'

import db from '../../db.ts';

// types
import { ResultSetHeader } from 'mysql2'

const router : Router = express.Router()

router.get('/', async(req : Request, res : Response) => {
  try {
    const [rows] = await db.query('SELECT * FROM product')
    res.json(rows)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error fetching products' })
  }
})


router.get('/name/:name', async(req : Request, res : Response) => {
  try {
    const productName = req.params.name;
    
    // Basic validation
    if (!productName || typeof productName !== 'string' || productName.trim().length === 0) {
      return res.status(400).json({
        message: 'Invalid product name',
      })
    }

    const [rows] = await db.query<any>(
      'SELECT * FROM product WHERE name = ?', [productName]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Product not found',
      })
    }

    res.json(rows);  // Return the first matching product
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error fetching product' })
  }
})


router.post('/ip', async(req : Request, res : Response) => {
  try {
    const { name, amount } = req.body;

    // basic input validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({
        message: 'Name is required and must be a non-empty string',
      })
    }

    if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        message: 'Amount is required and must be a number greater than zero',
      })
    }

    // Insert the product into the database
    const [result] = await db.query<ResultSetHeader>(
      // Use <any> or more specific type if you have one
      `INSERT INTO product (name, amount) VALUES (?, ?)`, [name, amount]
    );

    // result.insertId contains the ID of the newly inserted row

    // Respond with the newly created product (including the ID)
    res.status(201).json({
      id: result.insertId,
      name,
      amount,
      message: 'Product created successfully',
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error creating product' })
  }
})

export default router;
