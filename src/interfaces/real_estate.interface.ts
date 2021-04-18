export interface RealEstateInterface {
  fetchData(): Promise<object[]>;
  getError(): string;
}
