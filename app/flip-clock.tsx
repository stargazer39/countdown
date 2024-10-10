"use client";

import React, { useEffect, useState } from "react";
import "./flip-clock.css"; // Custom CSS for the flip animation

function FlipClock({
  initialTime,
  controls = true,
  onEnd,
}: {
  readonly initialTime: number;
  readonly controls: boolean;
  readonly onEnd?: () => void
}) {
  const [time, setTime] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [endTime, setEndTime] = useState(() => {
    const storedEndTime = localStorage.getItem("flipClockEndTime");
    return storedEndTime
      ? parseInt(storedEndTime)
      : Date.now() + initialTime * 1000;
  });
  const [isPaused, setIsPaused] = useState(false);
  const [pauseTime, setPauseTime] = useState<number | null>(null);
  const [animationId, setAnimationId] = useState<number | null>(null);

  useEffect(() => {
    const countdown = () => {
      if (isPaused) return;

      const currentTime = Date.now();
      const remainingTime = Math.max(
        0,
        Math.floor((endTime - currentTime) / 1000)
      );

      if (remainingTime <= 0) {
        // Timer ends
        setTime({ hours: "00", minutes: "00", seconds: "00" });
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
        onEnd?.()
        localStorage.removeItem("flipClockEndTime");
      } else {
        updateTime(remainingTime);
        const newAnimationId = requestAnimationFrame(countdown);
        setAnimationId(newAnimationId);
      }
    };

    if (!isPaused) {
      const newAnimationId = requestAnimationFrame(countdown);
      setAnimationId(newAnimationId);
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [endTime, isPaused]);

  useEffect(() => {
    localStorage.setItem("flipClockEndTime", endTime.toString());
  }, [endTime]);

  const updateTime = (totalSeconds: number) => {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const seconds = String(totalSeconds % 60).padStart(2, "0");

    setTime({ hours, minutes, seconds });
  };

  const togglePause = () => {
    if (isPaused) {
      const currentTime = Date.now();
      const pausedDuration = currentTime - (pauseTime || currentTime);
      setEndTime((prevEndTime) => prevEndTime + pausedDuration);
      setPauseTime(null);
    } else {
      setPauseTime(Date.now());
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    }
    setIsPaused((prev) => !prev);
  };

  const resetClock = () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    setEndTime(Date.now() + initialTime * 1000);
    setIsPaused(false);
    setPauseTime(null);
    localStorage.setItem(
      "flipClockEndTime",
      (Date.now() + initialTime * 1000).toString()
    );
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-4 font-bold">
      <div className="flex justify-center items-center space-x-2">
        <FlipUnit unit={time.hours} />
        <span className="text-[4em]">:</span>
        <FlipUnit unit={time.minutes} />
        <span className="text-[4em]">:</span>
        <FlipUnit unit={time.seconds} />
      </div>
      {controls ? (
        <div className="flex space-x-4">
          <button
            onClick={togglePause}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            {isPaused ? "Resume" : "Pause"}
          </button>
          <button
            onClick={resetClock}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
          >
            Reset
          </button>
        </div>
      ) : null}
    </div>
  );
}

const FlipUnit = ({ unit }: { unit: any }) => {
  const [rotation, setRotation] = useState<number>(0);
  const [flipped, setFlipped] = useState<boolean>(false);
  const [unitPrevState, setUnitPrev] = useState(unit);
  const [unitState, setUnit] = useState(unit);

  useEffect(() => {
    setTimeout(() => setRotation((prev) => prev - 180), 300);
    setFlipped((prev) => !prev);
    if (!flipped) {
      setUnit(unit);
    } else {
      setUnitPrev(unit);
    }
  }, [unit]);

  return (
    <div className={`flip-container`}>
      <div
        style={{ transform: `rotateX(${rotation}deg)` }}
        className={`${rotation ? "card-flip" : ""} card`}
      >
        <div className="card-face card-front">{unitPrevState}</div>
        <div className="card-face card-back">{unitState}</div>
      </div>
    </div>
  );
};

export default FlipClock;
