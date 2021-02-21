import axios, { AxiosResponse } from "axios";
import { FiltersState } from "../store/filters/reducer";
import { PlayersState } from "../store/players/reducer";

export const client = axios.create({
  baseURL: "http://localhost:4000/api",
  timeout: 1000,
});

export async function searchPlayers(
  params: FiltersState
): Promise<AxiosResponse<PlayersState>> {
  return client.get<PlayersState>("/players", { params });
}

export async function exportPlayers(
  params: FiltersState
): Promise<AxiosResponse<string>> {
  return client.get<string>("/players/export", { params });
}
