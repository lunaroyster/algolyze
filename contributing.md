# Adding/Modifying algorithms

An algorithm definition consists of a **file** and a **page**.

The **file** is a JSON file that contains the definition of an algorithm— a name, a long-form name, a short description, tags, and links to resources. It will also contain details like time and space complexity, and anything else that people would want to search algorithms by. Some fields are mandatory.

The **page** is a Markdown file that contains a wiki style page for the algorithm, complete with a full description of its working, pseudocode, examples, and other facts about the algorithm. The format for the page isn't enforced.

An algorithm MUST have a file, and SHOULD have a page.

To add an algorithm:

- Create a folder: algorithms/algorithms/{algorithmName}

- Create a file main.json. You could refer to other algorithms for the format.

- Create a file page.md. (optional)

- Run `npm run dist`. Make sure there are no errors. 

- After running `npm run dist`, try accessing algolyze at dist/index.html with a browser. Search for your algorithm and make sure things look alright. If you made a page, check it out to see if your markdown rendered properly

- Make a pull request
