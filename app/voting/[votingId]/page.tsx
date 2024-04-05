import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { votingApi } from '@/lib/votingApi'
import { Vote } from 'lucide-react'

export default async function VotingPage({
  params,
}: {
  params: { votingId: string }
}) {
  const votingId = +params.votingId
  const voting = (await votingApi.get(`/voting/${votingId}`)).data

  const getVoteCount = (voting: any) => {
    let count = 0

    for (let option of voting.options) {
      count += option.votes.length
    }

    return count
  }

  const renderOptions = (voting: any) => {
    let sum = 0
    for (let option of voting.options) {
      sum += option.count
    }

    return voting.options.map((option: any) => (
      <li key={option.id} className="flex flex-row items-center gap-5">
        <h2 className="w-[20rem]">{option.text}</h2>
        <Progress value={(100 * option.count) / sum} className="w-56" />
        <p>{option.count}</p>
      </li>
    ))
  }

  return (
    <div className="max-w-[988px] mx-auto flex-1 w-full flex flex-col items-center justify-center p-4 gap-10">
      <div className="border-b-2 w-full">
        <div className="flex flex-row justify-between items-center gap-5">
          <div className="flex flex-row justify-between items-center gap-5">
            <Vote className="text-sky-700" width={80} height={80} />
            <h1 className="text-sky-700 font-bold text-3xl">{voting.title}</h1>
          </div>
          <div className="text-xl font-bold w-40">
            Votes:{' '}
            <span className="text-green-500">{getVoteCount(voting)}</span>
          </div>
        </div>
        <p className="p-4">{voting.details}</p>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between w-full">
        <ul className="flex flex-col gap-4">{renderOptions(voting)}</ul>
        <ul className="flex flex-col gap-4 border-l-0 border-t-2 md:border-l-2 md:border-t-0 border-dashed p-5 text-right">
          <li>
            Purposefulness:{' '}
            <span className="text-sky-600">{voting.purposefulness_cof}%</span>
          </li>
          <li>
            Determination:{' '}
            <span className="text-sky-600">{voting.determination_cof}%</span>
          </li>
          <li>
            Analysis:{' '}
            <span className="text-sky-600">{voting.analysis_cof}%</span>
          </li>
          <li>
            Planning:{' '}
            <span className="text-sky-600">{voting.planning_cof}%</span>
          </li>
          <li>
            Activity:{' '}
            <span className="text-sky-600">{voting.activity_cof}%</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
