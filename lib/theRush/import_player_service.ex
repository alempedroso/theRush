defmodule TheRush.ImportPlayerService do
  alias TheRush.{ Player, PlayerParser, Repo }

  @spec import_players_from_file(String.t()) :: :ok
  def import_players_from_file(file_name) do
    File.read!(file_name)
    |> Jason.decode!
    |> Enum.chunk_every(100)
    |> Enum.each(&import_to_database/1)
  end

  defp import_to_database(players) do
    Repo.insert_all(Player, get_parsed_players(players))
  end

  defp get_parsed_players(players) do
    players
    |> Enum.map(&PlayerParser.raw_player_to_structured_player/1)
  end
end
