import axios from 'axios'

const HOST = "http://localhost:8000/"

const getQuery = async (prompt) => {

    let query

    await axios.post(HOST, {prompt: prompt})
        .then((res) => query = res)
          .catch(err => console.log(err))
    
    return query
}

export {getQuery}