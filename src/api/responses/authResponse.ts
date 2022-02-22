export type AuthResponse = {
  status: string;
  user: {
    id: string;
    email: string;
    timejoined: number;
  };
};

export type AuthSignOutResponse = {
  status: string;
};
