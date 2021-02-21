defmodule TheRushWeb.Api.PlayerControllerSearchTest do
  use TheRushWeb.ConnCase

  alias TheRush.Player.ImportService

  setup do
    ImportService.import_players_from_file("test/fixtures/reduced_rushing.json")
  end

  describe "when passing empty params" do
    test "returns players", %{conn: conn} do
      conn = get(conn, "/api/players")
      %{ "players" => players } = json_response(conn, 200)

      assert Enum.count(players) == 2
      assert Enum.fetch!(players, 0)["name"] =~ "Joe"
      assert Enum.fetch!(players, 1)["name"] =~ "Coby"
    end
  end

  describe "when passing valid params" do
    test "returns players", %{conn: conn} do
      conn = get(conn, "/api/players", %{
        limit: 1,
        offset: 0,
        player_name: "joe",
        order_by: "longest_rush",
        order_by_direction: "desc"
      })
      %{ "players" => players } = json_response(conn, 200)

      assert Enum.count(players) == 1
      assert Enum.fetch!(players, 0)["name"] =~ "Joe"
    end
  end

  describe "when passing invalid params" do
    test "returns error for invalid limit", %{conn: conn} do
      conn = get(conn, "/api/players", %{
        limit: 999
      })
      %{ "errors" => errors } = json_response(conn, 422)

      assert errors["limit"] == "must be less than or equal to 50"
    end

    test "returns error for invalid page", %{conn: conn} do
      conn = get(conn, "/api/players", %{
        page: -1
      })
      %{ "errors" => errors } = json_response(conn, 422)

      assert errors["page"] == "must be greater than or equal to 0"
    end

    test "returns error for invalid player_name", %{conn: conn} do
      conn = get(conn, "/api/players", %{
        player_name: %{}
      })
      %{ "errors" => errors } = json_response(conn, 422)

      assert errors["player_name"] == "is invalid"
    end

    test "returns error for invalid order_by", %{conn: conn} do
      conn = get(conn, "/api/players", %{
        order_by: %{}
      })
      %{ "errors" => errors } = json_response(conn, 422)

      assert errors["order_by"] == "is invalid"
    end
  end
end
