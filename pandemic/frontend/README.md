# Pandemic Game Frontend

## Overview
This project is a web implementation of the board game Pandemic, developed using React Native for the frontend and Node.js for the backend. The game allows players to work cooperatively to stop the spread of diseases across the globe.

## Project Structure
- **src/**: Contains all the source code for the frontend application.
  - **components/**: Reusable components for the game interface.
    - `Board.js`: Renders the game board and handles user interactions.
    - `Card.js`: Represents individual game cards and their properties.
    - `Menu.js`: Displays the main menu options for the game.
    - `Rules.js`: Presents the game rules to the players.
  - **screens/**: Contains the main screens of the application.
    - `GameScreen.js`: Represents the main gameplay screen.
    - `MenuScreen.js`: Displays the menu screen.
    - `RulesScreen.js`: Shows the rules of the game.
  - **assets/**: Contains static assets like styles.
    - `styles.css`: CSS styles for the frontend application.
  - **utils/**: Utility functions for the application.
    - `api.js`: Functions for making API calls to the backend.

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the frontend directory:
   ```
   cd pandemic/frontend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the frontend directory and configure the necessary environment variables, such as API endpoints.
5. Start the development server:
   ```
   npm start
   ```

## Usage
- Launch the application and navigate through the menu to start a new game or view the rules.
- Players can interact with the game board and make moves according to the game rules.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License. See the LICENSE file for details.