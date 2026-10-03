// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import AuthModalLogin from './AuthModalLogin';
import { LanguageProvider } from './LanguageProvider';

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe('AuthModalLogin', () => {
  it('does not authenticate when the server rejects credentials', async () => {
    const user = userEvent.setup();
    const onLoginSuccess = vi.fn();
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Credenciales inválidas para esta prueba.' }),
    });
    vi.stubGlobal('fetch', fetchMock);

    render(
      <LanguageProvider>
        <AuthModalLogin isOpen onClose={vi.fn()} onLoginSuccess={onLoginSuccess} />
      </LanguageProvider>
    );

    await user.type(screen.getByPlaceholderText('tu.correo@ejemplo.com'), 'persona@example.com');
    await user.type(screen.getByPlaceholderText('••••••••'), 'WrongPassword123!');
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    expect(fetchMock).toHaveBeenCalledWith('/api/auth/login', expect.objectContaining({ method: 'POST' }));
    expect(await screen.findByText('Credenciales inválidas para esta prueba.')).toBeTruthy();
    expect(onLoginSuccess).not.toHaveBeenCalled();
  });
});
