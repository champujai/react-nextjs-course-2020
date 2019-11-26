import React from 'react'
import ReactPlayer from 'react-player'
import playerStore from '@features/player/store'

import {inject} from '@lib/store'
export default inject('playerStore')(Player)


function Player({playerStore}) {

  const { url, playing } = playerStore.nowPlaying
 

  return (
    <ReactPlayer
      css={{ display: 'none' }}
      playing={playing}
      url={url}
      progressInterval={50}
      volume={0.8}
      muted={false}
      onProgress={data => {

        let currentSec=playerStore.getSec()
        playerStore.setSec(parseInt(currentSec)+1)
       

      }}
      onEnded={() => {
        playerStore.autonext()
      }}
    />
  )
}


