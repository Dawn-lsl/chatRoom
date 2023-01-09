const validate = require('../middleware/validate')
const {body} = require('express-validator');
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
