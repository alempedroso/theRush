defmodule Mix.Tasks.ImportRushingPlayers do
  use Mix.Task

  alias TheRush.Player.ImportService

  @spec run(any) :: any
  def run(_) do
    Mix.Task.run("app.start")

    ImportService.import_players_from_file("fixtures/rushing.json")
  end
end
