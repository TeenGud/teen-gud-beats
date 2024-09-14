'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Button, Input } from '../ui';
import styles from './styles/AudioPlayer.module.css'
import { cn } from '@/shared/lib/utils';
import { BsArrowLeftShort } from "react-icons/bs";
import { BsArrowRightShort } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";



interface Props {
  className: string;
  beatLink: string;
  altBeatLink: string;
}

export const AudioPlayer: React.FC<Props> = ({ beatLink, className, altBeatLink }) => {
  const [hidden, setHidden] = useState(true);
  const [volume, setVolume] = useState(1)

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const progressBar = useRef<any>();
  const audioPlayer = useRef<any>();
  const animationRef = useRef<any>()


  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration)
    setDuration(seconds)
    progressBar.current.max = seconds

  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState])

  const calculateTime = (sec: number) => {
    const minutes = Math.floor(sec / 60)
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    const seconds = Math.floor(sec % 60)
    const returnedSecons = seconds < 10 ? `0${seconds}` : `${seconds}`
    return `${returnedMinutes}:${returnedSecons}`
  }

  const togglePlayPause = () => {
    const prevValue = isPlaying
    setIsPlaying(!prevValue)
    if (!prevValue) {
      try {
        if (altBeatLink) {
          audioPlayer.current.src = altBeatLink
          audioPlayer.current.play()
          animationRef.current = requestAnimationFrame(whilePlaying)
        } else {
          audioPlayer.current.play()
          animationRef.current = requestAnimationFrame(whilePlaying)
        }

      } catch (err) {
        // audioPlayer.current.src = altBeatLink
        // audioPlayer.current.play()
        // animationRef.current = requestAnimationFrame(whilePlaying)
      }
    } else {
      audioPlayer.current.pause()
      cancelAnimationFrame(animationRef.current)
    }
  }
  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime
    changePlayerCurrentTime()
    animationRef.current = requestAnimationFrame(whilePlaying)
  }

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value
    changePlayerCurrentTime()
  }
  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty('--seek-before-width', `${(progressBar.current.value / duration) * 100}%`)
    setCurrentTime(progressBar.current.value)
  }
  const backTen = () => {
    progressBar.current.value = Number(progressBar.current.value - 10)
    changeRange()
  }

  const forwardTen = () => {
    progressBar.current.value = Number(progressBar.current.value) + 10
    changeRange()
  }
  const handleFocus = () => {
    setHidden((prev) =>  !prev)
  }
  const handleVolume = ({target}: any) => {
    setVolume(target.value)
    audioPlayer.current.volume = Number(target.value)
  }

  return (
    <div className={cn('flex items-center flex-col', className)}>
      <input min="0" max="1" step="0.05" onChange={handleVolume} value={volume} type="range" name="volume" className={cn(hidden && 'opacity-0')} />
      <div className='flex items-center gap-1'>
        {/* current time  */}
        <div>{calculateTime(currentTime) === 'NaN:NaN' ? '00:00' : calculateTime(currentTime)}</div>

        {/* progress bar */}
        <div>
          <Input defaultValue="0" className={styles.progressBar} type="range" ref={progressBar} onChange={changeRange} />
        </div>

        {/* duration time  */}
        <div>{calculateTime(duration) === 'NaN:NaN' ? '00:00' : calculateTime(duration)}</div>
        <audio ref={audioPlayer} src={beatLink} preload='metadata' />
      </div>
      <div className='flex items-center gap-1'>
        <Button variant='outline' onClick={backTen}><BsArrowLeftShort size={22} />10</Button>
        <Button onClick={togglePlayPause} variant="outline">
          {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} />}
        </Button>
        <Button variant='outline' onClick={forwardTen}><BsArrowRightShort size={22} />10</Button>
        <Button variant='outline' onClick={handleFocus}>
          <img src="assets\images\audio.svg" alt='audio'/>
        </Button>
      </div>
    </div>
  )
}

