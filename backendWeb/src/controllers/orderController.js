const axios = require("axios");
const Order = require("../model/Order");
const OrderItem = require("../model/OrderItem");
const db = require("../config/db");
const getOrders = async (req, res) => {
  try {
    const orders = await Order.getAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.getById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const user_id = req.user.user_id; // <-- user_id lấy từ token đã decode
    const { date, number, total_price, status, payment } = req.body;

    if (!user_id || !total_price) {
      return res
        .status(400)
        .json({ success: false, message: "Thiếu thông tin đơn hàng" });
    }

    const order_id = await Order.create(
      user_id,
      date,
      number,
      total_price,
      status,
      payment
    );

    res.status(201).json({
      success: true,
      id: order_id,
      message: "Order created successfully",
    });
  } catch (error) {
    console.error("Lỗi khi tạo order:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const createFullOrder = async (req, res) => {
  const connection = await db.getConnection();

  try {
    const user_id = req.user.user_id;
    const { date, number, total_price, status, payment, items } = req.body;

    if (
      !user_id ||
      !total_price ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Thiếu thông tin hoặc danh sách sản phẩm rỗng!",
      });
    }

    await connection.beginTransaction();

    // CHỈNH LẠI: GỌI createOrder ĐÚNG THAM SỐ
    const order_id = await Order.create(connection, {
      user_id,
      date,
      number,
      total_price,
      status,
      payment,
    });

    // GỌI createOrderItems TỪ OrderItemModel
    await OrderItem.createOrderItemsInDB(connection, order_id, items);

    await connection.commit();

    res.status(201).json({
      success: true,
      order_id,
      message: "Tạo đơn hàng và chi tiết đơn hàng thành công!",
    });
  } catch (error) {
    console.error("Lỗi tạo đơn hàng:", error);
    if (connection) await connection.rollback();

    res.status(500).json({
      success: false,
      message: "Lỗi server khi tạo đơn hàng",
      error: error.message,
    });
  } finally {
    if (connection) connection.release();
  }
};

const updateOrder = async (req, res) => {
  try {
    const { user_id, date, number, total_price, status, payment } = req.body;
    const updateRows = await Order.update(
      req.params.id,
      user_id,
      date,
      number,
      total_price,
      status,
      payment
    );

    if (updateRows === 0)
      return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const deleteRows = await Order.delete(req.params.id);

    if (deleteRows === 0)
      return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getOrdersByUser = async (req, res) => {
  try {
    console.log("req.user:", req.user);

    const user_id = req.user.user_id; // lấy user_id từ token
    console.log("user_id từ token:", user_id);

    // Tìm đơn hàng theo user_id
    const orders = await Order.findByUserId(user_id);
    if (!orders) {
      console.log("Không tìm thấy đơn hàng cho user:", user_id);
    } else {
      console.log("Danh sách đơn hàng:", orders);
    }
    console.log("orders:", orders);

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn hàng nào",
      });
    }

    // ✅ Trả đơn hàng về cho frontend
    res.json({
      success: true,
      data: orders, // <-- Chú ý key "data" để frontend nhận đúng
    });
  } catch (error) {
    console.error("Lỗi khi lấy đơn hàng người dùng:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};
const pPaymentMomo = async (req, res) => {
  //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
  //parameters
  var accessKey = "F8BBA842ECF85";
  var secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
  var orderInfo = "pay with MoMo";
  var partnerCode = "MOMO";
  var redirectUrl = "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b";
  var ipnUrl = "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b";
  var requestType = "payWithMethod";
  var amount = "50000";
  var orderId = partnerCode + new Date().getTime();
  var requestId = orderId;
  var extraData = "";
  var paymentCode =
    "T8Qii53fAXyUftPV3m9ysyRhEanUs9KlOPfHgpMR0ON50U10Bh+vZdpJU7VY4z+Z2y77fJHkoDc69scwwzLuW5MzeUKTwPo3ZMaB29imm6YulqnWfTkgzqRaion+EuD7FN9wZ4aXE1+mRt0gHsU193y+yxtRgpmY7SDMU9hCKoQtYyHsfFR5FUAOAKMdw2fzQqpToei3rnaYvZuYaxolprm9+/+WIETnPUDlxCYOiw7vPeaaYQQH0BF0TxyU3zu36ODx980rJvPAgtJzH1gUrlxcSS1HQeQ9ZaVM1eOK/jl8KJm6ijOwErHGbgf/hVymUQG65rHU2MWz9U8QUjvDWA==";
  var orderGroupId = "";
  var autoCapture = true;
  var lang = "vi";

  //before sign HMAC SHA256 with format
  //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
  var rawSignature =
    "accessKey=" +
    accessKey +
    "&amount=" +
    amount +
    "&extraData=" +
    extraData +
    "&ipnUrl=" +
    ipnUrl +
    "&orderId=" +
    orderId +
    "&orderInfo=" +
    orderInfo +
    "&partnerCode=" +
    partnerCode +
    "&redirectUrl=" +
    redirectUrl +
    "&requestId=" +
    requestId +
    "&requestType=" +
    requestType;
  //puts raw signature
  console.log("--------------------RAW SIGNATURE----------------");
  console.log(rawSignature);
  //signature
  const crypto = require("crypto");
  var signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");
  console.log("--------------------SIGNATURE----------------");
  console.log(signature);

  //json object send to MoMo endpoint
  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    partnerName: "Test",
    storeId: "MomoTestStore",
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    lang: lang,
    requestType: requestType,
    autoCapture: autoCapture,
    extraData: extraData,
    orderGroupId: orderGroupId,
    signature: signature,
  });

  const options = {
    url: "https://test-payment.momo.vn/v2/gateway/api/create",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestBody),
    },
    data: requestBody,
  };
  let result;
  try {
    result = await axios(options);
    return res.status(200).json(result.data);
  }catch{
    return res.status(500).json({
      statusCode: 500,
      message: "momo error"
    });
  }
};
module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrdersByUser,
  createFullOrder,
  pPaymentMomo,
};
