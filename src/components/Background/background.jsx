"use client";
import styles from "@/components/Background/background.module.css";

const Background = () => (
  <video
    className="back_video"
    src="/vid/background-header.mp4"
    autoPlay
    loop
    muted
    playsInline
    preload="auto"
  />
);

export default Background;
