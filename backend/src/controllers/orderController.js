const supabase = require('../config/supabase');

exports.createOrder = async (req, res, next) => {
  try {
    const { customer_name, customer_phone, customer_address, cart } = req.body;

    if (!customer_name || !customer_phone || !customer_address || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ message: 'Customer details and cart are required' });
    }

    const total_price = cart.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{ customer_name, customer_phone, customer_address, total_price, status: 'pending' }])
      .select()
      .single();

    if (orderError) throw orderError;

    const orderItems = cart.map((item) => ({
      order_id: order.id,
      menu_item_id: item.id,
      quantity: item.quantity,
      price: item.price
    }));

    const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
    if (itemsError) throw itemsError;

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    next(error);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*, menu_items(name))')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const allowed = ['pending', 'preparing', 'delivered', 'cancelled'];

    if (!allowed.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
};
