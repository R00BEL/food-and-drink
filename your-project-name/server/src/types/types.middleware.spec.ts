import { TypesMiddleware } from './types.middleware';

describe('TypesMiddleware', () => {
  it('should be defined', () => {
    expect(new TypesMiddleware()).toBeDefined();
  });
});
