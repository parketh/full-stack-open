interface Input {
    dailyHours: Array<number>,
    targetHours: number
}

interface Result {
    periodLength: number,
    trainingDays: number,
    targetReached: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const parseExerciseArguments = (args: Array<string>): Input => {
    if (args.length < 4) throw new Error('Not enough arguments');
  
    args.slice(2).forEach((arg) => {
        if (isNaN(Number(arg))) {
            throw new Error('Provided values were not numbers');
        }
    })

    return {
        dailyHours: args.slice(3).map(a => Number(a)),
        targetHours: Number(args[2])
    }
}

const calculateExercises = (dailyHours: Array<number>, targetHours: number): Result => {
    
    const periodLength = dailyHours.length
    
    const trainingDays = dailyHours.map((hour) => {
        if (hour > 0) {
            return 1;
        } else if (hour === 0) {
            return 0;
        } else {
            throw new Error('Negative number provided, replaced with 0!');
        }
    }).reduce((a, b) => a + b, 0)

    const average = dailyHours.reduce((a, b) => a + b, 0) / periodLength

    let rating;
    let ratingDescription;

    if (average > targetHours * 1.2) {
        rating = 3
        ratingDescription = "Target exceeded, well done!"
    } else if (average > targetHours * 0.95) {
        rating = 2
        ratingDescription = "Target reached"
    } else {
        rating = 1
        ratingDescription = "Target not reached"
    }
    
    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        targetReached: average > targetHours ? true : false,
        rating: rating,
        ratingDescription: ratingDescription,
        target: targetHours,
        average: average
    }
}

try {
    const { dailyHours, targetHours } = parseExerciseArguments(process.argv)
    console.log(calculateExercises(dailyHours, targetHours));
} catch (e) {
    console.log(e.message);
}