# Part 1 - (d) Complex state, debugging React apps

## Complex state

The `useState` function can be used multiple times too create multiple "pieces" of state, where an application requires more than a single state.

The code below maintains two pieces of state, `left` and `right`, both set to an initial value of 0.

```javascript
const App = () => {
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)

    return (
        <div>
        {left}
        <button onClick={() => setLeft(left + 1)}>
            left
        </button>
        <button onClick={() => setRight(right + 1)}>
            right
        </button>
        {right}
        </div>
    )
}
```

The code above initialises the values of `left` and `right` seperately, but 