import express from "express";
import axios from "axios";
import { add, get } from "./store";
import { vote } from "./voting";
import cron from "node-cron";
import { getLeader } from "./voting";
import { addLog, getLog } from "./log";


const id = parseInt(process.env.ID ?? "");

vote(id)

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Running");
});

app.post("/store", (req, res) => {
  console.log(req.body);
  addLog(req.body);
  add(req.body);
  res.status(200).send(req.body);
});

app.get("/store", (req, res) => {
  res.status(200).send(get());
});

app.get("/replication", (req, res) => {
  res.status(200).send(getLog());
});
    

app.listen(8080, () => {
  console.log("Store started at port 8080");
});


cron.schedule("*/10 * * * * *", async () => {
  const leader = (await getLeader()) ?? undefined;
  if (leader !== undefined && leader !== id && id !== 0) {
    axios.get(`http://node${leader}:8080/replication`).then((res) => {
      console.log(res.data);
    });
  }
});
