type IMessage = {
  messageSenter: string;
  messageReciever: string;
  senderTime: string;
  recieverTime: string;
};

export const chatData: IMessage[] = [
  {
    messageSenter: 'i called you yesterday but you did not pick up, why?',
    messageReciever: 'sorry, i did not pick up, my battery was empty. hope you are okay',
    senderTime: '5:00pm',
    recieverTime: '5:10pm',
  },
];
