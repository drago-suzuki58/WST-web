import { useEffect, useState } from 'react'
import moment from 'moment-timezone'
import './App.css'

interface TimeItem {
  date: string;
  time: string;
  timezone: string;
}

function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

function App() {
  const [data, setData] = useState<TimeItem | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date(Date.now() + (new Date().getTimezoneOffset() * 60000)))
  const [offset, setOffset] = useState<number>(0)
  const [time, setTime] = useState<number>(0)

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data: TimeItem) => {
        setData(data);
        const offset = moment.tz(data.timezone).utcOffset() + timeToMinutes(data.time)
        const time = timeToMinutes(data.time)
        setOffset(offset)
        setTime(time)
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const utc = new Date(Date.now() + (new Date().getTimezoneOffset() * 60000))
      const newTime = new Date(utc.getTime() + (60000 * offset))
      setCurrentTime(newTime)
    }, 50)
    return () => clearInterval(interval)
  }, [offset])

  const formatTimeWithOffset = (date: Date, offset: number) => {
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000)
    const newDate = new Date(utc + (60000 * offset))
    return newDate.toLocaleString();
  }

  return (
    <>
      <div className="time-display">
        <h2>{formatTimeWithOffset(currentTime, offset / 60)}</h2>
      </div>
      {data && (
        <div className="data-display">
          <p>{data.timezone}{time / 60 >= 0 ? `+${time / 60}` : time / 60}</p>
          <p>UTC{offset >= 0 ? `+${offset / 60}` : offset / 60}</p>
        </div>
      )}
    </>
  )
}

export default App
