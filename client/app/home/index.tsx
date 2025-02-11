import { Body } from './Hero'
import { AppHeader } from './Header'
import { Footer } from './Footer'

export default function Home() {
  return (
    <div className="flex h-screen w-screen flex-col justify-between bg-background">
      <AppHeader />
      <Body />
      <Footer />
    </div>
  )
}
