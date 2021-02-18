defmodule ImportPlayerServiceTest do
  use ExUnit.Case, async: true

  alias TheRush.{ ImportPlayerService, Player, Repo }

  setup do
    :ok = Ecto.Adapters.SQL.Sandbox.checkout(Repo)
  end

  test "inserts players in database" do
    ImportPlayerService.import_players_from_file("test/fixtures/reduced_rushing.json")

    assert Repo.aggregate(Player, :count) == 2
  end
end
