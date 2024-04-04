import { votingApi } from "@/lib/votingApi"

export default async function VotingPage({
  params,
}: {
  params: { votingId: string }
}) {
  const votingId = +params.votingId
  const voting = (await votingApi.get(`/voting/${votingId}`)).data

  return <div>{JSON.stringify(voting)}</div>
}
