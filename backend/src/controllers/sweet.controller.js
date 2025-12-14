import { Sweet } from "../models/sweet.models.js";

/* CREATE SWEET */
export const createSweet = async (req, res) => {
  const { name, category, price, quantity } = req.body;

  const sweet = await Sweet.create({
    name,
    category,
    price,
    quantity,
  });

  res.status(201).json(sweet);
};

/* INCREASE SWEET QUANTITY */

export const increaseSweetQuantity = async (req, res) => {
  const { sweetId, quantity } = req.body;

  if (quantity <= 0) {
    return res.status(400).send("Quantity must be positive");
  }

  const sweet = await Sweet.findByIdAndUpdate(
    sweetId,
    { $inc: { quantity } },
    { new: true }
  );

  if (!sweet) {
    return res.status(404).send("Sweet not found");
  }

  res.status(200).json({
    message: "Sweet quantity increased",
    sweet,
  });
};

/* DECREASE SWEET QUANTITY */

export const decreaseSweetQuantity = async (req, res) => {
  const { sweetId, quantity } = req.body;

  if (quantity <= 0) {
    return res.status(400).send("Quantity must be positive");
  }

  const sweet = await Sweet.findById(sweetId);
  if (!sweet) {
    return res.status(404).send("Sweet not found");
  }

  if (sweet.quantity < quantity) {
    return res.status(400).send("Insufficient stock");
  }

  sweet.quantity -= quantity;
  await sweet.save();

  res.status(200).json({
    message: "Sweet quantity decreased",
    sweet,
  });
};

/* UPDATE SWEET PRICE */

export const updateSweetPrice = async (req, res) => {
  const { sweetId, price } = req.body;

  if (price <= 0) {
    return res.status(400).send("Price must be greater than 0");
  }

  const sweet = await Sweet.findByIdAndUpdate(
    sweetId,
    { price },
    { new: true }
  );

  if (!sweet) {
    return res.status(404).send("Sweet not found");
  }

  res.status(200).json({
    message: "Sweet price updated",
    sweet,
  });
};

/* BUY SWEET */
export const buySweet = async (req, res) => {
  const { sweetId, quantity } = req.body;

  const sweet = await Sweet.findById(sweetId);
  if (!sweet) {
    return res.status(404).send("Sweet not found");
  }

  if (sweet.quantity < quantity) {
    return res.status(400).send("Insufficient quantity available");
  }

  sweet.quantity -= quantity;
  await sweet.save();

  res.status(200).send("Purchase successful");
};
