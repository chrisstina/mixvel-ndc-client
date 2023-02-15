const { DateTime } = require("luxon");

import {IMessageMapper} from "../../../interfaces/IMessageMapper";
import {Contract3D, SearchProps,} from "../../../core/request/parameters/Search";
import {PricingOption} from "../../../core/request/types";

import {Mixvel_AirShoppingRQ, OriginDestination, Pax, ProgramCriteria,} from "../messages/Mixvel_AirShoppingRQ";
import {toMixvel as toMixvelPTC} from "./dictionary/ptc";
import {MixvelCabin, toMixvel as toMixvelCabin} from "./dictionary/cabin";
import {toMixvel as toMixvelPricingOption} from "./dictionary/pricingoption";
import {Preflevel} from "../constants/preflevel";

export class SearchMessageMapper implements IMessageMapper {
  constructor(public readonly params: SearchProps) {}

  map(): Mixvel_AirShoppingRQ {
    const message = new Mixvel_AirShoppingRQ();

    // mind the order of fields!
    this.params.originDestinations.forEach((od) => {
      message.FlightRequest.FlightRequestOriginDestinationsCriteria.OriginDestCriteria.push(
        this.createOD(
          od.from,
          od.to,
          DateTime.fromJSDate(od.dateRangeStart).toISODate(),
          DateTime.fromJSDate(od.dateRangeEnd).toISODate(),
          toMixvelCabin(this.params.cabin)
        )
      );
    });
    this.params.travelers.forEach(({ id, ptc, age }) => {
      // @todo maybe autogenerate id?
      message.Paxs.Pax.push(new Pax(id, toMixvelPTC(ptc), age.toString()));
    });
    if (
      this.params.preferredCarriers &&
      this.params.preferredCarriers.length > 0
    ) {
      this.addCarrierCriteria(message, this.params.preferredCarriers);
    } else {
      // remove unused ref field
      message.FlightRequest.FlightRequestOriginDestinationsCriteria.OriginDestCriteria.forEach(
        (od) => delete od.CarrierPrefRefID
      );
    }
    if (this.params.onlyDirect) {
      this.addConnectionCriteria(message, 0);
    } else {
      // remove unused ref field
      message.FlightRequest.FlightRequestOriginDestinationsCriteria.OriginDestCriteria.forEach(
        (od) => delete od.ConnectionPrefRefID
      );
    }
    if (this.params.preferredRBD) {
      this.addFlightCriteria(message, {
        allowMixing: false,
        RBDCodes: this.params.preferredRBD,
      });
    }
    if (this.params.pricingOption) {
      this.addPricingCriteria(message, this.params.pricingOption);
    }
    if (this.params.contract3D) {
      this.addProgramCriteria(message, this.params.contract3D);
    }
    return message;
  }

  /**
   * @param {string} originCode
   * @param {string} destinationCode
   * @param {string} dateRangeStart ISO datetime 2021-11-25
   * @param {string} dateRangeEnd ISO datetime 2021-11-25
   * @param {MixvelCabin} cabinTypeCode
   * @return {OriginDestination}
   */
  private createOD(
    originCode: string,
    destinationCode: string,
    dateRangeStart: string,
    dateRangeEnd: string,
    cabinTypeCode: MixvelCabin
  ) {
    const OD = new OriginDestination();
    OD.OriginDepCriteria.DateRangeStart = dateRangeStart;
    OD.OriginDepCriteria.DateRangeEnd = dateRangeEnd;
    OD.OriginDepCriteria.IATA_LocationCode = originCode;
    OD.DestArrivalCriteria = { IATA_LocationCode: destinationCode };
    OD.CabinType = {
      CabinTypeCode: cabinTypeCode,
      PrefLevel: { PrefLevelCode: Preflevel.REQUIRED },
    };
    return OD;
  }

  private addCarrierCriteria(
    message: Mixvel_AirShoppingRQ,
    allowedCarrierCodes: string[]
  ) {
    const carrierPrefRefId = this.generateCarrierPrefId();
    if (message.ShoppingCriteria.length === 0) {
      message.ShoppingCriteria.push({ CarrierCriteria: [] });
    }
    message.ShoppingCriteria[0].CarrierCriteria = [
      {
        Carrier: allowedCarrierCodes.map((code) => {
          return { AirlineDesigCode: code };
        }),
        CarrierPrefID: carrierPrefRefId,
      },
    ];
    message.FlightRequest.FlightRequestOriginDestinationsCriteria.OriginDestCriteria.forEach(
      (od) => (od.CarrierPrefRefID = carrierPrefRefId)
    );
  }

  private addConnectionCriteria(
    message: Mixvel_AirShoppingRQ,
    maxConnections: number
  ) {
    const connectionId = this.generateConnectionId();
    if (message.ShoppingCriteria.length === 0) {
      message.ShoppingCriteria.push({ ConnectionCriteria: [] });
    }
    message.ShoppingCriteria[0].ConnectionCriteria = [
      {
        ConnectionPrefID: connectionId,
        MaximumConnectionQty: maxConnections,
      },
    ];
    message.FlightRequest.FlightRequestOriginDestinationsCriteria.OriginDestCriteria.forEach(
      (od) => (od.ConnectionPrefRefID = connectionId)
    );
  }

  private addFlightCriteria(
    message: Mixvel_AirShoppingRQ,
    rbdCriteria: { allowMixing: boolean; RBDCodes?: string[] }
  ) {
    if (message.ShoppingCriteria.length === 0) {
      message.ShoppingCriteria.push({ FlightCriteria: [] });
    }
    message.ShoppingCriteria[0].FlightCriteria = [
      {
        RBD: {
          MixRBDInd: rbdCriteria.allowMixing,
          RBD_Code: rbdCriteria.RBDCodes,
        },
      },
    ];
  }

  private addPricingCriteria(
    message: Mixvel_AirShoppingRQ,
    pricingOption: PricingOption
  ) {
    if (message.ShoppingCriteria.length === 0) {
      message.ShoppingCriteria.push({ PricingMethodCriteria: [] });
    }
    message.ShoppingCriteria[0].PricingMethodCriteria = [
      {
        BestPricingOptionText: toMixvelPricingOption(pricingOption),
      },
    ];
  }

  private addProgramCriteria(
    message: Mixvel_AirShoppingRQ,
    contract: Contract3D
  ) {
    if (message.ShoppingCriteria.length === 0) {
      message.ShoppingCriteria.push({ ProgramCriteria: [] });
    }
    const criterion: ProgramCriteria = {};
    if (contract.clientCode) {
      criterion.ProgramContract = [];
      criterion.ProgramContract.push({ ContractID: contract.clientCode });
    }
    if (contract.agencyCode) {
      criterion.ProgramAccount = [];
      criterion.ProgramAccount.push({ AccountID: contract.agencyCode }); // <- 3d.agencyCode
    }
    if (contract.contractType) {
      criterion.TypeCode = contract.contractType;
    }
    message.ShoppingCriteria[0].ProgramCriteria = [criterion];
  }

  private generateConnectionId(): string {
    return "Connection-1";
  }

  private generateCarrierPrefId(): string {
    return "Carrier-1";
  }
}
