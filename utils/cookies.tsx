"use server";
type CookieOptions = {
  path?: string;
  domain?: string;
  secure?: boolean;
  maxAge?: number;
  expires?: Date | string;
  httpOnly?: boolean;
  sameSite?: "strict" | "lax" | "none";
};

/**
 * Sets a cookie with the given name, value, and options
 *
 * @param name The name of the cookie
 * @param value The value of the cookie
 * @param options Cookie options like expiration, path, etc.
 */
export async function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {}
): Promise<void> {
  if (typeof document === "undefined") {
    console.warn("Cannot set cookie in non-browser environment");
    return;
  }

  const cookieOptions = {
    // path: "/",
    ...options,
  };

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (cookieOptions.path) {
    cookieString += `; path=${cookieOptions.path}`;
  }

  if (cookieOptions.domain) {
    cookieString += `; domain=${cookieOptions.domain}`;
  }

  if (cookieOptions.maxAge) {
    cookieString += `; max-age=${cookieOptions.maxAge}`;
  }

  if (cookieOptions.expires) {
    const expirationDate =
      typeof cookieOptions.expires === "string"
        ? cookieOptions.expires
        : cookieOptions.expires.toUTCString();
    cookieString += `; expires=${expirationDate}`;
  }

  if (cookieOptions.secure) {
    cookieString += "; secure";
  }

  if (cookieOptions.httpOnly) {
    cookieString += "; httpOnly";
  }

  if (cookieOptions.sameSite) {
    cookieString += `; sameSite=${cookieOptions.sameSite}`;
  }

  document.cookie = cookieString;
}

/**
 * Gets a cookie value by name
 *
 * @param name The name of the cookie to retrieve
 * @returns The cookie value or null if not found
 */
export async function getCookie(name: string): Promise<string | null> {
  if (typeof document === "undefined") {
    console.warn("Cannot get cookie in non-browser environment");
    return null;
  }

  const cookies = document.cookie.split(";");
  const normalizedName = encodeURIComponent(name);

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();

    // Check if this cookie begins with the name we want
    if (cookie.indexOf(normalizedName + "=") === 0) {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }

  return null;
}

/**
 * Deletes a cookie by setting its expiration date to the past
 *
 * @param name The name of the cookie to delete
 * @param options Cookie options (path and domain must match the set cookie)
 */
export async function deleteCookie(
  name: string,
  options: CookieOptions = {}
): Promise<void> {
  // Set expiration to a past date to delete the cookie
  setCookie(name, "", {
    ...options,
    expires: new Date(0), // Thu Jan 01 1970
    maxAge: 0,
  });
}

/**
 * Server-side cookie utilities for Next.js
 */

import { cookies } from "next/headers";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

/**
 * Sets a cookie server-side in Next.js
 *
 * @param name The name of the cookie
 * @param value The value of the cookie
 * @param options Cookie options
 */
export async function setServerCookie(
  name: string,
  value: string,
  options: Partial<ResponseCookie> = {}
): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set({
    name,
    value,
    path: "/",
    ...options,
  });
}

/**
 * Gets a cookie value server-side in Next.js
 *
 * @param name The name of the cookie to retrieve
 * @returns The cookie value or undefined if not found
 */
export async function getServerCookie(
  name: string
): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
}

/**
 * Deletes a cookie server-side in Next.js
 *
 * @param name The name of the cookie to delete
 * @param options Cookie options (path and domain must match the set cookie)
 */
export async function deleteServerCookie(
  name: string,
  options: Partial<ResponseCookie> = {}
): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete({
    name,
    path: "/",
    ...options,
  });
}
