import { ListsMiddleware } from './lists.middleware';

describe('ListsMiddleware', () => {
  it('should be defined', () => {
    expect(new ListsMiddleware()).toBeDefined();
  });
});
