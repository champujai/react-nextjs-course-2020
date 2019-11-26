import React, { useRef, useEffect } from 'react'
import ReactDom from 'react-dom'
import ReactPlayer from 'react-player'
import playerStore from '@features/player/store'

import { inject } from '@lib/store'
export default inject('playerStore')(Player)


function Player({ playerStore }) {

  const { url, playing } = playerStore.nowPlaying
  const playerInst = useRef(null)
  useEffect(() => {
    playerStore.addPlayer(playerInst)
  })

  let muted=playerStore.volumeState.muted
  let level=playerStore.volumeState.level


  return (
    <ReactPlayer
      ref={playerInst}
      css={{ display: 'none' }}
      playing={playing}
      url={url}
      progressInterval={50}
      volume={level}
      muted={muted}
      onProgress={data => {


        playerStore.setSec(playerInst.current.getCurrentTime())


      }}
      onEnded={() => {
        playerStore.autonext()
      }}
    />
  )
}


