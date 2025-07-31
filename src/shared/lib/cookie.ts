export interface CookieOptions {
  expires?: Date | number;
  maxAge?: number;
  domain?: string;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

/**
 * Устанавливает cookie
 * @param name - имя cookie
 * @param value - значение cookie
 * @param options - опции cookie
 */
export const setCookie = (
  name: string,
  value: string,
  options: CookieOptions = {}
): void => {
  const {
    expires,
    maxAge,
    domain,
    path = '/',
    secure,
    httpOnly,
    sameSite = 'lax',
  } = options;

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (expires) {
    const expiresDate =
      typeof expires === 'number'
        ? new Date(Date.now() + expires * 24 * 60 * 60 * 1000)
        : expires;
    cookieString += `; expires=${expiresDate.toUTCString()}`;
  }

  if (maxAge !== undefined) {
    cookieString += `; max-age=${maxAge}`;
  }

  if (domain) {
    cookieString += `; domain=${domain}`;
  }

  cookieString += `; path=${path}`;

  if (secure) {
    cookieString += '; secure';
  }

  if (httpOnly) {
    cookieString += '; httponly';
  }

  cookieString += `; samesite=${sameSite}`;

  document.cookie = cookieString;
};

/**
 * Получает значение cookie по имени
 * @param name - имя cookie
 * @returns значение cookie или null, если не найдено
 */
export const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${encodeURIComponent(name)}=`);

  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(';').shift();
    return cookieValue ? decodeURIComponent(cookieValue) : null;
  }

  return null;
};

/**
 * Удаляет cookie
 * @param name - имя cookie
 * @param options - опции для удаления (domain и path)
 */
export const deleteCookie = (
  name: string,
  options: Pick<CookieOptions, 'domain' | 'path'> = {}
): void => {
  setCookie(name, '', {
    ...options,
    expires: new Date(0),
    maxAge: -1,
  });
};
