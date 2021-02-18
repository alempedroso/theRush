defmodule TheRush.PlayerParser do
  def raw_player_to_structured_player(raw_player) do
    %{
      longest_rush: get_longest_rush(raw_player["Lng"]),
      longest_rush_takedown: get_longest_rush_takedown(raw_player["Lng"]),
      name: raw_player["Player"],
      position: raw_player["Pos"],
      rushing_attempts: parse_string_to_integer(raw_player["Att"]),
      rushing_attempts_per_game_avg: parse_string_to_float(raw_player["Att/G"]),
      rushing_first_down_percentage: parse_string_to_float(raw_player["1st%"]),
      rushing_first_downs: parse_string_to_integer(raw_player["1st"]),
      rushing_flumbles: parse_string_to_integer(raw_player["FUM"]),
      rushing_forty_plus_yards: parse_string_to_integer(raw_player["40+"]),
      rushing_twenty_plus_yards: parse_string_to_integer(raw_player["20+"]),
      rushing_yards_per_game: parse_string_to_float(raw_player["Yds/G"]),
      team: raw_player["Team"],
      total_rushing_takedowns: parse_string_to_integer(raw_player["TD"]),
      total_rushing_yards: parse_string_to_integer(raw_player["Yds"]),
      total_rushing_yards_per_attempt: parse_string_to_float(raw_player["Avg"]),
      inserted_at: get_current_time_in_naive_timestamp(),
      updated_at: get_current_time_in_naive_timestamp()
    }
  end

  defp parse_string_to_integer(value) when is_number(value) do
    value
  end

  defp parse_string_to_integer(value) do
    value
    |> String.replace(",", "")
    |> String.to_integer
  end

  defp parse_string_to_float(value) when is_number(value) do
    value / 1
  end

  defp parse_string_to_float(value) do
    {float_number, _} = value
    |> String.replace(",", "")
    |> Float.parse

    float_number
  end

  defp get_longest_rush(value) when is_number(value) do
    value
  end

  defp get_longest_rush(value) do
    value
    |> String.replace("T", "")
    |> parse_string_to_integer
  end

  defp get_longest_rush_takedown(value) when is_binary(value) do
    String.last(value) == "T"
  end

  defp get_longest_rush_takedown(_) do
    false
  end

  defp get_current_time_in_naive_timestamp() do
    Timex.now()
    |> Timex.to_naive_datetime
    |> NaiveDateTime.truncate(:second)
  end
end
