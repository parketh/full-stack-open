import React from 'react'

const App = () => {
    const course = {
        id: 1,
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            }
        ]
    }
    return <Course course={course} />
}

const Course = ({ course, parts }) => {
    return (
        <div>
            <Header course={course.name}/>
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const Header = ({ course }) => {
    // Renders the name of the course
    return (
        <h1>{course}</h1>
    )
}

const Content = ({ parts }) => {
    // Renders the three Part components
    return (
        parts.map((part) => (
            <div>
                <Part part={part.name} exercises={part.exercises}/>
            </div>
        ))
    )
}

const Part = ({ part, exercises }) => {
    // Renders the parts of the course and the numbers of exercises of each
    return (
        <p>{part} {exercises}</p>
    )
}

const Total = ({ parts }) => {
    // Renders the total number of exercises
    return (
        <p>Number of exercises {parts.reduce((sum, part) => sum + part.exercises, 0)}</p>
    )
}

export default App;
