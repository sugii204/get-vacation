## Welcome to GetVacation repository

## Project Structure

```
GetVacation
|-- src/
|   |-- controllers/        # Handle HTTP request and responses
|   |-- services/           # Business logic layer
|   |-- models/             # Data models
|   |-- routes/             # Define API route
|   |-- utils/              # Utility functions
|   |-- middlewares/        # Middlewares (authentication, logging, etc)
|   |-- config/             # Configuration files
|   |-- app.ts              # Entry point for the app (express app setup)
|   |-- index.ts            # Main server entry point
|
|-- .gitignore
|-- .prettierignore
|-- .prettierrc
|-- .eslintrc.json
|-- dist/
|-- node_modules/
|-- tsconfig.json
|-- jest.config.js
|-- config.json
|-- nodemon.json
|-- package.json
```

## Scripts

I've made few scripts to easyly running some part of the program. All the script all placed on `./scripts/`

- Create Migration File Template

  ```node.js
  pnpm run migration create [your-migration-name]
  ```

- Create Seeder File Template
  ```node.js
  pnpm run seeder create [your-seeder-name]
  ```
