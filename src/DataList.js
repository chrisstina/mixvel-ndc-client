/*
 * Copyright (c) 2021
 */

const assert = require('assert')

class DataList {
    constructor(entityName, items) {
        try {
            this.list = items[0][`${entityName}List`][0][entityName]
            assert(this.list, `${entityName} is not present in the DataLists`)
            this.entityName = entityName
        } catch (e) {
            console.error(`Failed to find ${entityName} DataList: ${e.stack}`)
        }
    }

    findByReference(entityRef) {
        return this.list.find(entity =>  entity[`${this.entityName}ID`][0] === entityRef)
    }
}

module.exports = DataList