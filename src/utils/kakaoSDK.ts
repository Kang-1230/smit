// utils/kakaoSDK.ts
import type { KakaoAPI, KakaoAPIResponse } from "@/types/window";

declare global {
  interface Window {
    Kakao: KakaoAPI;
  }
}

class KakaoSDK {
  private static instance: KakaoSDK;
  private initialized: boolean = false;

  private constructor() {}

  static getInstance(): KakaoSDK {
    if (!KakaoSDK.instance) {
      KakaoSDK.instance = new KakaoSDK();
    }
    return KakaoSDK.instance;
  }

  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    return new Promise<void>((resolve, reject) => {
      if (window.Kakao) {
        if (!window.Kakao.isInitialized()) {
          const apiKey = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;

          if (!apiKey) {
            reject(new Error("Kakao API key is not defined"));
            return;
          }

          window.Kakao.init(apiKey);
        }
        this.initialized = true;
        resolve();
      } else {
        const script = document.createElement("script");
        script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js";
        script.integrity =
          "sha384-6MFdIr0zOira1CHQkedUqXVql0YtcZA1P0nbPrQYJXVJZUkTk/oX4U9GhUIs3/z8";
        script.crossOrigin = "anonymous";

        script.onload = () => {
          const apiKey = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;

          if (!apiKey) {
            reject(new Error("Kakao API key is not defined"));
            return;
          }

          if (!window.Kakao.isInitialized()) {
            window.Kakao.init(apiKey);
          }
          this.initialized = true;
          resolve();
        };

        script.onerror = () => {
          reject(new Error("Failed to load Kakao SDK"));
        };

        document.body.appendChild(script);
      }
    });
  }

  async loadSDK(): Promise<void> {
    if (!this.initialized) {
      await this.initialize();
    }
  }

  async getUserInfo(): Promise<KakaoAPIResponse["data"]> {
    const response = await window.Kakao.API.request<KakaoAPIResponse>({
      url: "/v2/user/me",
    });
    return response.data;
  }
}

export const kakaoSDK = KakaoSDK.getInstance();
