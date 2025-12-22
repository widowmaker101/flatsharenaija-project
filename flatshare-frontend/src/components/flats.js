import express from 'express'
import db from '../db.js'   // assuming you have a db connection helper

const router = express.Router()

// GET /flats?location=Abuja&price_lte=50000
router.get('/', async (req, res) => {
  try {
    const { location, price_lte } = req.query
    let query = 'SELECT * FROM flats WHERE 1=1'
    const params = []

    if (location) {
      params.push(location)
      query += ` AND location ILIKE '%' || $${params.length} || '%'`
    }
    if (price_lte) {
      params.push(price_lte)
      query += ` AND price <= $${params.length}`
    }

    const result = await db.query(query, params)
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// POST /flats
router.post('/', async (req, res) => {
  try {
    const { title, location, price, rooms, description, image_url } = req.body
    const result = await db.query(
      `INSERT INTO flats (title, location, price, rooms, description, image_url)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [title, location, price, rooms, description, image_url]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
