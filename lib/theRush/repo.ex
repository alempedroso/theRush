defmodule TheRush.Repo do
  use Ecto.Repo,
    otp_app: :theRush,
    adapter: Ecto.Adapters.Postgres
end
