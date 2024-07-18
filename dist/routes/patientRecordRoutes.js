"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const patientRecordController_1 = require("../controllers/patientRecordController");
const router = (0, express_1.Router)();
router.post('/patient-records', patientRecordController_1.createPatientRecord);
router.get('/patient-records', patientRecordController_1.getPatientRecords);
router.get('/patient-records/:id', patientRecordController_1.getPatientRecord);
router.patch('/patient-records/:id', patientRecordController_1.updatePatientRecord);
router.delete('/patient-records/:id', patientRecordController_1.deletePatientRecord);
exports.default = router;
