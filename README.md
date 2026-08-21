# Volunteer Event Signup

A full-stack platform for coordinating volunteer registration and shift management for events. Built with React + TypeScript frontend and Ruby on Rails backend, demonstrating modern web development practices including CI/CD, decoupled architecture, and professional testing workflows.

## About

This project solves the friction of manual volunteer sign-up coordination. Organizations can create events, define volunteer activities and shifts, and volunteers can register for shifts they want to work. Organizers have role-based access to manage events and track registrations.

## Technology Stack

**Backend:**

- Ruby on Rails 8.1.3
- PostgreSQL database
- RSpec for testing
  - test coverage with `SimpleCove`

<!-- - Security: bcrypt, JWT authentication (OAuth and 2FA support planned) -->

**Frontend:**

- React 19 with TypeScript
- Vite for development and building
- Vitest for testing
  - test coverage with `@vitest-coverage/v8`
- React Router for navigation
- Bootstrap for UI

**DevOps & Deployment:**

- Docker for containerization
- GitHub Actions for CI/CD
- Vercel/Netlify ready for frontend deployment

<!-- - AWS services (RDS, S3, CloudWatch) for production backend -->

**Development Tools:**

- Ruby 3.4.3, Node.js 26.5.0
- Bundler, Yarn for dependency management
- RuboCop for linting
- Brakeman for security scanning

## Features

**Current plan (MVP):**

- User authentication with role-based access control (organizer, shift lead, volunteer)
- Event creation and management
- Activity and shift definitions with capacity tracking
- Volunteer registration for shifts
- Dashboard views based on user role

**Phase 2 plan:**

- OAuth login (Google, GitHub)
- Two-factor authentication
- Analytics dashboard with volunteer engagement metrics
- Churn prediction model for volunteer retention
- Shift reminder notifications
- Advanced RBAC permissions

## Getting Started

### Prerequisites

- Ruby 3.4.3 ([rbenv](https://github.com/rbenv/rbenv) recommended)
- Node.js 26.5.0
- PostgreSQL 16+
- Bundler
- Yarn

### Setup

1. **Clone and install:**

   ```bash
   git clone https://github.com/dcalhoun286/volunteer_event_signup.git
   cd volunteer_event_signup
   ```

2. **Install dependencies:**

   ```bash
   bundle install
   yarn install
   ```

3. **Setup database:**
   ```bash
   bin/setup
   ```
   Or without starting the server:
   ```bash
   bin/setup --skip-server
   ```

## Running the Application

### Development (Recommended)

```bash
bin/dev
```

This starts two processes via `Procfile.dev`:

- Rails API on `http://localhost:3001`
- Vite dev server on `http://localhost:3000` (with hot reload and SPA routing)

Visit `http://localhost:3000` in your browser. React makes API calls to `http://localhost:3001/api/...`

### Manual Setup (if not using Procfile)

**Terminal 1 - Rails API:**

```bash
bundle exec rails s -p 3001
```

**Terminal 2 - Vite dev server:**

```bash
yarn vite
```

## Testing

### Run all tests

```bash
yarn test && bundle exec rspec
```

### Frontend tests only

```bash
yarn test
```

### Backend tests only

```bash
bundle exec rspec
```

### Linting & Security

```bash
bundle exec rubocop                 # Lint backend code
bundle exec rubocop --fix           # Fix auto-fixable backend linting issues
yarn lint                           # Lint frontend code
yarn lint:fix                       # Fix auto-fixable frontend linting issues
yarn format:check                   # Check frontend code against formatting rules
bin/brakeman --no-pager             # Security scan
bin/bundler-audit                   # Check dependencies for vulnerabilities
```

## Project Structure

```
volunteer_event_signup/
├── app/                 # Rails backend code
├── src/                 # React/TypeScript frontend code
├── db/
│   ├── migrate/         # Database migrations
│   └── seeds.rb         # Sample data
├── spec/                # RSpec tests
├── config/              # Rails configuration
├── .github/workflows/   # CI/CD pipeline
├── Gemfile              # Ruby dependencies
├── docker-compose.yml   # Local Docker setup
├── package.json         # Node.js dependencies
├── tsconfig.json        # TypeScript configuration
├── vitest.config.ts     # Vitest configuration
└── vite.config.mts      # Vite configuration
```

## Architecture

The application uses a **decoupled frontend/backend architecture:**

- **Frontend** (React/TypeScript) builds independently and deploys to Vercel/Netlify
- **Backend** (Rails) runs as a containerized API service

 - **Database** PostgreSQL <!-- hosted on AWS RDS -->
<!-- - **Logging & Monitoring** via CloudWatch and ELK stack -->
 - Communication via REST API (HTTP)

This separation allows independent scaling and deployment of frontend and backend.

<!-- ## Database Schema

Key entities:
- **Users:** Organizers, shift leads, and volunteers
- **Events:** Organized volunteer events
- **Activities:** Types of work within an event (e.g., "Runner check-in", "First aid")
- **Shifts:** Time slots for volunteer work with capacity limits
- **VolunteerRegistrations:** Tracks who signed up for which shifts

See `db/schema.rb` for the complete schema. -->

## CI/CD Pipeline

GitHub Actions runs automatically on every push and PR:

1. **Security scans** (Brakeman, Bundler Audit)
2. **Linting** (RuboCop, ESLint)
3. **Backend tests** (RSpec)
4. **Frontend tests** (Vitest)
5. **Frontend build** (React build to `dist/`)

All checks must pass before merging to `main`.

## Development Workflow

1. Create a branch: `git checkout -b feature/your-feature`
2. Make changes and commit with signed commits
3. Push to GitHub and open a PR against `main`
4. All CI checks must pass
5. Merge when ready

**Branch protection rules on `main`:**

- Require signed commits
- Require CI/CD jobs to pass
- Linear history (no merge commits)
- Restrict deletions and force pushes

## Deployment

### Local Docker

```bash
docker-compose up
```

### Frontend (Vercel/Netlify)

The frontend builds to `dist/` and deploys automatically on push to `main` (setup in progress).

### Backend

Containerized Rails app deploys to container registry (setup in progress).

## Contributing

This is a personal project, but if you'd like to contribute ideas, open an issue or discussion.

## License

GPL-3.0 License. <!-- Free and open-source for nonprofits and volunteer coordination. --> See [LICENSE](LICENSE) for details.

## Author

Dar-Ci Calhoun — [GitHub](https://github.com/dcalhoun286) | [LinkedIn](https://linkedin.com/in/dlcalhoun)
