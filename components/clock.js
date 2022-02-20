import { useEffect, useState } from "react"
import styled from "styled-components"

const Clock = styled.p`
  font-size: 10rem;
  margin-bottom: -4rem;
`
const ShowDate = styled.p`
  font-size: 4rem;
  margin-bottom: 4rem;
`
const ClockBody = styled.div`
  text-align: center;
`

export default function LocaleClock() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    setTime((new Date()).toLocaleTimeString())
    setDate((new Date()).toLocaleDateString())
    setInterval(() => {
      setTime((new Date()).toLocaleTimeString())
      setDate((new Date()).toLocaleDateString())
  }, 1000)
  }, [])

  return (
    <ClockBody>
      <Clock>{time}</Clock>
      <ShowDate>{date}</ShowDate>
    </ClockBody>
  )
}