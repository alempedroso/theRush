defmodule TheRushWeb.Api.PlayerController do
  use TheRushWeb, :controller

  alias Ecto.Changeset
  alias TheRush.Player.{ PlayerSearch, PlayerSearchRepository }
  require Ecto.Query

  action_fallback TheRush.FallbackController

  def index(conn, params) do
    case PlayerSearch.changeset(%PlayerSearch{}, params) do
      %{valid?: false} = invalid_changeset ->
        {:error, invalid_changeset}

      valid_changeset ->
        render(conn, "index.json", players: get_players(valid_changeset))
    end
  end

  defp get_players(valid_changeset) do
    valid_changeset
    |> Changeset.apply_changes
    |> PlayerSearchRepository.search
  end
end
