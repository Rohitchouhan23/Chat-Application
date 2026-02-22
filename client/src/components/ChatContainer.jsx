import React, { useRef, useEffect, useContext, useState } from "react";
import logo from "../assets/favicon.png";
import avatar from "../assets/avatar_icon.png";
import arrow_icon from '../assets/arrow_icon.png'
import { formateMessageTime } from "../lib/utils";
import sendbutton from "../assets/send_button.svg";
import galleryicon from "../assets/gallery_icon.svg";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

function ChatContainer() {
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } =
    useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);

  const scrollEnd = useRef();
  const [input, setInput] = useState("");

  // SEND TEXT
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    await sendMessage({ text: input.trim() });
    setInput("");
  };

  // SEND FILE
  const handleSendFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
      toast.error("Select an image or PDF file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({
        fileUrl: reader.result,
        fileType: file.type.startsWith("image/") ? "image" : "pdf",
      });
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  // LOAD MESSAGES WHEN USER CHANGES
  useEffect(() => {
    if (selectedUser) getMessages(selectedUser._id);
  }, [selectedUser]);

  // AUTO SCROLL
  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return selectedUser ? (
    <div className="flex flex-col h-full">
      {/* HEADER */}
      <div className="flex items-center gap-3 py-3 px-4 border-b border-stone-500 flex-shrink-0">
        <img
          src={selectedUser.profilePic || avatar}
          alt=""
          className="w-8 rounded-full"
        />
        <p className="flex-1 text-lg text-white flex items-center gap-2">
          {selectedUser.fullName}
          {onlineUsers.includes(selectedUser._id) && (
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
          )}
        </p>
        <img
          onClick={() => setSelectedUser(null)}
          src={arrow_icon}
          alt=""
          className="md:hidden max-w-7 cursor-pointer"
        />
      </div>

      {/* MESSAGES - SCROLLABLE */}
       <div className="flex-1 min-h-0 overflow-y-auto
      p-3 flex flex-col gap-2
      scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
         {messages.map((msg, index) => {
          const isMe = msg.senderId === authUser._id;
          return (
            <div
              key={index}
              className={`flex items-end gap-2 ${
                isMe ? "justify-end" : "justify-start"
              }`}
            >
              {/* IMAGE */}
              {msg.fileType === "image" && (
                <img
                  src={msg.fileUrl}
                  alt=""
                  className={`max-w-[230px] border border-gray-700 rounded-lg mb-2 ${
                    isMe ? "rounded-br-none" : "rounded-bl-none"
                  }`}
                />
              )}
              {/* PDF */}
              {msg.fileType === "pdf" && (
                <a
                  href={msg.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`text-blue-400 underline mb-2 bg-black/20 px-3 py-2 rounded-lg ${
                    isMe ? "rounded-br-none" : "rounded-bl-none"
                  }`}
                >
                  📄 View PDF
                </a>
              )}
              {/* TEXT */}
              {!msg.fileUrl && msg.text && (
                <p
                  className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-2 break-all bg-violet-500/30 text-white ${
                    isMe ? "rounded-br-none" : "rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </p>
              )}

              {/* AVATAR + TIME */}
              <div className="text-center text-xs">
                <img
                  src={
                    isMe
                      ? authUser.profilePic || avatar
                      : selectedUser.profilePic || avatar
                  }
                  alt=""
                  className="w-7 rounded-full"
                />
                <p className="text-gray-500">
                  {formateMessageTime(msg.createdAt)}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={scrollEnd}></div>
      </div>

      {/* INPUT */}
      <div className="flex-shrink-0 p-3 bg-gray-900/20">
        <div className="flex items-center bg-gray-100/20 px-4 rounded-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage(e)}
            placeholder="Send a message"
            className="flex-1 text-sm p-3 bg-transparent outline-none text-white placeholder-gray-300"
          />
          <input
            onChange={handleSendFile}
            type="file"
            id="file"
            accept="image/*,application/pdf"
            hidden
          />
          <label htmlFor="file">
            <img src={galleryicon} alt="" className="w-5 mr-3 cursor-pointer" />
          </label>
          <img
            onClick={handleSendMessage}
            src={sendbutton}
            alt="send"
            className="w-5 cursor-pointer"
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden">
      <img src={logo} alt="" className="max-w-16" />
      <p className="text-lg font-medium text-white">Chat anytime, anywhere</p>
    </div>
  );
}

export default ChatContainer;