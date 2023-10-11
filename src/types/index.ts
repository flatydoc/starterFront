export interface IUser {
  id: number;
  name: string;
  emeil: string;
  isAdmin: boolean;
  isActivated: boolean;
  events: IEvent | null;
}

export interface ICategory {
  id: number;
  name: string;
}

export interface IEvent {
  id: number;
  title: string;
  text: string;
  place: string;
  price: number;
  posterUrl: string;
  photos: string[];
  users: IUser | null;
  category: ICategory | null;
  artists: IArtist | null;
}

export interface IArtist {
  id: number;
  name: string;
  surname: string;
  nickname: string;
  city: string;
  users: IUser | null;
  events: IEvent | null;
}

export interface IError {
  code: number;
  message: string;
}

export interface IErrorPageProps {
  error?: IError;
}
