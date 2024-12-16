const express = require("express");
const axios = require("axios");

const app = express();
const port = 3000;

const pokemonApi = "https://pokeapi.co/api/v2/pokemon";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/pokemon/list", async (req, res) => {
  const limit = req.query.limit ?? 10;
  const offset = req.query.offset ?? 0;

  try {
    const response = await axios.get(pokemonApi, {
      params: { limit, offset },
    });

    res.json({
      success: true,
      status: response.status,
      statusText: response.statusText,
      totalCount: response.data.count,
      data: response.data.results,
    });
  } catch (error) {
    res.status(error.response?.status ?? 500).json({
      success: false,
      message: error.response?.data?.message ?? "An error occurred",
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
