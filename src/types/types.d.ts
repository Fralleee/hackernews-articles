type ListResponse<T> = {
  hits: T[];
  totalHits: number;
  page: number;
  totalPages: number;
};

type Article = {
  objectID: number;
  title: string;
  text?: string;
  url: string;
  author: string;
  points: number;
  num_comments: number;
  created_at: date;
  children?: Article[];
};

type Author = {
  id: number;
  username: string;
  created_at: date;
  karma: number;
  about: string;
};

declare module '@dh-react-hooks/use-timeago' {
  type Options = {
    locale?: string;
    localeRegister?: (number: number, index: number, totalSecoends?: number) => string[];
    interval?: number;
  };
  type TimeAgo = string;

  const useTimeAgo: (dateTime: dateTime, options?: Options) => TimeAgo;
  export default useTimeAgo;
}
