import Order from '../models/Order.js';

// create new order
export const createOrder = async (req, res) => {
  try {
      //extract necessary information from the request body
      const { productId, quantity, email } = req.body;

      //check if the product ID is valid
      if (!mongoose.Types.ObjectId.isValid(productId)) {
          return res.status(400).json({ message: 'Invalid product ID' });
      }

      //find the product by its ID
      const product = await Product.findById(productId);
      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }

      //check if the product has sufficient quantity
      if (product.quantity < quantity) {
          return res.status(400).json({ message: 'Insufficient product quantity' });
      }

      //create a new order instance
      const newOrder = new Order({
          productId,
          quantity,
          status: 0,
          email,
          dateOrdered: new Date()
      });

      // update the product quantity and save changes
      product.quantity -= quantity;
      await product.save();
      // save the new order
      await newOrder.save();

      // send a success response
      res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
      // handle any errors and send a 500 (Internal Server Error) response
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

// update order status
export const updateOrderStatus = async (req, res) => {
  try {
    // extract order ID and new status from request body
    const { orderId, newStatus } = req.body;

    // find the order by ID and update its status
    await Order.findByIdAndUpdate(orderId, { status: newStatus });

    // send a success response
    res.status(200).json({ message: 'Order status updated successfully' });
  } catch (error) {
    // handle any errors and send a 500 (Internal Server Error) response
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// get order details by ID
export const getOrderById = async (req, res) => {
  try {
    // extract order ID from request parameters
    const orderId = req.params.id;

    // find the order by ID
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // send the order details as a response
    res.status(200).json({ order });
  } catch (error) {
    // handle any errors and send a 500 (Internal Server Error) response
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
