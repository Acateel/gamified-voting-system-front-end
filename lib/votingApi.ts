import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const votingApiUrl = process.env.VOTING_API_URL

export const votingApi = axios.create({ baseURL: votingApiUrl })
