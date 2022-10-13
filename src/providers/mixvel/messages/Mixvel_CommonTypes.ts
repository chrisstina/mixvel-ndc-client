export class OtherPaymentMethod {
    constructor() {
        return {
            'OtherPaymentMethod': null
        }
    }
}

export class DirectBill {
    constructor(billInfo: string) {
        return {
            'DirectBill': {
                'BillInfo': billInfo
            }
        }
    }
}

export class AccountableDoc {
    constructor(docType: string, docNumber: string = '') {
        return {
            'AccountableDoc': {
                'DocType': docType,
                'DocNumber': docNumber
            }
        }
    }
}