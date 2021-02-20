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
    Player
    |> filter_by_player_name(player_name)
    |> include_order_by(order_by, order_by_direction)
    |> limit(^page_limit)
    |> offset(^(page * page_limit))
    |> Repo.all
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
