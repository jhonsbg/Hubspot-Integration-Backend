const { response } = require('express');

const { tableManagement } = require('../models/hubspotApi');


const apiPost = (req, res=response) => {
    const name = req.body.name;
    const last_name = req.body.last_name;
    const document_id = req.body.document_id;

    const table = new tableManagement();
    
    table.createContacts(name, last_name, document_id);
}

const apiGet = async (req, res=response) => {
    const table = new tableManagement();
    
    var responseo = await table.showContacts();
    
    res.send(responseo);
}

const apiDelete = (req, res=response) => {
    const idRow = req.body.idRow;
    
    const table = new tableManagement();
    
    table.deleteContacts(idRow);
}

const apiPatch = (req, res=response) => {
    const idRow = req.body.idRow;
    const name = req.body.name;
    const last_name = req.body.last_name;
    const document_id = req.body.document_id;

    const table = new tableManagement();

    table.updateContacts(idRow, name, last_name, document_id);
}

module.exports = {
    apiPost,
    apiGet,
    apiDelete,
    apiPatch
}