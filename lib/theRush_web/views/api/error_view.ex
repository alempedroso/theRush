defmodule TheRushWeb.Api.ErrorView do
  use TheRushWeb, :view

  def render("422.json", %{changeset: changeset}) do
    %{errors: translate_changeset_errors(changeset)}
  end

  defp translate_changeset_errors(changeset) do
    changeset
    |> Map.get(:errors)
    |> Enum.reduce(%{}, fn ({field, error}, acc) ->
      Map.put(acc, field, translate_error(error))
    end)
  end
end
