defmodule TheRush.Player.Player do
  use Ecto.Schema
  import Ecto.Changeset

  schema "players" do
    field :longest_rush, :integer
    field :longest_rush_takedown, :boolean, default: false
    field :name, :string
    field :position, :string
    field :rushing_attempts, :integer
    field :rushing_attempts_per_game_avg, :float
    field :rushing_first_down_percentage, :float
    field :rushing_first_downs, :integer
    field :rushing_flumbles, :integer
    field :rushing_forty_plus_yards, :integer
    field :rushing_twenty_plus_yards, :integer
    field :rushing_yards_per_game, :float
    field :team, :string
    field :total_rushing_takedowns, :integer
    field :total_rushing_yards, :integer
    field :total_rushing_yards_per_attempt, :float

    timestamps()
  end

  def changeset(player, attrs) do
    player
    |> cast(attrs, [:name, :team, :position, :rushing_attempts, :rushing_attempts_per_game_avg, :total_rushing_yards, :total_rushing_yards_per_attempt, :rushing_yards_per_game, :total_rushing_takedowns, :longest_rush, :longest_rush_takedown, :rushing_first_downs, :rushing_first_down_percentage, :rushing_twenty_plus_yards, :rushing_forty_plus_yards, :rushing_flumbles])
    |> validate_required([:name, :team, :position, :rushing_attempts, :rushing_attempts_per_game_avg, :total_rushing_yards, :total_rushing_yards_per_attempt, :rushing_yards_per_game, :total_rushing_takedowns, :longest_rush, :longest_rush_takedown, :rushing_first_downs, :rushing_first_down_percentage, :rushing_twenty_plus_yards, :rushing_forty_plus_yards, :rushing_flumbles])
  end
end
