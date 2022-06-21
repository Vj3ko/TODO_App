# Frontend Mentor - Todo app solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW)

- Live Site URL: https://todo-app-sortable.vercel.app/

## Built with

- Semantic HTML5 markup
- SCSS custom properties
- JS
- sortableJS library

### User should

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- Drag and drop to reorder items on the list

#### Thoughts

I found literally everything difficult in this challenge.
I've built like 5 different apps with different approaches but this one seemed to be the best (and only one working).

I tried implementing `adjacentHTML` but found it really hard to animate, so it was not so smooth. After that i decided to create todo element in js and append it to the list already created in DOM with `document fragment`. I read somewhere that doc fragment can result with better performance since the doc fragment is in memory and not part of the DOM tree itself.
