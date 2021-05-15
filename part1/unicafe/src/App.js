import React, { useState } from 'react'

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <Title title="give feedback" />
            <Button handleClick={() => setGood(good + 1)} text='good' />
            <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
            <Button handleClick={() => setBad(bad + 1)} text='bad' />
            <Statistics title='statistics' good={good} neutral={neutral} bad={bad}/>
        </div>  
    )
}

const Title = (props) => {
    return (
        <h1>{props.title}</h1>
    )
}

const Button = (props) => {
    return (
        <button onClick={props.handleClick}>
            {props.text}
        </button>
    )
    
}

const Statistics = (props) => {
    const total = () => {
        return props.good + props.neutral + props.bad
    }

    const average = () => {
        return parseFloat((props.good - props.bad) / total()).toFixed(1)
    }

    const positive = () => {
        return parseFloat(props.good / total() * 100).toFixed(1) + "%"
    }

    if (total() === 0) {
        return (
            <div>
                <Title title={props.title} />
                No feedback given
            </div>
        )
    }
    else {
        return (
            <div>
                <Title title={props.title} />
                <table>
                    <Statistic text='good' value={props.good} />
                    <Statistic text='neutral' value={props.neutral} />
                    <Statistic text='bad' value={props.bad} />
                    <Statistic text='all' value={total()} />
                    <Statistic text='average' value={average()} />
                    <Statistic text='positive' value={positive()} />
                </table>
            </div>
        )
    }
}

const Statistic = (props) => {
    return (
        <tbody>
            <tr>
            <td>{props.text}</td> 
            <td>{props.value}</td>
            </tr>
        </tbody>
    )
}

export default App