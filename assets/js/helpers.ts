export const convertRawDataToFormattedData = (rawData) => ({
  name: rawData.Player,
  team: rawData.Team,
  position: rawData.Pos,
  rushing_attempts_per_game_avg: rawData.Att,
  rushing_attempts: rawData["Att/G"],
  total_rushing_yards: rawData.Yds,
  total_rushing_yards_per_attempt: rawData.Avg,
  rushing_yards_per_game: rawData["Yds/G"],
  total_rushing_takedowns: rawData.TD,
  longest_rush: rawData.Lng,
  rushing_first_downs: rawData["1st"],
  rushing_first_down_percentage: rawData["1st%"],
  rushing_twenty_plus_yards: rawData["20+"],
  rushing_forty_plus_yards: rawData["40+"],
  rushing_flumbles: rawData.FUM,
});
