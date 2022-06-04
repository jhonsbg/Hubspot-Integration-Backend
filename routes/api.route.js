const {Router} = require('express');

const { apiPost, apiGet, apiPatch, apiDelete } = require('../controllers/api.controller');

const router = Router();

router.post('/', apiPost);
router.get('/', apiGet);
router.delete('/', apiDelete);
router.patch('/', apiPatch);

module.exports = router;