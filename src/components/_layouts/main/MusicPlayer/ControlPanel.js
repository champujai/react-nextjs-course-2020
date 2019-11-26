import React, { useState } from 'react'
import { Flex, Box } from '@grid'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import colors from '@features/_ui/colors'


import playerStore from '@features/player/store'
import {inject} from '@lib/store'
export default inject('playerStore')(ControlPanel)


function ButtonControl({ icon, circle = false, active = false, onClick }) {
  const css = {
    background: 'transparent',
    padding: '7px 8px 11px 10px',
    margin: '0 10px',
    width: '34px',
    height: '34px',
    cursor: 'pointer',
    ...(circle === true
      ? { border: `1px solid ${colors.link}`, borderRadius: '50%' }
      : { border: 'none' }),
  }

  return (
    <button onClick={onClick} css={css}>
      <Icon
        icon={icon}
        css={{
          color: active ? 'green' : colors.link,
          width: '10px',
        }}
      />
    </button>
  )
}

function ControlPanel({ playerStore }) {

  let playbutton='play'
  let repeatbutton='redo-alt'
  let randombutton='random'
  const { playing } = playerStore.nowPlaying
  let repeatmode=playerStore.repeatState
  let randommode=playerStore.randomState;
  
  if(playing){
     playbutton='play'
  }else{
    playbutton='pause'
  }
  
  if(repeatmode==1){
    repeatbutton='heart'
 }else{
  repeatbutton='redo-alt'
 }

 if(randommode==1){
  randombutton='heart'
}else{
  randombutton='random'
}




  return (
    <Flex>
      <Box>
        <ButtonControl icon={randombutton} active={false} onClick={() => {

              playerStore.setRandom()

        }} />
      </Box>
      <Box>
        <ButtonControl icon="step-backward" onClick={() => {

               playerStore.back()

        }} />
      </Box>
      <Box>
        <ButtonControl icon={playbutton} circle={true} onClick={() => {


               playerStore.playtoggle()

        }} />
      </Box>
      <Box>
        <ButtonControl icon="step-forward" onClick={() => {

                  playerStore.next()


        }} />
      </Box>
      <Box>
        <ButtonControl icon={repeatbutton} active={false} onClick={() => {

                   playerStore.setRepeat()

        }} />
      </Box>
    </Flex>
  )
}


