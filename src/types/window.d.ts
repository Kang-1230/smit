// types/window.d.ts

// 카카오 API 응답 타입들
interface KakaoUserProperties {
  nickname: string;
  profile_image: string;
  thumbnail_image?: string;
}

interface KakaoUserProfile {
  nickname: string;
  thumbnail_image_url?: string;
  profile_image_url?: string;
}

interface KakaoAccount {
  email: string;
  gender?: "male" | "female";
  profile?: KakaoUserProfile;
}

interface KakaoAPIResponse {
  data: {
    id: number;
    connected_at?: string;
    properties: KakaoUserProperties;
    kakao_account: KakaoAccount;
  };
}

// 카카오 로그인 응답 타입
interface KakaoAuthSuccess {
  status: "connected";
  token: string;
  user: {
    id: number;
    properties: KakaoUserProperties;
    kakao_account: KakaoAccount;
  };
}

interface KakaoAuthError {
  error: string;
  error_description: string;
}

// API 요청 파라미터 타입
interface KakaoAPIRequestParams {
  url: string;
  data?: Record<string, string | number | boolean>;
  headers?: Record<string, string>;
}

// Auth 옵션 타입
interface KakaoAuthOptions {
  success?: (response: KakaoAuthSuccess) => void;
  fail?: (error: KakaoAuthError) => void;
  always?: () => void;
  scope?: string;
}

// 메인 Kakao API 인터페이스
interface KakaoAPI {
  init(apiKey: string): boolean;
  isInitialized(): boolean;
  cleanup(): void;

  API: {
    request<T extends KakaoAPIResponse>(
      params: KakaoAPIRequestParams,
    ): Promise<T>;
  };

  Auth: {
    login(options?: KakaoAuthOptions): void;
    logout(): void;
    getAccessToken(): string | null;
    setAccessToken(token: string): void;
    getStatusInfo(): Promise<{
      status: "connected" | "not_connected";
      user?: KakaoAPIResponse["data"];
    }>;
  };
}

declare global {
  interface Window {
    Kakao: KakaoAPI;
  }
}

export type {
  KakaoAPI,
  KakaoAPIResponse,
  KakaoAuthSuccess,
  KakaoAuthError,
  KakaoUserProperties,
  KakaoAccount,
};
