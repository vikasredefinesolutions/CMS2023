export interface _GET {
  url: string;
  method: 'GET';
}

export interface _POST {
  url: string;
  method: 'POST';
  data?: any;
}
