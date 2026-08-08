# Volunteer Event Signup

Volunteer Event Signup is a side project I've created for coordinating volunteer registration and shifts for events. It features a React TypeScript frontend and Ruby on Rails backend.

## Technology Stack

* **Backend:** Ruby on Rails 8.1.3
* **Frontend:** React with TypeScript
* **Testing:** RSpec (Rails), Vitest (React)
* **Ruby version:** 3.4.3

## Getting Started

### Prerequisites

* Ruby 3.4.3
* Node.js 26.5.0
* Bundler
* Yarn

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dcalhoun286/volunteer_event_signup.git
   cd volunteer_event_signup
   ```

2. **Run the setup script:**
   To run setup without starting the server (useful for resetting the dev database):
   ```bash
   bin/setup --skip-server
   ```

## Running Tests

### Frontend Tests
Run React/TypeScript tests using Vitest:
```bash
yarn test
```

### Backend Tests
Run RSpec tests:
```bash
bundle exec rspec
```

### Run All Tests
```bash
yarn test && bundle exec rspec
```

## Development

### Start the development server

Option 1: Use the Procfile (recommended):
```bash
./bin/dev
```

Option 2: Run Rails and frontend separately:

Terminal 1 - Start Rails server:
```bash
bundle exec rails s
```

Terminal 2 - Start frontend development server:
```bash
yarn dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
├── app/                 # Rails application code
├── src/                 # React/TypeScript source code
├── config/              # Rails configuration
├── db/                  # Database migrations and seeds
├── spec/                # RSpec tests
├── Gemfile              # Ruby dependencies
├── package.json         # Node.js dependencies
├── tsconfig.json        # TypeScript configuration
└── vitest.config.ts     # Vitest configuration
```

## Deployment

See `.kamal/` configuration for deployment setup.

## License

This project is licensed under the GPL-3.0 License - see the LICENSE file for details.
