defmodule TheRushWeb.Api.PlayerView do
  use TheRushWeb, :view

  def render("index.json", %{result: %{players: players, players_count: players_count}}) do
    %{
      players: render_many(players, TheRushWeb.Api.PlayerView, "player.json"),
      players_count: players_count
    }
  end

  def render("player.json", %{player: player}) do
    %{
      longest_rush: player.longest_rush,
      longest_rush_takedown: player.longest_rush_takedown,
      name: player.name,
      position: player.position,
      rushing_attempts: player.rushing_attempts,
      rushing_attempts_per_game_avg: player.rushing_attempts_per_game_avg,
      rushing_first_down_percentage: player.rushing_first_down_percentage,
      rushing_first_downs: player.rushing_first_downs,
      rushing_flumbles: player.rushing_flumbles,
      rushing_forty_plus_yards: player.rushing_forty_plus_yards,
      rushing_twenty_plus_yards: player.rushing_twenty_plus_yards,
      rushing_yards_per_game: player.rushing_yards_per_game,
      team: player.team,
      total_rushing_takedowns: player.total_rushing_takedowns,
      total_rushing_yards: player.total_rushing_yards,
      total_rushing_yards_per_attempt: player.total_rushing_yards_per_attempt
    }
  end
end
