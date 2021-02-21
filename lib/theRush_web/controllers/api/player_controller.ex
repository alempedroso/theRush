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
        render(conn, "index.json", result: get_players(valid_changeset))
    end
  end

  def export(conn, params) do
    case PlayerSearch.changeset(%PlayerSearch{}, params) do
      %{valid?: false} = invalid_changeset ->
        {:error, invalid_changeset}

      valid_changeset ->
        conn = conn
        |> put_resp_content_type("text/csv")
        |> put_resp_header("content-disposition", "attachment; filename=export.csv")
        |> send_chunked(200)

        {:ok, conn} = export_players(valid_changeset, conn)

        conn
    end
  end

  defp get_players(valid_changeset) do
    valid_changeset
    |> Changeset.apply_changes
    |> PlayerSearchRepository.search
  end

  defp export_players(valid_changeset, conn) do
    valid_changeset
    |> Changeset.apply_changes
    |> PlayerSearchRepository.export(conn)
  end
end
