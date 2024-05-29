export class PaginationMeta {
  constructor(
    public readonly count: number,
    public readonly next: boolean,
    public readonly prev: boolean,
    public readonly page: number,
    public readonly perPage: number,
  ) {}
}
