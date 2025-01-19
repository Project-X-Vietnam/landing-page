// utils/lark.ts
interface CachedToken {
    access_token: string;
    expires_at: number;
  }

let tokenCache: CachedToken | null = null;

function isTokenValid(): boolean {
    if (!tokenCache) return false;
    const currentTime = Date.now() / 1000;
    return currentTime < tokenCache.expires_at - 5;
  }

async function fetchNewToken() {
    const response = await fetch('https://open.larksuite.com/open-apis/auth/v3/app_access_token/internal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        app_id: process.env.LARK_APP_ID,
        app_secret: process.env.LARK_APP_SECRET,
      }),
    });

    const data = await response.json();
    const expiresAt = (Date.now() / 1000) + 7200;

    tokenCache = {
      access_token: data.tenant_access_token,
      expires_at: expiresAt,
    };
    return data.tenant_access_token;
  }

export async function getLarkToken() {
    if (isTokenValid()) {
      return tokenCache!.access_token;
    }
    return await fetchNewToken();
  }
