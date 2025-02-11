import { IEmployees } from 'lib/zustand/employee'

export const employeeData: {
  name: string
  text: string
  read: boolean
  img: string
  color: string
  emKey: IEmployees
}[] = [
  {
    name: 'Crypto Buddy',
    text: 'Buddy manages your crypto wallet and help you make on chain transactions',
    read: true,
    img: '/employees/buddy.webp',
    color: 'bg-blue-500',
    emKey: 'Crypto',
  },
  {
    name: 'Finance',
    text: 'Lock your savings and earn from interest on them.',
    read: true,
    img: '/employees/cassie.webp',
    color: 'bg-blue-700',
    emKey: 'Finance',
  },
  {
    name: 'Coin Watcher',
    text: 'Help you manage your instagram account',
    read: true,
    img: '/employees/dexter.avif',
    color: 'bg-purple-500',
    emKey: 'CoinWatcher',
  },
  {
    name: 'Tweet Generator',
    text: 'Generate tweets and post tweets based on your brand',
    read: true,
    img: '/employees/gigiGreen.webp',
    color: 'bg-green-600',
    emKey: 'TweetGenerator',
  },
  {
    name: 'Daily Motivation',
    text: 'Get your daily inspiration to get going',
    read: false,
    img: '/employees/emmieYellow.webp',
    color: 'bg-pink-600',
    emKey: 'DailyMotivation',
  },
  {
    name: 'Email Generator',
    text: 'Professional Email Generator',
    read: false,
    img: '/employees/penTeal.webp',
    color: 'bg-pink-600',
    emKey: 'EmailMarketing',
  },
  {
    name: 'Instagram',
    text: 'Help you manage your instagram account',
    read: true,
    img: '/employees/soshiePurple.webp',
    color: 'bg-purple-500',
    emKey: 'Instagram',
  },
  {
    name: 'Image Generator',
    text: 'Generate images and deploy them as NFTS or post on your social media',
    read: true,
    img: '/employees/commet.webp',
    color: 'bg-purple-500',
    emKey: 'ImageGenerator',
  },
  {
    name: 'Lemonade Event Planner',
    text: 'Create and manage events on Lemonade',
    read: false,
    img: '/employees/uizzy.webp',
    color: 'bg-purple-500',
    emKey: 'LemonadeEventPlanner',
  },
  {
    name: 'Web3 Job Scout',
    text: 'Get notified early on your web3 related jobs',
    read: true,
    img: '/employees/milliPink.webp',
    color: 'bg-purple-500',
    emKey: 'JobScout',
  },
]
