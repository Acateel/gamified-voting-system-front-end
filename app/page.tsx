import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <Button size='lg' className="m-10">
      <Link href="/voting">
        Go to votings
      </Link>
    </Button>
  )
}
