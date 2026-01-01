import axios from "axios"

export const vote = async (id : number) => {
    if(id === 0) return
    console.log(`Node ${id} voting to be a leader`)
    const leader = await getLeader() ?? undefined
    console.log(`Leader is ${leader}`)
    if(Number.isNaN(leader) || leader === undefined){
        axios.post("http://config:8080/store", { "leader" : id })
    }
}

export const getLeader = async () => {
    return await axios.get("http://config:8080/store")
    .then(res => parseInt(res.data.leader))
    .catch(err => {console.log(err)})
}