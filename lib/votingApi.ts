import axios from 'axios'

const votingApiUrl = process.env.NEXT_PUBLIC_VOTING_API_URL

export const votingApi = axios.create({ baseURL: votingApiUrl })
