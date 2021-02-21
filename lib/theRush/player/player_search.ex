defmodule TheRush.Player.PlayerSearch do
  use Ecto.Schema
  import Ecto.Changeset

  @fields ~w(player_name order_by order_by_direction limit page)a

  schema "PlayerSearchParams" do
    field :player_name, :string
    field :order_by, :string
    field :order_by_direction, :string, default: "desc"
    field :limit, :integer, default: 10
    field :page, :integer, default: 0
  end

  def changeset(ch, params) do
    cast(ch, params, @fields)
    |> validate_number(:limit, greater_than_or_equal_to: 1, less_than_or_equal_to: 50)
    |> validate_number(:page, greater_than_or_equal_to: 0)
  end
end
