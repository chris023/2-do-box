Refactor of Previous project

Here are some refactoring points we want to see in your project:

Small JavaScript functions focused on single responsibility (SRP) - for example, one function should not handle both disabled button state and rendering elements to the DOM
Consistent formatting, indentation, and naming schemes
Smart, concise comments (only when absolutely needed for clarity)
Little to no duplication in JavaScript (DRY principle)
Avoid deep nesting (for if/else conditionals)
Line lengths (keep them short and readable to avoid horizontal scrolling in your text editor)
File and folder organization (images, CSS directories)
Specifically, we’re going to set some constraints:

You cannot use any nested if/else statements
When you can, you should not use anonymous functions (mainly looking at event event listeners for this)
For example, if you find an anonymous function in an event listener, pull it out of the event listener and use a function reference as the callback function
HTML must follow basic accessibility guidelines (semantic tagging, image attributes, roles)
No use of global variables (we’re not saying you should never use global variables in life, but for this project it will be an exercise in not using global variables)
Functions cannot be longer than 8 lines (including event listeners)
