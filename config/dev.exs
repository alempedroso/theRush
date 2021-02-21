use Mix.Config

# Configure your database
config :theRush, TheRush.Repo,
  username: "postgres",
  password: "postgres",
  database: "therush_dev",
  hostname: System.get_env("DATABASE_HOST") || "localhost",
  pool_size: 10

config :theRush, TheRushWeb.Endpoint,
  http: [port: 4000],
  debug_errors: true,
  code_reloader: true,
  check_origin: false,
  watchers: [
    node: [
      "node_modules/webpack/bin/webpack.js",
      "--mode",
      "development",
      "--watch-stdin",
      cd: Path.expand("../", __DIR__)
    ]
  ]

config :theRush, TheRushWeb.Endpoint,
  live_reload: [
    patterns: [
      ~r"priv/static/.*(js|css|png|jpeg|jpg|gif|svg)$",
      ~r"lib/theRush_web/(live|views)/.*(ex)$",
      ~r"lib/theRush_web/templates/.*(eex)$"
    ]
  ]

# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# Set a higher stacktrace during development. Avoid configuring such
# in production as building large stacktraces may be expensive.
config :phoenix, :stacktrace_depth, 20

# Initialize plugs at runtime for faster development compilation
config :phoenix, :plug_init_mode, :runtime
