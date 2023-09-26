// ... Category: Proxy Pattern
// Purpose:
// Define Objects

// External Database: for example, a server that retrieves data via API
function DataManagementSystem() {
    this.getData = function (recordID) {
        console.log(`Reading from the database the value of the record with RecordID: '${recordID}'`);
        switch (recordID) {
            case "0001":
                return "Record 0001";
            case "0002":
                return "Record 0002";
            case "0003":
                return "Record 0003";
            default:
                return "No record found!!!";
        }
    }
}

// const dbms = new DataManagementSystem();

function DataManagementSystemProxy() {      // Define the Proxy
    this.DBMS = new DataManagementSystem();
    this.cache = {};

    this.getData = function (recordID) {
        if (this.cache[recordID] == null) {
            console.log(`Saving to cache the value of the record with RecordID: '${recordID}'`);
            this.cache[recordID] = this.DBMS.getData(recordID);
        }

        return this.cache[recordID];
    }
}

const dbmsProxy = new DataManagementSystemProxy();
console.log(`Returned Data (RecordID: 0001): '${dbmsProxy.getData("0001")}'`);
console.log(`Returned Data (RecordID: 0002): '${dbmsProxy.getData("0002")}'`);
console.log(`Returned Data (RecordID: 0003): '${dbmsProxy.getData("0003")}'`);
console.log(`Returned Data (RecordID: 0004): '${dbmsProxy.getData("0004")}'`);
console.log(`Returned Data (RecordID: 0004): '${dbmsProxy.getData("0004")}'`);
console.log(`Returned Data (RecordID: 0001): '${dbmsProxy.getData("0001")}'`);
console.log(`Returned Data (RecordID: 0002): '${dbmsProxy.getData("0002")}'`);

