import React,{useEffect} from 'react'
import { Flex } from '@grid'
import SongListItem from './SongListItem'


import {inject} from '@lib/store'
import playerStore from '@features/player/store'
export default inject('playerStore')(SongList)

function SongList({ tracks,playerStore }) {

  useEffect(()=>{
    playerStore.setPlaylist(tracks)
  }),([])
 

  return (
    <Flex
      flexWrap="wrap"
      width={1}
      css={{ padding: '10px 0', borderRadius: '5px' }}>
      {tracks.map((track, i) => { 
        return (<SongListItem key={i} playnumber={i} track={track} />)
       })}
    </Flex>
  )
}
