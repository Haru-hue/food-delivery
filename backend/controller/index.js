const mongoose = require("mongoose");
const ProductSchema = require("../models/schemas/food");
const Vendor = require("../models/schemas/vendor");
const CategorySchema = require("../models/schemas/category");

exports.getProducts = async (req, res) => {
  try {
    const allProducts = await ProductSchema.find({});
    const totalProducts = await ProductSchema.countDocuments();

    res.json({ allProducts, totalProducts });
  } catch (err) {
    res.json(err);
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await ProductSchema.findById(req.params.id);
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