const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
  // res.send('All jobs')
}

const getJob = async (req, res) => {
  res.send('Get Single job')
}

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId

  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })

  //res.json(req.body)
}
const updateJob = async (req, res) => {
  res.send('update job ')
}
const deleteJob = async (req, res) => {
  res.send('Detete job')
}
module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
}
