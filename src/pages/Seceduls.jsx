import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { postData, getData, postData } from "@/utils/fetch"

const Seceduls = () => {
   const [days, setDays] = useState([])

   const [valueDays, setValueDays] = useState({
      day: ""
   })

   const [matkul, setMatkul] = useState({
      nameMatkul: "",
      dayId: null
   })

   const handleChange = (e) => {
      setValueDays({ ...valueDays, [e.taget.name]: e.target.value })
   }

   const handleChangeMatkul = (e) => {
      setMatkul({ ...matkul, [e.taget.name]: e.target.value })
   }

   const handleDays = async () => {
      await postData('/day/create', valueDays)
      handleGetDays()
   }

   const handleGetDays = async () => {
      const response = await getData('/day')

      setDays(response.data)
   }



   useState(() => {
      handleGetDays()
   }, [])

   const handeleOnkey = async (id) => {
      const body = {
         nameMatkul: matkul.nameMatkul,
         dayId: id
      }

      await postData('/matkul/create', body)
   }


   return (
      <div>
         <Button onClick={handleDays} >Add Day</Button>
         <div className="hidden">
            <Input type={'text'} name="day" onChange={handleChange} value="day" />
         </div>
         <div className="">
            {days.length == 0 ? (
               <p>Tidak ada jadwal</p>
            ) : (
               <>
                  {days.map((day) => {
                     return (
                        <div key={day.id}>
                           <p>{day.day}</p>
                           <Input
                              type={'text'}
                              name="nameMatkul"
                              value={matkul.nameMatkul}
                              placeholder={"Masukan Matkul"}
                              onFocus={() => handeleOnkey(day.id)}
                              onChange={handleChangeMatkul}
                           />
                           {day.Matkuls.map((scedul) => {
                              return (
                                 <div key={scedul.id}>
                                    <p>{scedul.nameMatkul}</p>
                                    <p>{scedul.description}</p>
                                 </div>
                              )
                           })}
                        </div>
                     )
                  })}
               </>
            )}
         </div>
      </div>
   )
}

export default Seceduls