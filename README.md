# SumArit

SumArit is a small game of aritmetic sums and subtractions that have to be solved before the timer ends.

#### You will have:

- A list of scores to check your answers.
- The option to delete and reset the scores.
- A selection of themes to choose you preferred one.


## Develpoment

#### React.js with Next.js

This project is made with Next.js v14 with a resposive design.

#### DaisyUI component library

To give it a consistent look, It uses DaisyUI, as well as a selection of their theme schemes, where the selected theme is saved against page reloads.

#### React Context Hook for API Provider
The data can use a json-server backend via an `api.ts` file or just local storage with a `fake_api.ts` file, this api module will be loaded dynamically in a react context, if the json-server is not available in the port `3030` it will use local storage.

### Build and Run

To build this project you just need to clone it, change directory to it's project folder and run:

```bash
npm install
```

Then you have some scripts available to run:

- To run the development server:
    ```bash
    npm run dev
    ```
    It will be available at the [http://localhost:3000](http://localhost:3000) address.

- To run the json-server for the backend:
    ```bash
    npm run backend
    ```
    This json server will be started at port `3030` and be available at [http://localhost:3030/scores](http://localhost:3030/scores)
    
    The data will be managed in a json file: `/data/db_scores.json`
