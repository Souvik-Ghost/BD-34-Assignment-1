let express = require("express");
let app = express();
let cors = require("cors");
app.use(cors());
let port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

let cart = [
  { productId: 1, name: "Laptop", price: 50000, quantity: 1 },
  { productId: 2, name: "Mobile", price: 20000, quantity: 2 },
];

//1
function addItems(cart, newItem) {
  cart.push(newItem);
  return cart;
}
app.get("/cart/add", (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);
  let newItem = {
    productId: productId,
    name: name,
    price: price,
    quantity: quantity,
  };
  let result = addItems(cart, newItem);
  res.json(result);
});
//cart/add?productId=3&name=Tablet&price=15000&quantity=1

//2
function updateItems(cart, productId, quantity) {
  for (i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
      break;
    }
  }
  return cart;
}
app.get("/cart/edit", (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let result = updateItems(cart, productId, quantity);
  res.json(result);
});
//cart/edit?productId=2&quantity=3

//3
function deleteItem(product, productId) {
  return product.productId !== productId;
}
app.get("/cart/delete", (req, res) => {
  let productId = parseInt(req.query.productId);
  result = cart.filter((product) => deleteItem(product, productId));
  cart = result;
  res.json(result);
});
//cart/delete?productId=1

//4
function getCart(cart) {
  return cart;
}
app.get("/cart", (req, res) => {
  let result = getCart(cart);
  res.json(result);
});
//cart

//5
function totalQuantityItems(cart) {
  let totalQuantity = 0;
  for (let i = 0; i < cart.length; i++) {
    totalQuantity += cart[i].quantity;
  }
  return totalQuantity;
}
app.get("/cart/total-quantity", (req, res) => {
  let result = totalQuantityItems(cart);
  res.json({ totalQuantity: result });
});
//cart/total-quantity

//6
function totalPriceOfCart(cart) {
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalPrice += cart[i].price * cart[i].quantity;
  }
  return totalPrice;
}
app.get("/cart/total-price", (req, res) => {
  let result = totalPriceOfCart(cart);
  res.json({ totalPrice: result });
});
//cart/total-price
