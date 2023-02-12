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
        const response = await openai.createEdit({
            model: "text-davinci-edit-001",
            input: input,
			temperature: 0.25,
            instruction: "turn the sentence into a poem"
    
        })

        const output = response.data.choices[0].text
        console.log(output)

        const res_obj = await openai.createImage({
            prompt: output,
            n: 1,
            size: "512x512"
        })

        const image = res_obj.data.data[0].url
        console.log(image)

        story.output = output
        story.image = image

    }catch(err){
        
        if (err.response) {
            console.log(err.response.status);
            console.log(err.response.data);
        } else {
            console.log(err.message);
        }
    }
}

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send("back end")
})

app.post('/', async (req, res) => {
    await sendRequest(req.body.prompt)
    res.send(JSON.stringify(story))
})

app.listen(8000)

