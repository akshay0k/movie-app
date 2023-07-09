


# React App with Vite and TypeScript using TMDb API

This is a sample React application built with Vite and TypeScript, leveraging the TMDb (The Movie Database) API to display movie data.

## Prerequisites

- Node.js (version 18.16.1 or higher)
- npm (version 9.5.1 or higher)

## Getting Started

1. Clone this repository:

   ```bash
   git clone https://github.com/akshay0k/movie-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd your-repo
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   The app will be served at `http://localhost:5173`.

## Environment Configuration

To use the TMDb API, you need to obtain an API key. Follow these steps to configure your environment:

1. Create a new file named `.env` in the root directory of your project.

2. Add the following line to the `.env` file:

   ```
   VITE_API_KEY=YOUR_TMDB_API_KEY
   ```

   Replace `YOUR_TMDB_API_KEY` with your actual TMDb API key.

3. Save the file.

   **Note:** Ensure that the `.env` file is not committed to version control, as it contains sensitive information.

## Build

To build the application for production, run the following command:

```bash
npm run build
```

The optimized and minified files will be generated in the `dist` directory.

## Contributing

Contributions are welcome! If you find any issues or want to enhance the application, feel free to open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).


