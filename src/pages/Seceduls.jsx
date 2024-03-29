import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { postData, getData } from "@/utils/fetch"
import { useToast } from "@/components/ui/use-toast"

const Seceduls = () => {
   const [days, setDays] = useState([])
   const [valueDays, setValueDays] = useState({ day: "" })
   const [nameMatkul, setNameMatkul] = useState({})
   const [description, setDescription] = useState({})
   const { toast } = useToast()

   const handleChange = (e) => {
      setValueDays({ ...valueDays, [e.taget.name]: e.target.value })
   }

   const clear = (id) => {
      setNameMatkul({ ...nameMatkul, [id]: '' })
   }

   const handleDays = async () => {
      await postData('/day/create', valueDays)
      handleGetDays()
   }

   const handleGetDays = async () => {
      const response = await getData('/day')

      setDays(response.data)
      setNameMatkul("")
      setDescription("")
   }

   useEffect(() => {
      handleGetDays()
   }, [])

   const debounce = (func, delay) => {
      let timeoutId;
      return (...args) => {
         clearTimeout(timeoutId);
         timeoutId = setTimeout(() => {
            func.apply(null, args);
         }, delay);
      };
   };

   const handeleOnkey = debounce((e, id) => {
      const payload = { nameMatkul: nameMatkul[id], description: description[id], dayId: id }
      if (e.keyCode === 13) {
         postData('/matkul/create', payload).then(() => {
            clear()
            handleGetDays();
            toast({
               titl: 'Success',
               description: `berhasil menambahkan ${payload.nameMatkul}`
            })
         });
      }
   }, 500);

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
                              name={"nameMatkul"}
                              value={nameMatkul[day.id] || ''}
                              autoFocus
                              placeholder={"Masukan Matkul"}
                              onChange={(e) => setNameMatkul({ ...nameMatkul, [day.id]: e.target.value })}
                              onKeyUp={(e) => handeleOnkey(e, day.id)}
                           />
                           <Input
                              type={'text'}
                              name={"description"}
                              value={description[day.id] || ''}
                              autoFocus
                              placeholder={"Masukan deskripsi"}
                              onChange={(e) => setDescription({ ...description, [day.id]: e.target.value })}
                              onKeyUp={(e) => handeleOnkey(e, day.id)}
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