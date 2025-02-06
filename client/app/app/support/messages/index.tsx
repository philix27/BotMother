'use client'

export default function MessageChat() {
  return (
    <div className={`mt-4 px-4`}>
      <div className={`flex w-full items-center justify-between`}>
        <div className={`w-fit max-w-[70%] rounded bg-gray-800 px-2 pb-2`}>
          <div className={`flex items-center justify-center`}>
            <p className={``}>
              How are you doing and your family, hope everyone is fine? what about the food
            </p>
          </div>
          <div className={`flex items-end justify-end`}>
            <p>12 pm</p>
          </div>
        </div>
        <div />
      </div>
      <div className={`flex w-full  justify-between`}>
        <div />
        <div className={`mt-4 w-fit max-w-[70%] rounded bg-lime-500 px-2 pb-2`}>
          <div className={`flex items-center justify-center`}>
            <p className={``}>hope everyone is fine? what about the food</p>
          </div>
          <div className={`flex items-end justify-end`}>
            <p>12:05 pm</p>
          </div>
        </div>
      </div>
    </div>
  )
}
