defmodule Player.ImportServiceTest do
  use TheRush.DataCase, async: true

  alias TheRush.Repo
  alias TheRush.Player.{ ImportService, Player }

  test "inserts players in database" do
    ImportService.import_players_from_file("test/fixtures/reduced_rushing.json")

    assert Repo.aggregate(Player, :count) == 2
  end
end
