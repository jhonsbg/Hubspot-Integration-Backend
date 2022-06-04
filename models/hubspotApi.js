const hubspot = require('@hubspot/api-client');

class tableManagement {
    constructor() {}

    async showContacts(){
        const hubspotClient = new hubspot.Client({"apiKey":process.env.APIKEY_HUBSPOT});
    
        const tableIdOrName = process.env.DATABASE_TABLE;
        const sort = undefined;
        const after = undefined;
        const limit = undefined;
        const properties = undefined;
    
        try {

            const apiResponse = await hubspotClient.cms.hubdb.rowsApi.readDraftTableRows(tableIdOrName, sort, after, limit, properties);
            // console.log(JSON.stringify(apiResponse.body.results, null, 2));
            console.log('Show Table');

            var flag = 0;
            var response = [];

            apiResponse.body.results.forEach(contact => {
                response[flag] = {
                    'id': contact.id,
                    'name': contact.values.name,
                    'last_name': contact.values.last_name,
                    'document_id': contact.values.document_id
                }
                flag++;
            });

        } catch (e) {
        e.message === 'HTTP request failed'
            ? console.error(JSON.stringify(e.response, null, 2))
            : console.error(e)
        }

        return response;
    }

    async createContacts(name, last_name, document_id){
        const hubspotClient = new hubspot.Client({"apiKey":process.env.APIKEY_HUBSPOT});

        const values = {
        "name": name,
        "last_name": last_name,
        "document_id": document_id,
        };
        const HubDbTableRowV3Request = { path: null, name: null, childTableId: 0, values };
        const tableIdOrName = process.env.DATABASE_TABLE;

        try {
        const apiResponse = await hubspotClient.cms.hubdb.rowsApi.createTableRow(tableIdOrName, HubDbTableRowV3Request);
        // console.log(JSON.stringify(apiResponse.body, null, 2));
        console.log('User Created');
        } catch (e) {
        e.message === 'HTTP request failed'
            ? console.error(JSON.stringify(e.response, null, 2))
            : console.error(e)
        }
    }

    async deleteContacts(idRow){
        const hubspotClient = new hubspot.Client({"apiKey":process.env.APIKEY_HUBSPOT});

        const tableIdOrName = process.env.DATABASE_TABLE;
        const rowId = idRow;

        try {
            const apiResponse = await hubspotClient.cms.hubdb.rowsApi.purgeDraftTableRow(tableIdOrName, rowId);
            // console.log(JSON.stringify(apiResponse.body, null, 2));
            console.log('User Deleted');
        } catch (e) {
            e.message === 'HTTP request failed'
            ? console.error(JSON.stringify(e.response, null, 2))
            : console.error(e)
        }
    }

    async updateContacts(idRow, name, last_name, document_id){
        const hubspotClient = new hubspot.Client({"apiKey":process.env.APIKEY_HUBSPOT});

        const values = {
            "name": name,
            "last_name": last_name,
            "document_id": document_id,
        };
        const HubDbTableRowV3Request = { path: null, name: null, childTableId: 0, values };
        const tableIdOrName = process.env.DATABASE_TABLE;
        const rowId = idRow;

        try {
        const apiResponse = await hubspotClient.cms.hubdb.rowsApi.updateDraftTableRow(tableIdOrName, rowId, HubDbTableRowV3Request);
        // console.log(JSON.stringify(apiResponse.body, null, 2));
        console.log('Updated User');
        } catch (e) {
        e.message === 'HTTP request failed'
            ? console.error(JSON.stringify(e.response, null, 2))
            : console.error(e)
        }
    }
}

module.exports = {
    tableManagement
}