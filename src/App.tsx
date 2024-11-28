import { useEffect, useState } from 'react'
import moment from 'moment-timezone'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
  const [count, setCount] = useState(0)
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
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
        <h2>{formatTimeWithOffset(currentTime, offset / 60)}</h2>
      </div>
      {data && (
        <div>
          <p>{data.timezone}-{data.time}</p>
        </div>
      )}
    </>
  )
}

export default App
