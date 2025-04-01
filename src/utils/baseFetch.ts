import { baseApi } from './constants';

const REVALIDATE_WINDOW = process.env.REVALIDATE_WINDOW || '1000 * 60 * 60'; // 10 minutes
const ENDPOINT = process.env.NEXT_PUBLIC_BASE_API_URL || baseApi;

function objectToURLSearchParams(obj: Record<string, any>): URLSearchParams {
  const params = new URLSearchParams();

  // eslint-disable-next-line no-restricted-syntax
  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      obj[key].forEach((value: any) => {
        params.append(`${key}[]`, value);
      });
    } else {
      params.append(key, obj[key]);
    }
  }
  return params;
}

export default async function fetchApi(
  method: string,
  path = '',
  payload?: {
    query?: Record<string, any>;
    body?: Record<string, any>;
  },
) {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: parseInt(REVALIDATE_WINDOW, 10) },
  };
  let newpath = '';
  if (payload) {
    if ('body' in payload) {
      options.body = JSON.stringify(payload.body);
    }
    if ('query' in payload) {
      const params = objectToURLSearchParams(payload.query!).toString();
      newpath = `${path}?${params}`;
    }
  }

  try {
    const result = await fetch(`${ENDPOINT}/${newpath}`, options);
    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      ok: result.ok,
      body,
    };
  } catch (error: any) {
    return error;
  }
}
