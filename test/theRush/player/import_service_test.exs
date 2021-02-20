defmodule Player.ImportServiceTest do
  use ExUnit.Case, async: true

  alias TheRush.Repo
  alias TheRush.Player.{ ImportService, Player }

  setup do
    :ok = Ecto.Adapters.SQL.Sandbox.checkout(Repo)
  end

  test "inserts players in database" do
    ImportService.import_players_from_file("test/fixtures/reduced_rushing.json")

    assert Repo.aggregate(Player, :count) == 2
  end
end
