export type User = {
  _id: string;
  name: string;
  email: string;
};

export type RandomUser = {
  name: string;
  email: string;
  picture: string;
};

export type RandomUserApiResult = {
  email: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  picture: {
    large: string;
    medium: string;
    small: string;
  };
};
