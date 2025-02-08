import { IEmployees } from 'lib/zustand/employee'

export const mails: {
  id: string
  name: string
  email: string
  subject: string
  text: string
  date: string
  read: boolean
  labels: string[]
  img: string
  color: string
  key: IEmployees
}[] = [
  {
    id: '6c84fb90-12c4-11e1-840d-7b25c5ee775a',
    name: 'Buddy',
    email: 'williamsmith@example.com',
    subject: 'Meeting Tomorrow',
    text: 'Buddy manages your crypto wallet and help you make on chain transactions',
    date: '2023-10-22T09:00:00',
    read: true,
    labels: ['meeting', 'work', 'important'],
    img: '/employees/buddy.webp',
    color: 'bg-blue-500',
    key: 'Crypto',
  },
  {
    id: '110e8400-e29b-11d4-a716-446655440000',
    name: 'Alice Smith',
    email: 'alicesmith@example.com',
    subject: 'Re: Project Update',
    text: "Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive. The team has done a fantastic job, and I appreciate the hard work everyone has put in.\n\nI have a few minor suggestions that I'll include in the attached document.\n\nLet's discuss these during our next meeting. Keep up the excellent work!\n\nBest regards, Alice",
    date: '2023-10-22T10:30:00',
    read: true,
    labels: ['work', 'important'],
    img: '/employees/cassie.webp',
    color: 'bg-blue-700',
    key: 'Finance',
  },
  {
    id: '3e7c3f6d-bdf5-46ae-8d90-171300f27ae2',
    name: 'Bob Johnson',
    email: 'bobjohnson@example.com',
    subject: 'Weekend Plans',
    text: "Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It's been a while since we had some outdoor fun.\n\nIf you're interested, let me know, and we can plan the details. It'll be a great way to unwind and enjoy nature.\n\nLooking forward to your response!\n\nBest, Bob",
    date: '2023-04-10T11:45:00',
    read: true,
    labels: ['personal'],
    img: '/employees/gigiGreen.webp',
    color: 'bg-green-600',
    key: 'TweetGenerator',
  },
  {
    id: '61c35085-72d7-42b4-8d62-738f700d4b92',
    name: 'Emily Davis',
    email: 'emilydavis@example.com',
    subject: 'Re: Question about Budget',
    text: "I have a question about the budget for the upcoming project. It seems like there's a discrepancy in the allocation of resources.\n\nI've reviewed the budget report and identified a few areas where we might be able to optimize our spending without compromising the project's quality.\n\nI've attached a detailed analysis for your reference. Let's discuss this further in our next meeting.\n\nThanks, Emily",
    date: '2023-03-25T13:15:00',
    read: false,
    labels: ['work', 'budget'],
    img: '/employees/milliPink.webp',
    color: 'bg-pink-600',
    key: 'DailyMotivation',
  },
  {
    id: '8f7b5db9-d935-4e42-8e05-1f1d0a3dfb97',
    name: 'Michael Wilson',
    email: 'michaelwilson@example.com',
    subject: 'Important Announcement',
    text: "I have an important announcement to make during our team meeting. It pertains to a strategic shift in our approach to the upcoming product launch. We've received valuable feedback from our beta testers, and I believe it's time to make some adjustments to better meet our customers' needs.\n\nThis change is crucial to our success, and I look forward to discussing it with the team. Please be prepared to share your insights during the meeting.\n\nRegards, Michael",
    date: '2023-03-10T15:00:00',
    read: false,
    labels: ['meeting', 'work', 'important'],
    img: '/employees/penTeal.webp',
    color: 'bg-teal-600',
    key: 'EmailMarketing',
  },
  {
    id: '1f0f2c02-e299-40de-9b1d-86ef9e42126b',
    name: 'Sarah Brown',
    email: 'sarahbrown@example.com',
    subject: 'Re: Feedback on Proposal',
    text: "Thank you for your feedback on the proposal. It looks great! I'm pleased to hear that you found it promising. The team worked diligently to address all the key points you raised, and I believe we now have a strong foundation for the project.\n\nI've attached the revised proposal for your review.\n\nPlease let me know if you have any further comments or suggestions. Looking forward to your response.\n\nBest regards, Sarah",
    date: '2023-02-15T16:30:00',
    read: true,
    labels: ['work'],
    img: '/employees/soshiePurple.webp',
    color: 'bg-purple-500',
    key: 'Instagram',
  },
]
