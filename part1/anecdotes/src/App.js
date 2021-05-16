import React, { useState } from 'react'

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
    ]
    
    const [selected, setSelected] = useState(0)

    const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0])
    
    const random = () => {
        return Math.floor(Math.random() * 6)
    }

    const updatedVotes = () => {
        const copy = [...votes]
        copy[selected] += 1
        console.log(copy)
        return copy
    }
    
    return (
        <div>
            <Title text='Anecdote of the day' />
            <Display anecdotes={anecdotes} votes={votes} number={selected} />
            <Button text='vote' handleClick={() => setVotes(updatedVotes())} />
            <Button text='next anecdote' handleClick={() => setSelected(random())} />
            <Title text='Anecdote with most votes' />
            <Display anecdotes={anecdotes} votes={votes} number={votes.indexOf(Math.max(...votes))} />
        </div>
    )
}

const Button = (props) => {
    return (
        <button onClick={props.handleClick}>{props.text}</button>
    )
}

const Title = (props) => {
    return (
        <h2>{props.text}</h2>
    )
}

const Display = (props) => {
    return (
        <div>
            <div>{props.anecdotes[props.number]}</div>
            <div>has {props.votes[props.number]} votes</div>
        </div>
    )
}

export default App