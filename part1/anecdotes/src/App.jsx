import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)

  selected > anecdotes.length - 1 ? setSelected(0) : false;

  const [votes, setVotes] = useState(new Array(8).fill(0))
  
  const votesCopy = [ ...votes ]
  const addVote = () => {
      votesCopy[selected] += 1
      setVotes(votesCopy)
      console.log(votesCopy)
  }

  const getHighest = (votes) => {
    let highest = 0
    votes.map((num, index) => {
      return num > highest ? highest = index : false
    })
    console.log(highest)
    return highest
  }

  return (
    <div>
      <Title text="Anecdote of the day" />
      {anecdotes[selected]}
      <br></br>
      <span>has {votesCopy[selected]} votes</span>
      <br></br>
      <Button action={() => setSelected(selected + 1)} text="Next anecdote" />
      <Button action={addVote}text="Vote" />
      <Title text="Anecdote with most votes"/>
      <span>{anecdotes[getHighest(votesCopy)]}</span>
      <br></br>
      <span>has {votesCopy[getHighest(votesCopy)]} votes</span>
    </div>
  )
}

const Title = ( { text } ) => <h1>{text}</h1>

const Button = ( { text, action } ) => <button onClick={action}>{text}</button>

export default App