// const parseBmiArguments = (args: Array<string>): {height: number, weight: number} => {
//     if (args.length < 4) throw new Error('Not enough arguments');
//     if (args.length > 4) throw new Error('Too many arguments');
  
//     if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//       return {
//         height: Number(args[2]),
//         weight: Number(args[3])
//       };
//     } else {
//       throw new Error('Provided values were not numbers!');
//     }
// };
  
export const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / ((height / 100) ** 2); 
    switch (true) {
        case (bmi < 16):
            return "Underweight (Severe thinness)";
        case (bmi < 17):
            return "Underweight (Moderate thinness)";
        case (bmi < 18.5):
            return "Underweight (Mild thinness)";
        case (bmi < 25):
            return "Normal (healthy weight)";
        case (bmi < 30):
            return "Overweight (Pre-obese)";
        case (bmi < 35):
            return "Obese (Class I)";
        case (bmi < 40):
            return "Obese (Class II)";
        case (bmi >= 45):
            return "Obese (Class III)";
        default:
            throw new Error('Provided values are invalid!');
    }
};

// try {
//     const { height, weight } = parseBmiArguments(process.argv);
//     console.log(calculateBmi(height, weight));
// } catch (e) {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//     console.log(e.message);
// }