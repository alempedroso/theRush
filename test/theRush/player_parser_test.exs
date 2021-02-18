defmodule PlayerParserTest do
  use ExUnit.Case, async: true
  alias TheRush.PlayerParser

  @base_raw_player %{
    "Player" => "Eddie Lacy",
    "Team" => "GB",
    "Pos" => "RB",
    "Att" => 71,
    "Att/G" => 14.2,
    "Yds" => "360",
    "Avg" => 5.1,
    "Yds/G" => 72,
    "TD" => 0,
    "Lng" => "31",
    "1st" => 15,
    "1st%" => 21.1,
    "20+" => 4,
    "40+" => 0,
    "FUM" => 0
  }

  describe "when numbers are passed as string" do
    test "parses string to number" do
      raw_player = Map.merge(@base_raw_player, %{
        "Att" => "71",
        "Att/G" => "14.2",
        "Yds" => "360",
        "Avg" => "5.1",
        "Yds/G" => "72",
        "TD" => "0",
        "Lng" => "31",
        "1st" => "15",
        "1st%" => "21.1",
        "20+" => "4",
        "40+" => "0",
        "FUM" => "0"
      })

      result = PlayerParser.raw_player_to_structured_player(raw_player)

      assert Map.get(result, :longest_rush) == 31
      assert Map.get(result, :rushing_attempts) == 71
      assert Map.get(result, :rushing_attempts_per_game_avg) == 14.2
      assert Map.get(result, :rushing_first_down_percentage) == 21.1
      assert Map.get(result, :rushing_first_downs) == 15
      assert Map.get(result, :rushing_flumbles) == 0
      assert Map.get(result, :rushing_forty_plus_yards) == 0
      assert Map.get(result, :rushing_twenty_plus_yards) == 4
      assert Map.get(result, :rushing_yards_per_game) == 72.0
      assert Map.get(result, :total_rushing_takedowns) == 0
      assert Map.get(result, :total_rushing_yards) == 360
      assert Map.get(result, :total_rushing_yards_per_attempt) == 5.1
    end
  end

  describe "when floats are passed as integers" do
    test "converts integer to float" do
      raw_player = Map.merge(@base_raw_player, %{
        "Att/G" => 14,
        "Avg" => 5,
        "Yds/G" => 72,
        "1st%" => 21
      })

      result = PlayerParser.raw_player_to_structured_player(raw_player)

      assert Map.get(result, :rushing_attempts_per_game_avg) == 14.0
      assert Map.get(result, :rushing_first_down_percentage) == 21.0
      assert Map.get(result, :rushing_yards_per_game) == 72.0
      assert Map.get(result, :total_rushing_yards_per_attempt) == 5.0
    end
  end

  describe "when longest rush is a string ending with T" do
    test "gets numeric part as integer and stores takedown as true" do
      raw_player = Map.merge(@base_raw_player, %{
        "Lng" => "71T",
      })

      result = PlayerParser.raw_player_to_structured_player(raw_player)

      assert Map.get(result, :longest_rush) == 71
      assert Map.get(result, :longest_rush_takedown) == true
    end
  end

  describe "when longest rush is string without a T" do
    test "gets numeric part as integer and stores takedown as false" do
      raw_player = Map.merge(@base_raw_player, %{
        "Lng" => "71",
      })

      result = PlayerParser.raw_player_to_structured_player(raw_player)

      assert Map.get(result, :longest_rush) == 71
      assert Map.get(result, :longest_rush_takedown) == false
    end
  end

  describe "when longest rush is a number" do
    test "passes integer and stores takedown boolean as false" do
      raw_player = Map.merge(@base_raw_player, %{
        "Lng" => 71,
      })

      result = PlayerParser.raw_player_to_structured_player(raw_player)

      assert Map.get(result, :longest_rush) == 71
      assert Map.get(result, :longest_rush_takedown) == false
    end
  end

  test "includes timestamp" do
    result = PlayerParser.raw_player_to_structured_player(@base_raw_player)

    assert %NaiveDateTime{} = Map.get(result, :inserted_at)
    assert %NaiveDateTime{} = Map.get(result, :updated_at)
  end
end
