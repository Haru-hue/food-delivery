const ProductSchema = require("../models/schemas/food");
const Vendor = require("../models/schemas/vendor");
const userSchema = require("../models/schemas/user");

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
  const vendorId = req.params.id;
  const products = await ProductSchema.find({ vendor: vendorId }).populate('vendor');
  res.send(products);
};

exports.addNewUser = async (req, res) => {
  try {
    const existingUser = await userSchema.findOne({ email: req.body.email });
    if (existingUser) {
      res.json({ status: false, message: 'Email already exists' });
    } else {
      const newUser = new userSchema(req.body);
      const user = await newUser.save();
      console.log(req.body);
      res.status(200).json({ status: true, user, message: 'User registered successfully!' });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: 'Internal server error' });
  }
};

exports.getUser =  async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email });
    if (!user) {
       return res.status(401).json({ status: false, message: 'Invalid email or password' });
    }
      // Check if password is correct
    const isPasswordMatch = await bcrypt.compare(password, user.password);
     if (!isPasswordMatch) {
      return res.status(401).json({ status: false, message: 'Invalid email or password' });
    }
      // Generate access token
    const token = jwt.sign({ id: user._id }, 'mysecretkey');
    res.status(200).json({ user, token, message: 'Login successful', status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

exports.logout = async (req, res) => {
  try {
    res.status(200).json({ message: 'Logout successful' });
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