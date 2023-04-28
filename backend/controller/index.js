const mongoose = require("mongoose");
const ProductSchema = require("../models/schemas/food");
const Vendor = require("../models/schemas/vendor");
const CategorySchema = require("../models/schemas/category");
const userSchema = require("../models/schemas/user");

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const session = require('express-session');

exports.getProducts = async (req, res) => {
  try {
    const allProducts = await ProductSchema.find({}).populate('vendor', 'name');
    const totalProducts = await ProductSchema.countDocuments();

    res.json({ allProducts, totalProducts });
  } catch (err) {
    res.json(err);
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await ProductSchema.findById(req.params.id)
    res.json(product);
  } catch (err) {
    res.json(err);
  }
};

exports.getVendors = async (req, res) => {
  try {
    const vendors = await ProductSchema.aggregate([
      {
        $lookup: {
          from: "vendors",
          localField: "vendor",
          foreignField: "_id",
          as: "vendor",
        },
      },
      {
        $unwind: "$vendor",
      },
      {
        $group: {
          _id: "$vendor._id",
          name: { $first: "$vendor.name" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 1,
          name: "$name",
          count: 1,
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ error: "Failed to get vendors" });
  }
};

exports.getVendorProducts = async (req, res) => {
  const categoryId = req.params.id;
  const products = await ProductSchema.find({ vendor: categoryId }).populate('vendor');
  res.send(products);
};

exports.addProduct = async (req, res) => {
  try {
    const newProduct = new ProductSchema(req.body);
    const product = await newProduct.save();
    res.json(product);
  } catch (err) {
    res.json(err);
  }
}

exports.addVendor = async (req, res) => {
  try {
    const newVendor = new Vendor(req.body);
    const vendor = await newVendor.save();
    res.json(vendor);
  } catch (err) {
    res.json(err);
  }
}

exports.addCategory = async (req, res) => {
  try {
    const newCategory = new CategorySchema(req.body);
    const category = await newCategory.save();
    res.json(category);
  } catch (err) {
    res.json(err);
  }
}

exports.getCategories = async (req, res) => {
  try {
    const fcategories = await CategorySchema.find({});
    res.json(fcategories);
  } catch (err) {
    res.json(err);
  }
}

exports.addNewUser = async (req, res) => {
  try {
    const newUser = new userSchema(req.body);
    const user = await newUser.save();
    res.status(200).json({ user, message: 'User registered successfully!' });
  } catch (error) {
    console.log(error);
    res.json({ message: 'Internal server error' });
  }
}

exports.getUser =  async (req, res) => {
  try {
    const user = await userSchema.findOne({ email: req.body.email });
    if (!user) {
      throw new Error('User not found');
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      throw new Error('Incorrect password');
    }
    req.session.name = user.firstName;
    const token = jwt.sign({ _id: user._id }, 'mysecretkey');
    res.send({ user, token, message: 'Login succesful'});
  } catch (error) {
    res.status(400).send(error);
  }
}

exports.logout = async (req, res) => {
  try {
    req.session.destroy();
    res.send({ message: 'Logout successful' });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getSession = async (req, res) => {
  res.json(req.session)
}