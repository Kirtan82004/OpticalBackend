import { asyncHandler } from "../../utils/asyncHandler.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import { Order } from "../../models/order.model.js"
import { Cart } from "../../models/cart.model.js"
import { io } from "../../app.js"
import mongoose from "mongoose"

const placeOrder = asyncHandler(async (req, res) => {

  try {
    const { shippingDetails, paymentMethod } = req.body;
    const userId = req.user._id;

    const cart = await Cart.findOne({ customer: userId }).populate('products.product', 'name price');

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty. Cannot place order." });
    }


    const products = cart.products.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
    }));

    const orderTotal = products.reduce((sum, item) => sum + item.quantity * item.price, 0);

    const newOrder = new Order({
      customer: userId,
      products,
      shippingDetails:{
        fullName: shippingDetails.fullName,
        email: shippingDetails.email,
        address: shippingDetails.address,
      },
      paymentMethod,
      orderStatus: 'Pending',
      paymentStatus: 'pending'
    });

    const savedOrder = await newOrder.save();
    io.emit("order", {
      action: "create",
      order: savedOrder,
      message: `New order placed with order id ${savedOrder._id}`
    });
    await Cart.findOneAndDelete({ customer: userId });

    res.status(201).json({
      message: "Order placed successfully",
      order: {
        ...savedOrder.toObject(),
        orderTotal,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to place order" });
  }
})

const getOrderHistory = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch order history for the user
    const orders = await Order.aggregate([
      { $match: { customer: new mongoose.Types.ObjectId(userId) } },
      {
        $project: {
          _id: 1,
          createdAt: 1,
          orderStatus: 1,
          orderTotal: { $sum: { $map: { input: "$products", as: "product", in: { $multiply: ["$$product.price", "$$product.quantity"] } } } }
        }
      },
      { $sort: { createdAt: -1 } } // Sort by order date (most recent first)
    ]);

    res.status(200).json({ message: "Order history retrieved successfully", orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch order history" });
  }
})

const getOrderDetails = asyncHandler(async (req, res) => {
  try {
    const { orderId } = req.params;
    console.log(orderId)
    const order = await Order.aggregate([
      {
        $match: {
          _id:new mongoose.Types.ObjectId(orderId)
        }
      },
      {
        $lookup: {
          from: "products",
          localField: "products.product",
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      {
        $unwind: "$productDetails"
      },
      {
        $lookup: {
          from: "categories",
          localField: "productDetails.category",
          foreignField: "_id",
          as: "productDetails.categoryDetails"
        }
      },
      {
        $project: {
          'productDetails.name': 1,
          'productDetails.description': 1,
          'productDetails.price': 1,
          'productDetails.categoryDetails.name': 1,
          'productDetails.categoryDetails.description': 1,
          'quantity': 1,
          'price': 1
        }
      }
    ])
    console.log(order)
    if (!order) {
      throw new ApiError(404, "Order not found")
    }
    if (!order || order.length === 0) {
      throw new ApiError(404, "Order not found")
    }
    return res
    .status(200)
    .json(new ApiResponse(200, order, "order details getted successfuly"))

  } catch (error) {
    console.log(error.message)
    return new ApiError(500, error.message)

  }
})
const cancelOrder = asyncHandler(async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) {
      return new ApiError(404, "Order not found")
    }
    order.status = 'Cancelled'
    await order.save()
    io.emit('orderCancelled',{
      orderId:order._id,
      status:order.status,
      message:`order ${order._id} has been cancelled`
    })
  } catch (error) {
    return new ApiError(500, error.message)

  }
})

export {
  placeOrder,
  getOrderHistory,
  getOrderDetails,
  cancelOrder
}