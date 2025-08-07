import { expect, test } from '@jest/globals';
import { useUpdateEffect } from './useUpdateEffect';
import { renderHook } from '@testing-library/react';

describe('тестируем хук useUpdateEffect', () => {
  test('не вызывает эффект при первом рендере', () => {
    const effectMock = jest.fn();
    renderHook(() => useUpdateEffect(effectMock));

    expect(effectMock).not.toHaveBeenCalled();
  });

  test('вызывает эффект при обновлении зависимостей', () => {
    const effectMock = jest.fn();
    const { rerender } = renderHook(
      (deps) => useUpdateEffect(effectMock, deps),
      { initialProps: [1] }
    );

    expect(effectMock).not.toHaveBeenCalled();

    rerender([2]);
    expect(effectMock).toHaveBeenCalledTimes(1);
  });

  test('не вызывает эффект повторно без изменения зависимостей', () => {
    const effectMock = jest.fn();
    const { rerender } = renderHook(
      (deps) => useUpdateEffect(effectMock, deps),
      { initialProps: [1] }
    );
    expect(effectMock).not.toHaveBeenCalled();

    rerender([1]);
    expect(effectMock).not.toHaveBeenCalled();
  });
});
