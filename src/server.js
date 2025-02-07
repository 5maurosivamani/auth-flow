const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*", // Allow only this domain to access the API
    methods: ["GET", "POST"], // Allow only GET and POST methods
    // allowedHeaders: ['Content-Type'], // Allow Content-Type header
    // credentials: true                // Allow sending cookies (if needed)
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const userRoutes = require("./routes/users.route");
const authRoutes = require("./routes/auth.route");

app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
