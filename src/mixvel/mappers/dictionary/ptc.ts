import {PaxCategory} from "../../../request-params/dictionary/types";
import {PTC} from "../../constants/ptc";

export function toMixvel(paxCategory: PaxCategory): PTC {
    return PTC[paxCategory]
}

// export function fromMixvel(docType: MixvelDocumentType): Types;