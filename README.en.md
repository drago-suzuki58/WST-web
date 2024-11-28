# 🕐️WST-Web

Make your daily wake-up time the new standard for the world! This application is the perfect tool to show off your unique standard time to the world.

Inspired by: [Tweet by yada_kaeru](https://x.com/yada_kaeru/status/1861644748580364390)

[Japanese README](README.md)

## 🛠️Usage

1. Clone or fork this repository

2. Write the following format of JSON data into [data.json](data.json)

- `time`  
  Enter the time you woke up today in `HH:mm` format. You can even use `-1:00` or `25:00`.
- `timezone`  
  Enter the time zone of the country you live in using the IANA Time Zone format.

```json
{
    "time": "1:00",
    "timezone": "Asia/Tokyo"
}
```

3. Install dependencies

```sh
npm install
```

4. Deploy or start the application using your preferred method

5. Show off this site to your friends and say something like "I'll be there at WST 3 o'clock!"
