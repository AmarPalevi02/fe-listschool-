import { useEffect, useState } from "react"
import { getApi } from "./utils/fetch"
import { Button } from "./components/ui/button"

function App() {
  const [days, setDays] = useState([])

  const fetchDay = async() => {
    const getDay = await getApi('/day')

    setDays(getDay)

    console.log(days)
  }

  useEffect(() => {
      fetchDay()
  }, [])

  console.log(days)

  return (
    <>
      <Button variant={"destructive"}>Check</Button>
    </>
  )
}

export default App
