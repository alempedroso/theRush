# theRush

## Setup

To start your Phoenix server:

```bash
docker-compose up -d
```

Run migrations

```bash
make db/migrate
```

Import players

```bash
make db/import_players
```

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

## Tests

Running backend tests

```bash
make tests/backend
```

Running frontend tests

```bash
make tests/frontend
```
