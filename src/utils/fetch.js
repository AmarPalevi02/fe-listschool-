import axios from "axios"
import { configUrl } from "@/configs"
export const getApi = async (resorch) => {
   try {
      const res = await axios.get(`${configUrl.baseUrl}${resorch}`)

      return res
   } catch (error) {
      console.log(error)
   }
}