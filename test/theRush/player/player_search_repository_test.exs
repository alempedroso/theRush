defmodule Player.PlayerSearchRepositoryTest do
  use ExUnit.Case, async: true

  alias TheRush.Repo
  alias TheRush.Player.{ ImportService, PlayerSearch, PlayerSearchRepository }

  @default_params %{ limit: 10, page: 0 }

  setup do
    :ok = Ecto.Adapters.SQL.Sandbox.checkout(Repo)
    ImportService.import_players_from_file("test/fixtures/reduced_rushing.json")
  end

  describe "when filtering by name" do
    test "gets only player with given name" do
      %{players: players, players_count: players_count} = PlayerSearchRepository.search(
        Map.merge(@default_params, %PlayerSearch{ player_name: "coby" })
      )

      assert players_count == 1
      assert Enum.count(players) == 1
      assert Map.get(List.first(players), :name) =~ "Coby"
    end
  end

  describe "when using order_by" do
    test "gets players ordered by given field" do
      %{players: players, players_count: players_count} = PlayerSearchRepository.search(
        Map.merge(@default_params, %PlayerSearch{ order_by: "total_rushing_takedowns", order_by_direction: "desc" })
      )

      assert players_count == 2
      assert Enum.count(players) == 2
      assert Map.get(List.first(players), :name) =~ "Coby"
      assert Map.get(Enum.fetch!(players, 1), :name) =~ "Joe"
    end
  end

  describe "when using limit" do
    test "gets maximum player as given limit" do
      %{players: players, players_count: players_count} = PlayerSearchRepository.search(
        Map.merge(@default_params, %PlayerSearch{ limit: 1 })
      )

      assert players_count == 2
      assert Enum.count(players) == 1
      assert Map.get(List.first(players), :name) =~ "Joe"
    end
  end

  describe "when using offset different than 0" do
    test "gets next page of players" do
      %{players: players, players_count: players_count} = PlayerSearchRepository.search(
        Map.merge(@default_params, %PlayerSearch{ limit: 1, page: 1 })
      )

      assert players_count == 2
      assert Enum.count(players) == 1
      assert Map.get(List.first(players), :name) =~ "Coby"
    end
  end
end
