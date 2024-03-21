import axios from "axios"
import { configUrl } from "@/configs"

export const getData = async (resorch) => {
   try {
      const res = await axios.get(`${configUrl.baseUrl}${resorch}`)

      return res.data
   } catch (error) {
      console.log(error)
   }
}

export const getOne = async ( resorch,id) => {
   try {
      const res = await axios.get(`${configUrl.baseUrl}${resorch}/${id}`)

      return res.data
   } catch (error) {
      console.log(error)
   }
}

export const postData = async (resorch, payload) => {
   try {
      const res = await axios.post(`${configUrl.baseUrl}${resorch}`, payload)
      return res
   } catch (error) {
      console.log(error)
   }
}
