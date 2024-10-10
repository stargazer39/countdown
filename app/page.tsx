"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

function ClockUrlBuilder() {
  const router = useRouter();
  const [message, setMessage] = useState("Time left to end the presentation");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);

  const handleRedirect = () => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const encodedMessage = encodeURIComponent(message);
    const url = `/clock?message=${encodedMessage}&s=${totalSeconds}`;
    router.push(url);
  };

  const handleResetAndGo = () => {
    localStorage.removeItem("flipClockEndTime");
    handleRedirect();
  };

  const handleQuickSet = (hrs: number, mins: number) => {
    setHours(hrs);
    setMinutes(mins);
    setSeconds(0);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-300">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Clock URL Builder
        </h1>
        <div className="flex flex-col w-full space-y-6">
          <div>
            <label className="text-lg font-semibold text-gray-700">
              Message
            </label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="text-lg font-semibold text-gray-700">
                  Hours
                </label>
                <input
                  type="number"
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <label className="text-lg font-semibold text-gray-700">
                  Minutes
                </label>
                <input
                  type="number"
                  value={minutes}
                  onChange={(e) => setMinutes(Number(e.target.value))}
                  className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <label className="text-lg font-semibold text-gray-700">
                  Seconds
                </label>
                <input
                  type="number"
                  value={seconds}
                  onChange={(e) => setSeconds(Number(e.target.value))}
                  className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6 mt-4">
              <button
                onClick={() => handleQuickSet(0, 10)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                10 Minutes
              </button>
              <button
                onClick={() => handleQuickSet(0, 20)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                20 Minutes
              </button>
              <button
                onClick={() => handleQuickSet(0, 30)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                30 Minutes
              </button>
              <button
                onClick={() => handleQuickSet(1, 0)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                1 Hour
              </button>
              <button
                onClick={() => handleQuickSet(3, 0)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                3 Hours
              </button>
              <button
                onClick={() => handleQuickSet(6, 0)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                6 Hours
              </button>
            </div>
          </div>
          <button
            onClick={handleRedirect}
            className="w-full py-3 mt-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition ease-in-out duration-200"
          >
            Build and Go to URL
          </button>
          <button
            onClick={handleResetAndGo}
            className="w-full py-3 mt-4 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition ease-in-out duration-200"
          >
            Reset Current Clock and Go
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClockUrlBuilder;
