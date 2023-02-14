import { useState } from "react"
import { getQuery } from "./Query"


function App() {

  const [prompt, setPrompt] = useState("")
  const [output, setOutput] = useState()
  const [img, setImg] = useState()

  const submitPrompt = async () => {

    let value = await getQuery(prompt)

    if (value.data.error.length > 0){
      setOutput(value.data.error)
    }else{
      setOutput(value.data.output)
      setImg(value.data.image)
    }
  }

  return (
    <div className="App">
      <div className="text-start fs-1 ms-5 text-danger fw-semibold">Poem Generator</div>
      <form
        className="input-group ps-5 pe-5 pt-2" 
        onSubmit={(e) => {
          e.preventDefault()
          setOutput("Loading...")
          submitPrompt()
        }
      }>

        <label
          className="input-group-text" 
          htmlFor="prompt">
            Enter a Prompt: 
        </label>
        <input
          id="prompt"
          className="form-control"
          type="text"
          value={prompt} 
          onChange={(e) => {
            setPrompt(e.target.value)
          }} />

          <input 
            className="input-group-text"
            type="submit" 
            value="Submit" />
      </form>
      <div className="d-flex flex-column bg-dark m-5 p-4">
        <div className="fs-2 text-light text-center mb-2">{output}</div>
        <img className="border border-secondary ms-5 me-5" src={img} alt="" /><br />
      </div>
    </div>
  )
}

export default App
