import React, { useState, useEffect } from 'react'
import { Flex, Box } from '@grid'
import { convertSecondsToMinutes } from '@features/player/utilities'
import playerStore from '@features/player/store'
import { inject } from '@lib/store'
export default inject('playerStore')(ProgressBar)


ProgressBar.defaultProps = {
  timeElapsed: '0:00',
  progress: '0.8',
  duration: '0:30',
}



function ProgressBar({ playerStore }, props) {

  let { timeElapsed, progressTime, duration } = props



  if (playerStore.currentSec != 0) {

    let player = playerStore.playerState
    progressTime = player.current.getCurrentTime() / player.current.getDuration()
    duration = convertSecondsToMinutes(player.current.getDuration())
    timeElapsed = convertSecondsToMinutes(player.current.getCurrentTime())

  }



  return (
    <Flex
      css={{
        background: 'transparent',
        height: '20px',
        alignItems: 'center',
      }}>
      <Box css={{ fontSize: '0.7em', padding: '10px' }}>{timeElapsed}</Box>
      <Box
        css={{
          flex: 1,
          height: '4px',
          '&:hover input[type="range"]::-webkit-slider-thumb': {
            visibility: 'visible',
          },
        }}>
        <div css={{ position: 'relative' }}>
          <progress
            css={{
              appearance: 'none',
              position: 'absolute',
              width: '100%',
              height: '4px',
              zIndex: '-1',
              '&::-webkit-progress-bar': {
                borderRadius: '5px',
              },
              '&::-webkit-progress-value': {
                borderRadius: '5px',
              },
            }}
            value={progressTime}
            max={1}
          />
          <input
            css={{
              appearance: 'none',
              position: 'absolute',
              width: '100%',
              cursor: 'pointer',
              height: '4px',
              outline: 'none',
              background: 'transparent',
              '&::-webkit-slider-thumb': {
                visibility: 'hidden',
              },
            }}
            type="range"
            min={0}
            max={1}
            step="any"
            value={progressTime}
            onClick={() => { }}
            onMouseDown={(e) => {

              let position = e.target.value
              let seekto = Math.round(position * playerStore.playerState.current.getDuration())
              playerStore.playerState.current.seekTo(seekto)


            }}
            onChange={(e) => {
              let position = e.target.value
              let seekto = Math.round(position * playerStore.playerState.current.getDuration())
              playerStore.playerState.current.seekTo(seekto)


            }}
            onMouseUp={() => {

            }}
          />
        </div>
      </Box>
      <Box css={{ fontSize: '0.7em', padding: '10px' }}>{duration}</Box>
    </Flex>
  )
}

