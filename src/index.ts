import express from "express";
import axios from "axios";

let store = {};

const followers = process.env.followers?.split(",") ?? [];

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Running");
});

app.post("/store", (req, res) => {
  store = {...store, ...req.body}
  followers.forEach((follower) =>
    axios.post(`http://${follower}/store`, req.body)
  );
  res.status(200).send(req.body);
});

app.get("/store", (req, res) => {
  res.status(200).send(store);
});

app.listen(8080, () => {
  console.log("Store started at port 8080");
});
