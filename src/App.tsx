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
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data: TimeItem) => {
        setData(data);
        const offset = moment.tz(data.timezone).utcOffset() + timeToMinutes(data.time)
        setOffset(offset)
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
          <p>{data.timezone}-{data.time}</p>
        </div>
      )}
    </>
  )
}

export default App
