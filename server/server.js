import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectToDb from "./config/db-config.js";
import userRouter from "./routes/auth/user-routes.js";
import adminProductRouter from "./routes/admin/products-route.js";
import adminOrderRouter from "./routes/admin/orders-route.js";
import shopProductRouter from "./routes/shop/products-route.js";
import shopCartRouter from "./routes/shop/cart-route.js";
import shopAddressRouter from "./routes/shop/address-route.js";
import shopOrdersRouter from "./routes/shop/orders-route.js";
import shopSearchRouter from "./routes/shop/search-routes.js";
import shopReviewRouter from "./routes/shop/review-routes.js";
import commomFeatureRouter from "./routes/common/feature-routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";


connectToDb();
const app = express();

const port = process.env.PORT || 5001;

// app.use(cors("*"));
// app.use(cors({ origin: "http://localhost:5173" }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/auth", userRouter);
app.use("/api/admin/products", adminProductRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.use("/api/shop/products", shopProductRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/orders", shopOrdersRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

app.use("/api/common/feature", commomFeatureRouter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
