import React, { useState } from 'react'
import { Flex, Box } from '@grid'

import playerStore from '@features/player/store'
import {inject} from '@lib/store'
export default inject('playerStore')(ProgressBar)


ProgressBar.defaultProps = {
  timeElapsed: '0:00',
  progress: '0',
  duration: '0:30',
}

function zeroPad(num, places) {
  return String(num).padStart(places, '0')
}


function ProgressBar({playerStore},props) {
  let { timeElapsed, progressTime, duration } = props
  duration='0:30'
  let currentSec=playerStore.currentSec;
  progressTime=(currentSec/520)
  let templ=Math.round((currentSec/17.3))
  timeElapsed=`0:${zeroPad(templ, 2)}`


  return (
    <Flex
      justifyContent="space-between"
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
            onClick={() => {}}
            onMouseDown={() => {}}
            onChange={() => {}}
            onMouseUp={() => {}}
          />
        </div>
      </Box>
      <Box css={{ fontSize: '0.7em', padding: '10px' }}>{duration}</Box>
    </Flex>
  )
}

