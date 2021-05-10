import React from 'react'

const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    return (
        <div>
            <Header course={course}/>
            <Content part1={part1} exercises1={exercises1} part2={part2} exercises2={exercises2} part3={part3} exercises3={exercises3} />
            <Total total={exercises1 + exercises2 + exercises3} />
        </div>
    )
}

const Header = (props) => {
    // Renders the name of the course
    return (
        <h1>{props.course}</h1>
    )
}

const Content = (props) => {
    // Renders the three Part components
    return (
        <div>
            <Part part={props.part1} exercises={props.exercises1}/>
            <Part part={props.part2} exercises={props.exercises2}/>
            <Part part={props.part3} exercises={props.exercises3}/>
        </div>
    )
}


const Part = (props) => {
    // Renders the parts of the course and the numbers of exercises of each
    return (
        <p>{props.part} {props.exercises}</p>
    )
}

const Total = (props) => {
    // Renders the total number of exercises
    return (
        <p>Number of exercises {props.total}</p>
    )
}

export default App;