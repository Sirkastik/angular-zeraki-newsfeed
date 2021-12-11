export interface RandomUser {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: Object;
  email: string;
  login: Object;
  dob: Object;
  registered: Object;
  phone: string;
  cell: string;
  id: Object;
  picture: {
    thumbnail: string;
    large: string;
    medium: string;
  };
  nat: string;
}