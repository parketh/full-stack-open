import React from 'react'

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }
    return (
        <div>
            <Header course={course.name}/>
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const Header = (props) => {
    // Renders the name of the course
    console.log(props)
    return (
        <h1>{props.course}</h1>
    )
}

const Content = (props) => {
    // Renders the three Part components
    console.log(props)
    return (
        <div>
            <Part part={props.parts[0].name} exercises={props.parts[0].exercises}/>
            <Part part={props.parts[1].name} exercises={props.parts[1].exercises}/>
            <Part part={props.parts[2].name} exercises={props.parts[2].exercises}/>
        </div>
    )
}

const Part = (props) => {
    // Renders the parts of the course and the numbers of exercises of each
    console.log(props)
    return (
        <p>{props.part} {props.exercises}</p>
    )
}

const Total = (props) => {
    // Renders the total number of exercises
    return (
        <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    )
}

export default App;
