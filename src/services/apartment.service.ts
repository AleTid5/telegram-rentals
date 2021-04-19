import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { ApartmentInterface } from "../interfaces/apartment.interface";
import { Apartment, ApartmentDocument } from "../schemas/appartment.schema";

@Injectable()
export class ApartmentService {
  constructor(
    @InjectModel(Apartment.name)
    private apartmentModel: Model<ApartmentDocument>,
  ) {}

  async findAll(realEstate: string): Promise<ApartmentInterface[]> {
    return this.apartmentModel.find({ realEstate }, { id: 1 }).exec();
  }

  save = (apartments: ApartmentInterface[]): void => {
    this.apartmentModel.insertMany(apartments);
  };

  remove = (id: string) => {
    this.apartmentModel.deleteOne({ id }).exec();
  };
}
