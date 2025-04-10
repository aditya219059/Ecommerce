import React from 'react'
import contactModel from '../models/contactModel.js';

export const contactController = async (req, res) => {
  try {
    const {name, email, phone, ask} = req.body;
    const query = await new contactModel({
        name, email, phone, ask
    }).save();
    res.status(201).send({
        success: true,
        message: "Query created successfully",
        query,
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
        success: false,
        message: "Error in sending query",
        error,
    })
  }
}

