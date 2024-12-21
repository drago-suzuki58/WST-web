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
function utcToLocalTimezone(offset: number): string {
  const timezones = ["WET", "CET", "EET", "EAT", "GST", "UZT", "KGT", "ICT", "HKT", "JST", "AEST", "MAGT", "NZST", "TOT", "HAST", "AKST", "PT", "MST", "CST", "EST", "AST", "BRT", "FNT", "CVT"]

  while (offset < 0) {
    offset += 1440;
  }
  const normalizedOffset = (offset / 60) % 24;
  const roundedOffset = Math.round(normalizedOffset);
  const fractionalOffset = normalizedOffset - roundedOffset;
  return `${timezones[roundedOffset]}${fractionalOffset >= 0 ? `+${fractionalOffset.toFixed(2)}` : fractionalOffset.toFixed(2)}`;
}

function App() {
  const [data, setData] = useState<TimeItem | null>(null);
  const [offset, setOffset] = useState<number>(0)
  const [time, setTime] = useState<number>(0)
  const [formattedTime, setFormattedTime] = useState<string>('Initializing...')
  const [userTime, setUserTime] = useState<string>('Initializing...');

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
        setUserTime(moment.tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('YYYY/MM/DD HH:mm:ss'));
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFormattedTime(calcFormattedTime(offset, time))
      setUserTime(moment.tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('YYYY/MM/DD HH:mm:ss'));
    }, 1000)
    return () => clearInterval(interval)
  }, [offset, time])

  return (
    <>
      <div className="time-display">
        <h2>{formattedTime}</h2>
        <p>Your local time: {userTime}</p>
      </div>
      {data && (
        <div className="data-display">
          <p>{moment.tz(data.timezone).format('z')} | {data.timezone}{time / 60 >= 0 ? `+${(time / 60).toFixed(2)}` : (time / 60).toFixed(2)}</p>
          <p>UTC{(offset + time) / 60 >= 0 ? `+${((offset + time) / 60).toFixed(2)}` : ((offset + time) / 60).toFixed(2)}</p>
          <p>{utcToLocalTimezone(offset + time)}</p>
        </div>
      )}
    </>
  )
}

export default App
