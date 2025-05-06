# Pandemic Game Backend

## Overview
This is the backend for the Pandemic board game implementation. It is built using Node.js and Express, providing an API for the frontend application to interact with the game state and logic.

## Project Structure
- `src/app.js`: Entry point for the application, initializes the server and middleware.
- `src/controllers/gameController.js`: Contains methods for handling game-related requests.
- `src/models/gameState.js`: Represents the current state of the game.
- `src/routes/gameRoutes.js`: Defines API endpoints for the game.
- `src/utils/gameLogic.js`: Implements core game logic.

## Setup Instructions

1. **Clone the repository**
   ```
   git clone <repository-url>
   cd pandemic-game/backend
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the backend directory and add the necessary environment variables, such as database connection strings.

4. **Run the server**
   ```
   npm start
   ```

## API Usage
The backend exposes several endpoints for interacting with the game. Refer to the `gameRoutes.js` file for detailed information on available routes and their usage.

## Development
- Ensure to follow best practices for coding and documentation.
- Use appropriate Git branching strategies for feature development and bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.