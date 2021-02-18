defmodule TheRush.Repo.Migrations.CreatePlayers do
  use Ecto.Migration

  def change do
    create table(:players) do
      add :name, :string
      add :team, :string
      add :position, :string
      add :rushing_attempts, :integer
      add :rushing_attempts_per_game_avg, :float
      add :total_rushing_yards, :integer
      add :total_rushing_yards_per_attempt, :float
      add :rushing_yards_per_game, :float
      add :total_rushing_takedowns, :integer
      add :longest_rush, :integer
      add :longest_rush_takedown, :boolean, default: false, null: false
      add :rushing_first_downs, :integer
      add :rushing_first_down_percentage, :float
      add :rushing_twenty_plus_yards, :integer
      add :rushing_forty_plus_yards, :integer
      add :rushing_flumbles, :integer

      timestamps()
    end
  end
end
