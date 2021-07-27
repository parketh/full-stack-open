/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    try {
        res.send({
            weight: weight,
            height: height,
            bmi: calculateBmi(height, weight)
        });
    } catch (e) {
        res.status(400).json({
            error: "malformatted parameters"
        });
    }
});

app.post('/exercises', (req, res) => {
    const { daily_exercises, target } = req.body;
    let returnValue;
    if ( !daily_exercises || !target || daily_exercises.length <= 0 ) {
        returnValue = {
            error: "parameters missing"
        };
    } else if ( daily_exercises.some((e: unknown) => isNaN(Number(e))) || isNaN(Number(target)) ) {
        returnValue = {
            error: "malformatted parameters"
        };
    } else {
        returnValue = calculateExercises(daily_exercises, target);
    }
    
    return res.json(returnValue);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});