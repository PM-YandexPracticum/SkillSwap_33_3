import { renderHook } from '@testing-library/react';
import { useClickOutside } from './useClickOutside';

describe('тестируем хук useClickOutside', () => {
  let mockRef: React.RefObject<HTMLElement>;
  let mockOnClose: jest.Mock;
  let addEventListenerSpy: jest.SpyInstance;
  let removeEventListenerSpy: jest.SpyInstance;

  beforeEach(() => {
    mockRef = { current: document.createElement('div') };
    mockOnClose = jest.fn();
    addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('добавляет обработчик при монтировании', () => {
    renderHook(() => useClickOutside(mockRef, mockOnClose));

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'mousedown',
      expect.any(Function)
    );
  });

  test('срабатывает вне элемента', () => {
    renderHook(() => useClickOutside(mockRef, mockOnClose));

    const event = new MouseEvent('mousedown');
    document.dispatchEvent(event);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('не срабатывает внутри элемента', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    mockRef.current = div;

    renderHook(() => useClickOutside(mockRef, mockOnClose));
    const event = new MouseEvent('mousedown', { bubbles: true });
    div.dispatchEvent(event);

    expect(mockOnClose).not.toHaveBeenCalled();
    document.body.removeChild(div);
  });

  test('удаляет обработчик при размонтировании', () => {
    const { unmount } = renderHook(() => useClickOutside(mockRef, mockOnClose));

    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'mousedown',
      expect.any(Function)
    );
  });
});
