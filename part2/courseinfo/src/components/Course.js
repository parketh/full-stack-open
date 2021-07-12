import React from 'react'

const Course = ({ course }) => {
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
      <h2>{course}</h2>
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
      <p><b>total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</b></p>
  )
}

export default Course
