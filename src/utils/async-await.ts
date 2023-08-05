import { IAsyncAwait } from '../models';

/**
 * @description Convenience method to better handle async/await calls and make the
 * code cleaner and easier to read rather than using try/catch
 * @param promise - The Promise to execute
 *
 * @example
 *
 * ```typescript
 *
 * async myAsyncFunction() {
 *  const result: IAsyncAwait<string | null, any> = await asyncAwaitHandler(somePromise(someParam));
 * }
 *
 * // using destructuring
 * async myAsyncFunction() {
 *  const { error, response }: IAsyncAwait<number | null, Error | null> = await asyncAwaitHandler(somePromise(someParam));
 * }
 *
 * ```
 */
export const asyncAwaitHandler: <A, B>(
  promise: Promise<A>
) => Promise<IAsyncAwait<A | null, B | null>> = <A, B>(
  promise: Promise<A>
): Promise<IAsyncAwait<A | null, B | null>> => {
  return promise
    .then((response: A): IAsyncAwait<A, null> => ({ error: null, response }))
    .catch(
      (error: B): Promise<IAsyncAwait<null, B>> =>
        Promise.resolve({ error, response: null })
    );
};
