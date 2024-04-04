import { votingApi } from '@/lib/votingApi'
import Link from 'next/link'

export default async function VotingList() {
  const votingsRaw = (await votingApi.get('/voting')).data

  const renderList = (votings: any[]) => {
    return votings.map((voting) => (
      <li key={voting.id}>
        <Link href={`/voting/${voting.id}`}>
          <h1 className="font-bold">{voting.title}</h1>
          <p>{voting.details}</p>
        </Link>
      </li>
    ))
  }

  return (
    <div>
      <ul>{renderList(votingsRaw)}</ul>
    </div>
  )
}
