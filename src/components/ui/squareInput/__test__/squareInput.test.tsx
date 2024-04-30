import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi } from "vitest";
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import SquareInput from '@/components/ui/squareInput/squareInput';

const renderSquare = (value: string = "", pos: number = 0, focus: boolean = false,
                      highlight: boolean = false, wordNo: number = 0) =>
{
  const keyboardSpy = vi.fn();
  const mouseSpy = vi.fn();
  const { rerender } = render(
    <SquareInput value={value} pos={pos} focus={focus} highlight={highlight}
                 wordNo={wordNo} onMouseHandler={mouseSpy}
                 onKeyboardHandler={keyboardSpy} />
  );

  return {rerender, keyboardSpy, mouseSpy};
};

describe('SquareInput Unit Tests', () => {
  vi.doMock('@/useCrossword');

  it('Should render the square with default inputs', () => {
    renderSquare();
    const square = screen.getByDisplayValue('');
    expect(square).toBeInTheDocument();
  });

  it('Should focus the element when focus is true', () => {
    renderSquare('', 0, true);
    const square = screen.getByDisplayValue('');
    expect(square).toHaveFocus();
  });

  it('Should fire update grid on alpha numeric input', async () => {
    const alphanums = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');

    const {keyboardSpy} = renderSquare();
    const square = screen.getByDisplayValue('');

    const user = userEvent.setup();

    await Promise.all(alphanums.map(async (letter) => {
      await user.type(square, letter);
      //expect(keyboardSpy).toBeCalled();
      expect(keyboardSpy.mock.calls[0][0].key).toBe(letter);
      keyboardSpy.mockClear();
    }));
  });

});
