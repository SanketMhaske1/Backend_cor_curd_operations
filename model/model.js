const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.DATABASEPASSWORD,
  port: process.env.DATABASEPORT,
});

const customers = {
  async getAll(req, res) {
    try {
      const result = await pool.query("SELECT * FROM customers");
      res.status(200).json({
        success: true,
        message: "All Customer Data",
        data: result.rows,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Error fetching customers",
      });
    }
  },

  async create(req, res) {
    try {
      const { name, email, phone } = req.body;
      const result = await pool.query(
        "INSERT INTO customers (name, email, phone) VALUES ($1, $2, $3) RETURNING *",
        [name, email, phone]
      );
      res.status(200).json({
        success: true,
        message: "Customer Data",
        data: result.rows[0],
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Error creating customer",
        data: err,
      });
    }
  },

  async getOne(req, res) {
    try {
      const id = parseInt(req.query.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid customer ID",
          data: err,
        });
      }
      const result = await pool.query("SELECT * FROM customers WHERE id = $1", [
        id,
      ]);
      res.json();
      return res.status(200).json({
        success: true,
        message: " customer Data",
        data: result.rows[0],
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Error creating customer",
        data: err,
      });
    }
  },

  // New method to handle query parameter
  async getOneByQuery(req, res) {
    try {
      const id = parseInt(req.query.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid customer ID",
        });
      }
      const result = await pool.query("SELECT * FROM customers WHERE id = $1", [
        id,
      ]);
      res.json();
      res.status(400).json({
        success: false,
        message: "Invalid customer ID",
      });
    } catch (err) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }
  },

  async update(req, res) {
    try {
      const id = parseInt(req.params.id);
      const { name, email, phone } = req.body;
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid customer ID" });
      }
      const result = await pool.query(
        "UPDATE customers SET name = $1, email = $2, phone = $3 WHERE id = $4 RETURNING *",
        [name, email, phone, id]
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error updating customer" });
    }
  },

  async delete(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid customer ID" });
      }
      await pool.query("DELETE FROM customers WHERE id = $1", [id]);
      res.json({ message: "Customer deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleting customer" });
    }
  },
};

module.exports = customers;
