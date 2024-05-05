import Login from "./components/Login"
import Register from "./components/Register"

const App = () => {
  return (
    <>
    <div>
    <h1 className="text-3xl font-bold underline">
      Hello world!

      <Register />
      <Login />
    </h1>
    </div>
    </>
  )
}

export default App