import { Toaster } from "./components/ui/toaster"
import Layout from "./pages/Layout"

function App() {

  return (
    <div className="w-[100%] h-[100vh] bg-gray-500">
      <Layout />
      <Toaster />
    </div>
  )
}

export default App
