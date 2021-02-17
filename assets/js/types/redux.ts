export type ReduxAction<Payload = unknown> = {
  type: string;
  payload: Payload;
};
