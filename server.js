const cors = require("cors");
const { db, timestamp } = require("./firebase-config");
const express = require("express");
const stripe = require("stripe")(
  "sk_test_51H9Mt3L8CQXeA7glxl2zYwVRAml0sSqnaHrYp5RTMTnbtdc6ZnPI0EZdDN1dm4Cz8QMViJbFD4dCFfnk0B3HzX1800FjyZCGd5"
);

app = express();

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/create-checkout-session", async (req, res) => {
  const item = {
    price_data: {
      currency: "usd",
      product_data: {
        name: "Quatre fromage",
        images: [
          "https://img.cuisineaz.com/660x660/2016-06-30/i95078-pizza-4-fromages.jpg",
        ],
      },
      unit_amount: 2000,
    },
    quantity: 1,
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [item],
    mode: "payment",
    success_url: `http://localhost:3000?success=true`,
    cancel_url: `http://localhost:3000?canceled=true`,
  });

  db.collection("commandes").add({
    id: session.id,
    item,
    createdAt: timestamp(),
    payer: false,
    vu: false,
  });

  res.json({ id: session.id, item });
});

PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("listening to the port " + PORT));
