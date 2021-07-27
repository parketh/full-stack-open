# Part 9 - (a) Typescript background and introduction

## Main principle

Typescript is a typed superset of JavaScript that is transpiled (or compiled) into JavaScript code. It comprises three components: 

 - The language itself
 - The compiler, and
 - A language service, which provides intellisense, type hints etc

## TypeScript key language features

Key TypeScript features:

 1. Type annotations: lightweight way to record the intended type of a function or variable, including both the types of the function parameters and return value
 2. Type inference: ability for the compiler to infer the type of a function's return value based on the function parameters and their use
 3. Type aliases: type aliases are a declaration that can be used to create custom types

Notable types: 

 - `void`: functions without any return value (returns `undefined`)
 - `any`: variables that can take any type

## Benefits of TypeScript

 - Type checking: requiring values to be of a certain type can reduce runtime errors and reduce the number of unit tests in a project
 - Code level documentation: explicitly declaring types can provide a helpful inline annotation of the intended purpose of a function, and allow types to be reused all around the code base and updated consistently
 - Specific and smarter intellisense: IDEs can provide better intellisense when they know exactly what data is being processed

## Limitations of TypeScript

 - Incomplete, invalid or missing types in external libraries
 - Type inference is imperfect, and may need some extra type checking with type casting and type guards (conditional expressions to narrow down type)
 - Mysterious type errors when using complex types

