
import cryptyo from 'node:crypto'

const fixedIv = cryptyo.randomBytes(12)

const key = process.env.ENCRYPTION_KEY