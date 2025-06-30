# Debouncing

**Debouncing** is a technique used to delay the execution of a function until a specified amount of time has passed since its last invocation. A common use case is validating input fields (such as when a user types into a text field) only after they pause typing. 

A great example of this in action is GitHub's "Create New Repository" page. As you type a repository name, it checks its availability in real-time, but only after you stop typing for a moment. This avoids unnecessary HTTP requests and improves both performance and UX. No submit buttons and no premature validations. Beautiful!

This project replicates that behavior using React and the `lodash.debounce` library, making actual API calls to GitHub.

I had a lot of fun building this. Give it a try! Open your browser's Network tab to check the requests and start typing!
