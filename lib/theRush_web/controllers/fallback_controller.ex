defmodule TheRush.FallbackController do
  use Phoenix.Controller

  def call(conn, {:error, %Ecto.Changeset{} = changeset}) do
    conn
    |> put_status(:unprocessable_entity)
    |> put_view(TheRushWeb.Api.ErrorView)
    |> render(:"422", changeset: changeset)
  end
end
