import { IDataList } from "../../interfaces/IDataList";
import { IResponseMapper } from "../../interfaces/IResponseMapper";
import { IResponseMessage } from "../../interfaces/IResponseMessage";
import { IResponseError } from "../../interfaces/IResponseError";
import { IConversionStrategy } from "../../services/conversion/IConversionSrategy";
import { AbstractResponseManager } from "../../core/response/AbstractResponseManager";
import ResponseParsingError from "../../core/errors/ResponseParsingError";
import { SirenaDataList } from "./SirenaDataList";
import { allowedDataLists } from "./config/allowedDatalists";

type SirenaCompleteResponse = Record<
  string,
  Record<
    "$" | `Success` | `Errors` | `Warnings` | `Document` | `Response` | string,
    Record<string, never>[] | any[]
  >
>;

class SirenaResponseMapper implements IResponseMapper {
  private static toError(errorNode: {
    _?: string;
    $?: Record<string, string>;
  }): SirenaResponseError {
    const errorText = errorNode._ || errorNode.$?.ShortText;
    return new SirenaResponseError({
      DescText: errorText,
      ErrorType: errorNode.$?.Type,
      Code: errorNode.$?.Code,
    });
  }

  public map(
    completeResponseObject: Partial<SirenaCompleteResponse>
  ): SirenaResponseError | SirenaResponseMessage {
    if (completeResponseObject == undefined) {
      throw new ResponseParsingError("Could not find Body node");
    }

    const rootNodeName = Object.keys(completeResponseObject)[0];
    if (!rootNodeName || !completeResponseObject[rootNodeName]) {
      throw new ResponseParsingError("Could not find root node");
    }

    // Business logic error
    const content = completeResponseObject[rootNodeName];
    if (content !== undefined) {
      const errors = content["Errors"];
      if (errors && errors.length > 0) {
        return SirenaResponseMapper.toError(errors[0]["Error"][0]);
      }
    }
    return completeResponseObject;
  }
}

export class SirenaResponseManager extends AbstractResponseManager {
  constructor(public conversionStrategy: IConversionStrategy) {
    super(conversionStrategy, new SirenaResponseMapper(), allowedDataLists);
  }

  /**
   * @todo currently the response structure depends on a conversion strategy, which is not ok
   * @param rawXML
   */
  async getResponse(rawXML: string): Promise<SirenaResponseMessage> {
    return this.convert(rawXML).then((responseObject) => {
      if (responseObject === null) {
        return Promise.reject(
          new ResponseParsingError("Response parsed to an empty object")
        );
      }
      return this.mapper.map(responseObject);
    });
  }

  createDataList(
    title: string,
    source: Record<string, unknown>[],
    entityName?: string
  ): IDataList {
    return SirenaDataList.create(title, source, entityName);
  }
}

export class SirenaResponseError implements IResponseError {
  code: string;
  text: string;

  constructor(data: { ErrorType?: string; Code?: string; DescText?: string }) {
    this.code = data.Code || "000";
    this.text = data.DescText || "";
  }
}

export class SirenaResponseMessage implements IResponseMessage {
  constructor(data: SirenaCompleteResponse) {
    Object.assign(this, data);
  }
}
