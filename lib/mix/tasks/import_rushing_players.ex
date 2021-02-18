defmodule Mix.Tasks.ImportRushingPlayers do
  use Mix.Task

  alias TheRush.ImportPlayerService

  @spec run(any) :: any
  def run(_) do
    Mix.Task.run("app.start")

    ImportPlayerService.import_players_from_file("fixtures/rushing.json")
  end
end
