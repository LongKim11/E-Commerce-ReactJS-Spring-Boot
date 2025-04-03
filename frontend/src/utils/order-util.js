export const createOrderRequest = (
  cartItems,
  userID,
  addressID,
  expectedDeliveryDate,
  paymentMethod = "CARD"
) => {
  let request = {
    userID: userID,
    addressID: addressID,
    paymentMethod: paymentMethod,
  };

  const date = new Date(expectedDeliveryDate);

  request.expectedDeliveryDate = date.toISOString();

  let orderItemRequestList = cartItems.map((item) => ({
    productID: item.productID,
    productVariantID: item.variant[0].id,
    color: item.variant[0].color,
    size: item.variant[0].size,
    quantity: item.quantity,
    price: item.price,
    subTotal: item.subTotal,
  }));

  let totalAmount = cartItems.reduce((acc, item) => acc + item.subTotal, 0);

  request.orderItemRequestList = orderItemRequestList;
  request.totalAmount = totalAmount;

  return request;
};
