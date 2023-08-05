import { IAsyncAwait } from '../models';
import { asyncAwaitHandler } from './async-await';

class MockClass {
  public static mockPromise(): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return new Promise<any>(() => {});
  }
}

describe('async/await handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should succeed', async () => {
    expect.assertions(2);
    jest.spyOn(MockClass, 'mockPromise').mockResolvedValue('success');

    const { error, response }: IAsyncAwait<string, any> =
      await asyncAwaitHandler(MockClass.mockPromise());

    expect(error).toBeNull();
    expect(response).toBe('success');
  });

  it('should handle failures gracefully and await still resolves to allow the flow to continue', async () => {
    expect.assertions(2);
    jest.spyOn(MockClass, 'mockPromise').mockRejectedValue('error');

    const { error, response }: IAsyncAwait<string, any> =
      await asyncAwaitHandler(MockClass.mockPromise());

    expect(error).toBe('error');
    expect(response).toBeNull();
  });
});
