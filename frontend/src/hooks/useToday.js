import { useEffect, useState } from "react"

import { getTodayDate } from "../utils/date"


function useToday() {

  const [today, setToday] =
    useState(getTodayDate())


  useEffect(() => {

    const interval =
      setInterval(() => {

        const currentDate =
          getTodayDate()

        setToday(prev => {

          if (prev !== currentDate) {
            return currentDate
          }

          return prev
        })

      }, 60 * 1000)


    return () =>
      clearInterval(interval)

  }, [])


  return today
}


export default useToday