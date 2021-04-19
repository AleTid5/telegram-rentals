import { Injectable } from "@nestjs/common";
import { ApartmentInterface } from "../interfaces/apartment.interface";
import { Telegram } from "telegraf";

@Injectable()
export class NotifierService {
  private static TELEGRAM_BOT = null;

  constructor() {
    if (!NotifierService.TELEGRAM_BOT) {
      NotifierService.TELEGRAM_BOT = new Telegram(
        "1655656803:AAEOaPWgti-eqK-pyFGLyqqG1H_cGHlSI0A",
      );
    }
  }

  notifyError(realState: string, error: string): void {
    const message = `Ha ocurrido un error en ${realState}. El error es: ${error}`;

    NotifierService.TELEGRAM_BOT.sendMessage("@ale_rentals", message);
  }

  notifyNewApartment(apartment: ApartmentInterface): void {
    const message = `${apartment.realEstate} | $${apartment.price} | ${apartment.link}`;

    NotifierService.TELEGRAM_BOT.sendMessage("@ale_rentals", message);
  }
}
