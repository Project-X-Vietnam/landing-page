// src/lib/lark/auth.ts

interface LarkAuthResponse {
    app_access_token: string;
    code: number;
    expire: number;
    msg: string;
    tenant_access_token: string;
  }

interface TokenData {
    token: string;
    expireTime: number;
  }

let tokenCache: TokenData | null = null;

const APP_ID = process.env.LARK_APP_ID || 'cli_a7008db082bb5003';
const APP_SECRET = process.env.LARK_APP_SECRET || 'Uarj5Mo1RYQ8S37reApeVd70ZWQxJtnX';
const AUTH_URL = 'https://open.larksuite.com/open-apis/auth/v3/app_access_token/internal';

async function fetchNewToken(): Promise<string> {
    try {
      const response = await fetch(AUTH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
          app_id: APP_ID,
          app_secret: APP_SECRET,
        }),
        // Disable cache for token requests
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: LarkAuthResponse = await response.json();

      if (data.code !== 0) {
        throw new Error(`Failed to get access token: ${data.msg}`);
      }

      // Set expire time 5 minutes earlier than actual expiry
      tokenCache = {
        token: data.app_access_token,
        expireTime: Date.now() + (data.expire - 300) * 1000,
      };

      return data.app_access_token;
    } catch (error) {
      console.error('Error fetching Lark access token:', error);
      throw error;
    }
  }

export async function getLarkAccessToken(): Promise<string> {
    // If no token exists or token is expired/about to expire, fetch new one
    if (!tokenCache || Date.now() >= tokenCache.expireTime) {
      return fetchNewToken();
    }

    return tokenCache.token;
  }
