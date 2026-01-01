import axios from "axios"
import cron from 'node-cron';

export const vote = (id : number) => {
    axios.post("http://config:8080/store", { "leader" : id })
}

let leader : number

cron.schedule('*/10 * * * * *', async () => {
  leader = await getLeader() ?? 0
  console.log(leader)
});

export const getLeader = async () => {
    return await axios.get("http://config:8080/store")
    .then(res => parseInt(res.data.leader))
    .catch(err => {console.log(err)})
}