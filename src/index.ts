import express from "express";
import axios from "axios";
import { add, get } from "./store";
import { vote } from "./voting";

const id = parseInt(process.env.ID ?? "");

vote(id)

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Running");
});

app.post("/store", (req, res) => {
  add(req.body);
  res.status(200).send(req.body);
});

app.get("/store", (req, res) => {
  res.status(200).send(get());
});

app.listen(8080, () => {
  console.log("Store started at port 8080");
});
