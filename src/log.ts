const replicationLog : object[] = []

export const addLog = (data : object) => {
    replicationLog.push(data)
    return replicationLog
}

export const getLog = () => {
    return replicationLog
}