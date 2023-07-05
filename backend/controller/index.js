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
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email });
    if (!user) {
       return res.status(401).json({ message: 'Invalid email or password' });
    }
      // Check if password is correct
    const isPasswordMatch = await bcrypt.compare(password, user.password);
     if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
      // Generate access token
    const token = jwt.sign({ id: user._id }, 'mysecretkey');
    res.status(200).json({ user, token, message: 'Login successful', session: req.session });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

exports.logout = async (req, res) => {
  try {
    req.session.destroy();
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getSession = async (req, res) => {
  res.json(req.session)
}

exports.isAuthenticated = async (req, res, next) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const user = await userSchema.findById(userId);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.addUserCart = async (req, res) => {
  try {
    const userId = req.params.id;
    const newCartItems = req.body.cart;
    const updatedUser = await userSchema
      .findByIdAndUpdate(userId, { cart: newCartItems }, { new: true })
      .populate('cart');

    if (updatedUser) {
      res.json({ message: 'Cart updated successfully!'});
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating user cart');
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userSchema.findById(userId).select('cart');
    const cartItems = user.cart;
    const productIds = cartItems.map(item => item._id);
    const products = await ProductSchema.find({ _id: { $in: productIds } });
    const vendorIds = products.map(product => product.vendor);
    const vendors = await Vendor.find({ _id: { $in: vendorIds } });
    const mergedCartItems = cartItems.map(item => {
      const product = products.find(product => product._id.toString() === item._id.toString());
      const vendor = vendors.find(vendor => vendor._id.toString() === product.vendor.toString());
      return { ...item.toObject(), ...product.toObject(), vendor: { name: vendor.name } };
    });
    res.json(mergedCartItems);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting cart');
  }
};