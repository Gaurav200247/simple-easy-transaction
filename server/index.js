const express = require("express");
const cors = require("cors");
// const fetch = import("node-fetch").then((module) => module.default);

const app = express();
const port = 3000;

app.use(cors());

app.get("/", async (req, res) => {
  res.send("Simple Easy Transactions API");
});

app.get("/ifsc/:code", async (req, res) => {
  const { code } = req.params;
  const response = await fetch(`http://ifsc.razorpay.com/${code}`);
  const data = await response.json();
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port} as http://localhost:${port}`);
});
