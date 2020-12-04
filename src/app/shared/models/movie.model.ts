export class Movie {
  constructor(
    public poster: string,
    public title: string,
    public type: string,
    public year: string,
    public id: string
  ) {}
}

export class MovieFull {
  constructor(
    public poster: string,
    public title: string,
    public runtime: string,
    public genre: string,
    public year: string,
    public type: string,
    public description: string
  ) {}
}