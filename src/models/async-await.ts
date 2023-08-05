export interface IAsyncAwait<T, R = Error | null> {
  error: R | null;
  response: T | null;
}
