FROM elixir:1.11.2-alpine AS base

RUN apk add --update nodejs npm

WORKDIR /app

ADD mix.exs mix.lock ./
RUN mix local.hex --force && \
    mix local.rebar --force

FROM base AS builder

RUN mix do deps.get, deps.compile

ADD package.json ./
RUN npm install

ADD . .

RUN npm run deploy && \
    mix do compile, phx.digest

FROM base

COPY --from=builder /app/_build /app/_build
COPY --from=builder /app/priv /app/priv
COPY --from=builder /app/config /app/config
COPY --from=builder /app/lib /app/lib
COPY --from=builder /app/deps /app/deps
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/assets /app/assets
COPY --from=builder /app/test /app/test
COPY --from=builder /app/*.js /app/
COPY --from=builder /app/*.json /app/
COPY --from=builder /app/*rc /app/
COPY --from=builder /app/fixtures /app/fixtures
