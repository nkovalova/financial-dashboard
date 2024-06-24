


## Installation

```bash
pnpm install
```

Create .env from example [.env.example](.env.example)

## Create DB


```bash
brew install postgresql@16
brew services start postgresql@16

createdb financial_dashboard

psql -U user -d financial_dashboard -c "GRANT ALL   PRIVILEGES ON DATABASE financial_dashboard TO user;"
```

<!-- npm run migration:create -- ./src/migrations/CreateInitialTables
npm run migration:create -- ./src/migrations/LoadInitialBestAccounts -->

Run migrations to fill tables

```bash
npm run migration:run        
```

## Running the app

```bash
npm run start
```
