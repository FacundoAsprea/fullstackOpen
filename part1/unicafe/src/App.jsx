import { useState } from 'react'

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + bad + neutral

  const positiveness = (good / total)*100
  const average = (good - bad) / total

  return (
    <div>
      <Title text="Give feedback"/>
      <Button action={() => setGood(good + 1)} text="Good" />
      <Button action={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button action={() => setBad(bad + 1)} text="Bad" />
      <Statistics good = {good} neutral = {neutral} bad = {bad} total = {total} average = {average} positiveness = {positiveness} />
    </div>
  )
}

const Button = ( { action, text } ) => <button onClick={action}>{text}</button>

const Title = ( { text }) => <h1>{text}</h1>

const StatisticLine = ( { text , stat } ) => {
  return (
    <>
    <tr>
      <td>{text}</td>
      <td>{stat}</td>
    </tr>
    </>
  )
}

const Statistics = ( { good, neutral, bad, total, average, positiveness }) => {

  if(total > 0) {
    return (
      <>
      <Title text="Statistics" />
      <table>
        <tbody>
          <StatisticLine text="Good" stat={good} />
          <StatisticLine text="Neutral" stat={neutral} />
          <StatisticLine text="Bad" stat={bad} />
          <StatisticLine text="All" stat={total} />
          <StatisticLine text="Average" stat={average} />
          <StatisticLine text="Positive" stat={positiveness + "%"} />
        </tbody>
      </table>
      </>
    )
  }
  return <><br></br><span>No feedback given</span></>
}

export default App