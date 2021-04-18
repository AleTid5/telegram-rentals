import { Test, TestingModule } from "@nestjs/testing";
import { ScrapperService } from "../src/services/scrapper.service";

describe("ScrapperService", () => {
  let service: ScrapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScrapperService],
    }).compile();

    service = module.get<ScrapperService>(ScrapperService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
