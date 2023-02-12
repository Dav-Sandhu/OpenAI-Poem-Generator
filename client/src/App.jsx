import { useState } from "react"
import { getQuery } from "./Query"


function App() {

  const [prompt, setPrompt] = useState("")
  const [output, setOutput] = useState()
  const [img, setImg] = useState()

  const submitPrompt = async () => {
    console.log(prompt)
    let value = await getQuery(prompt)
    setOutput(value.data.output)
    setImg(value.data.image)
  }

  return (
    <div className="App">
      <form onSubmit={(e) => {
        e.preventDefault()
        setOutput("Loading...")
        submitPrompt()
      }}>

        <label htmlFor="prompt">Prompt: </label>
        <input
          id="prompt"
          type="text"
          value={prompt} 
          onChange={(e) => {
            setPrompt(e.target.value)
          }} />

          <input type="submit" value="Submit" />
      </form>
      <img src={img} alt="" /><br />
      {output}
    </div>
  )
}

export default App
