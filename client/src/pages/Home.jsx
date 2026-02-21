import { useContext } from 'react'
import SideBar from '../components/SideBar'
import ChatContainer from '../components/ChatContainer'
import RightSliderBar from '../components/RightSliderBar'
import { ChatContext } from '../../context/ChatContext'

function Home() {
  const { selectedUser } = useContext(ChatContext)

  return (
    <div className="h-screen w-full flex justify-center items-center lg:px-10 lg:py-10 px-0 py-0 sm:px-10 sm:py-10">
      <div
        className={`h-full w-full max-w-[1500px]
        backdrop-blur-xl border-2 border-gray-600 rounded-2xl
        overflow-hidden
        grid grid-cols-1 grid-rows-[minmax(0,1fr)] relative
        ${selectedUser
          ? 'md:grid-cols-[1fr_1.5fr_1fr]'
          : 'md:grid-cols-2'}`}
      >
        <SideBar />
        <ChatContainer />
        <RightSliderBar />
      </div>
    </div>
  )
}

export default Home

