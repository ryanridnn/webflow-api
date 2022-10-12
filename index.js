const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/test", async (req, res) => {
  const resp = await axios({
    url: "https://api.webflow.com/collections/6331444324771a7fc18695e9/items",
    method: "GET",
    headers: {
      Authorization:
        "Bearer 8da4c236c0f49a9ad5e1e47a39edcf45db3e338c13cbf14d67c3abd078675fad",
    },
  });

  res.status(200).json(resp.data);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server has started on PORT ${process.env.PORT || 3000}`);
});
