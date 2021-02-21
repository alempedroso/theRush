import axios, { AxiosResponse } from "axios";
import { FiltersState } from "../store/filters/reducer";
import { PlayersState } from "../store/players/reducer";

export const client = axios.create({
  baseURL: "http://localhost:4000/api",
  timeout: 1000,
});

export async function searchPlayer(
  params: FiltersState
): Promise<AxiosResponse<PlayersState>> {
  return client.get<PlayersState>("/players", { params });
}
