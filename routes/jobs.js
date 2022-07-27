const { getAlljobs,
    getAjob,
    updateJob,
    deleteJob,
    createJob}=require('../controllers/jobs')
const express = require('express');
const router= express.Router();
router.route('/').get(getAlljobs).post(createJob)
router.route('/:id').get(getAjob).patch(updateJob).delete(deleteJob)

module.exports = router