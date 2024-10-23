export type AuthStore = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;

  userId: string | null;
  setUserId: (userId: string) => void;
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
};
