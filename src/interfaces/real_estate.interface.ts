export interface RealEstateServiceInterface {
  fetchData(): Promise<object[]>;
  getError(): string;
}

export interface RealEstateInterface {
  id: number;
  link: string;
  price: number;
}
