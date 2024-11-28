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

function calcFormattedTime(offset: number, baseTime: number): string {
  const utc = moment.utc();
  const calculatedTime = utc.add(offset - baseTime, 'minutes');
  return calculatedTime.format('YYYY/MM/DD HH:mm:ss');
}

function App() {
  const [data, setData] = useState<TimeItem | null>(null);
  const [offset, setOffset] = useState<number>(0)
  const [time, setTime] = useState<number>(0)
  const [formattedTime, setFormattedTime] = useState<string>('Initializing...')

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data: TimeItem) => {
        setData(data);
        const offset = moment.tz(data.timezone).utcOffset()
        const time = timeToMinutes(data.time)
        setOffset(offset)
        setTime(time)
        setFormattedTime(calcFormattedTime(offset, time))
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFormattedTime(calcFormattedTime(offset, time))
    }, 1000)
    return () => clearInterval(interval)
  }, [offset, time])

  return (
    <>
      <div className="time-display">
        <h2>{formattedTime}</h2>
      </div>
      {data && (
        <div className="data-display">
          <p>{data.timezone}{time / 60 >= 0 ? `+${time / 60}` : time / 60}</p>
          <p>UTC{(offset + time) / 60 >= 0 ? `+${(offset + time) / 60}` : (offset + time) / 60}</p>
        </div>
      )}
    </>
  )
}

export default App
