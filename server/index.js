import express from 'express'
import cors from 'cors'
import { Configuration, OpenAIApi } from "openai"
import process from 'process'

const key = process.env.openai_key
const org = process.env.openai_org

let story = {}

const openai = new OpenAIApi(
    new Configuration({
        organization: org,
        apiKey: key,
    })
)

const sendRequest = async (input) => {
    try{
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "turn the following into a short poem: " + input
        })

        const output = response.data.choices[0].text

        const res_obj = await openai.createImage({
            prompt: output,
            n: 1,
            size: "256x256"
        })

        const image = res_obj.data.data[0].url

        story.error = ""
        story.output = output
        story.image = image

    }catch(err){
        
        if (err.response) {
            story.error = err.response.data
        } else {
            story.error = err.message
        }
    }
}

const app = express()

app.use(cors())
app.use(express.json())

app.post('/', async (req, res) => {
    await sendRequest(req.body.prompt)
    res.send(JSON.stringify(story))
})

app.listen(8000)

