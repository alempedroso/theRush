defmodule TheRush.Player.PlayerSearchRepository do
  alias TheRush.Player.{ Player, PlayerSearch }
  alias TheRush.Repo
  import Ecto.Query
  import Ecto.Query.API, only: [ilike: 2]

  def search(%PlayerSearch{
    limit: page_limit,
    page: page,
    player_name: player_name,
    order_by: order_by,
    order_by_direction: order_by_direction
  }) do
    query =
      Player
      |> filter_by_player_name(player_name)
      |> include_order_by(order_by, order_by_direction)
      |> limit(^page_limit)
      |> offset(^(page * page_limit))

    %{
      players: Repo.all(query),
      players_count: fetch_count(query)
    }
  end

  def export(%PlayerSearch{
    player_name: player_name,
    order_by: order_by,
    order_by_direction: order_by_direction
  }, conn) do
    query =
      Player
      |> filter_by_player_name(player_name)
      |> include_order_by(order_by, order_by_direction)

    {sql_string, params} = Repo.to_sql(:all, query)

    parsed_string = params
    |> Enum.with_index
    |> Enum.reduce(sql_string, fn ({value, index}, acc) ->
      String.replace(acc, "$#{index+1}", "'#{value}'")
    end)

    export_query_stream(parsed_string, conn)
  end

  defp export_query_stream(sql_query_string, conn) do
    Repo.transaction(fn ->
      Ecto.Adapters.SQL.stream(Repo, "COPY (#{sql_query_string}) TO STDOUT WITH CSV HEADER DELIMITER ','")
      |> Stream.map(&(&1.rows))
      |> Enum.reduce_while(conn, fn (data, conn) ->
        case Plug.Conn.chunk(conn, data) do
          {:ok, conn} ->
            {:cont, conn}
          {:error, :closed} ->
            {:halt, conn}
        end
      end)
    end)
  end

  defp fetch_count(query) do
    query
    |> exclude(:limit)
    |> exclude(:offset)
    |> Repo.aggregate(:count)
  end

  defp filter_by_player_name(query, nil), do: query

  defp filter_by_player_name(query, player_name) do
    query
    |> where([p], ilike(p.name, ^"%#{player_name}%"))
  end

  defp include_order_by(query, nil, _), do: query

  defp include_order_by(query, order_by, "asc") do
    query
    |> order_by(asc: ^String.to_atom(order_by))
  end

  defp include_order_by(query, order_by, "desc") do
    query
    |> order_by(desc: ^String.to_atom(order_by))
  end
end
