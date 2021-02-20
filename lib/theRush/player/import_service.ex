defmodule TheRush.Player.ImportService do
  require Logger
  alias TheRush.Repo
  alias TheRush.Player.{ Player, Parser }

  @spec import_players_from_file(String.t()) :: :ok
  def import_players_from_file(file_name) do
    File.read!(file_name)
    |> Jason.decode!
    |> Enum.chunk_every(100)
    |> Enum.each(&import_to_database/1)
  end

  defp import_to_database(players) do
    Repo.insert_all(Player, get_parsed_players(players))
    |> print_result
  end

  defp get_parsed_players(players) do
    players
    |> Enum.map(&Parser.raw_player_to_structured_player/1)
  end

  defp print_result({modified_entries, _}) when is_number(modified_entries) do
    Logger.info("Successfully inserted #{modified_entries} entries at the database")
  end

  defp print_result(_) do
    Logger.warn("Error inserting at the database")
  end
end
