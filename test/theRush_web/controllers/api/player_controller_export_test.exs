defmodule TheRushWeb.Api.PlayerControllerExportTest do
  use TheRushWeb.ConnCase

  alias TheRush.Player.ImportService

  setup do
    ImportService.import_players_from_file("test/fixtures/reduced_rushing.json")
  end

  describe "when passing empty params" do
    test "returns players and headers", %{conn: conn} do
      conn = get(conn, "/api/players/export")

      assert conn.resp_body =~ "id,longest_rush,longest_rush_takedown,name,position,rushing_attempts,rushing_attempts_per_game_avg,rushing_first_down_percentage,rushing_first_downs,rushing_flumbles,rushing_forty_plus_yards,rushing_twenty_plus_yards,rushing_yards_per_game,team,total_rushing_takedowns,total_rushing_yards,total_rushing_yards_per_attempt,inserted_at,updated_at\n"
      assert conn.resp_body =~ "Joe Banyard"
      assert conn.resp_body =~ "Coby Fleener"
    end
  end

  describe "when passing valid params" do
    test "returns players and headers", %{conn: conn} do
      conn = get(conn, "/api/players/export", %{
        player_name: "joe",
        order_by: "longest_rush",
        order_by_direction: "desc",
      })

      assert conn.resp_body =~ "id,longest_rush,longest_rush_takedown,name,position,rushing_attempts,rushing_attempts_per_game_avg,rushing_first_down_percentage,rushing_first_downs,rushing_flumbles,rushing_forty_plus_yards,rushing_twenty_plus_yards,rushing_yards_per_game,team,total_rushing_takedowns,total_rushing_yards,total_rushing_yards_per_attempt,inserted_at,updated_at\n"
      assert conn.resp_body =~ "Joe Banyard"
      refute conn.resp_body =~ "Coby Fleener"
    end
  end

  describe "when passing invalid params" do
    test "returns error for invalid limit", %{conn: conn} do
      conn = get(conn, "/api/players/export", %{
        limit: 999
      })
      %{ "errors" => errors } = json_response(conn, 422)

      assert errors["limit"] == "must be less than or equal to 50"
    end

    test "returns error for invalid page", %{conn: conn} do
      conn = get(conn, "/api/players/export", %{
        page: -1
      })
      %{ "errors" => errors } = json_response(conn, 422)

      assert errors["page"] == "must be greater than or equal to 0"
    end

    test "returns error for invalid player_name", %{conn: conn} do
      conn = get(conn, "/api/players/export", %{
        player_name: %{}
      })
      %{ "errors" => errors } = json_response(conn, 422)

      assert errors["player_name"] == "is invalid"
    end

    test "returns error for invalid order_by", %{conn: conn} do
      conn = get(conn, "/api/players/export", %{
        order_by: %{}
      })
      %{ "errors" => errors } = json_response(conn, 422)

      assert errors["order_by"] == "is invalid"
    end
  end
end
