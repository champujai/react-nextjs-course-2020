import React from 'react'
import { Flex, Box } from '@grid'
import withPage from '@lib/page/withPage'
import { useMember } from '@lib/auth'

import DetailPageHeader from '@components/_common/DetailPageHeader'
import SongList from '@common/SongList'

import {useRouter} from 'next/router'
import * as service from '@features/album/services'
import {Fetch} from '@lib/api'



AlbumDetailPage.defaultProps = {
  data: {
    title: 'KILL THIS LOVE',
    subTitle: 'BLACKPINK',
    bottomLine: '2019 • 5 Tracks',
    image: 'https://i.scdn.co/image/ab67616d0000b273adf560d7d93b65c10b58ccda',
    tracks: [
      {
        name: 'Kill This Love',
        artist: 'BLACKPINK',
        album: 'KILL THIS LOVE',
        image:
          'https://i.scdn.co/image/ab67616d0000b273adf560d7d93b65c10b58ccda',
        previewUrl:
          'https://p.scdn.co/mp3-preview/554bf24c1e0cccc09000c6fce75f08d30dc91967?cid=e4abb1ea8fdf4926a463960abd146fcb',
        durationMs: 189052,
      },
      {
        name: "Don't Know What To Do",
        artist: 'BLACKPINK',
        album: 'KILL THIS LOVE',
        image:
          'https://i.scdn.co/image/ab67616d0000b273adf560d7d93b65c10b58ccda',
        previewUrl:
          'https://p.scdn.co/mp3-preview/9303f5daa53b082b9b09a78925fcbde3ad6668dc?cid=e4abb1ea8fdf4926a463960abd146fcb',
        durationMs: 201081,
      },
      {
        name: 'DDU-DU DDU-DU (Remix)',
        artist: 'BLACKPINK',
        album: 'KILL THIS LOVE',
        image:
          'https://i.scdn.co/image/ab67616d0000b273adf560d7d93b65c10b58ccda',
        previewUrl:
          'https://p.scdn.co/mp3-preview/05cc17469ea45e8d928251e472e85c22226d60da?cid=e4abb1ea8fdf4926a463960abd146fcb',
        durationMs: 201225,
      },
    ],
  },
}




function AlbumDetailPage({ data }) {


  const { token } = useMember()

  if (token === null) {
    return null
  }

  let param =useRouter()
 

 


  return (
    <Flex flexWrap="wrap" css={{ padding: '60px 120px' }}>
      <Box width={1 / 3}>

      <Fetch service={()=>service.getAlbumById(param.query.id,{token})}>
         {({data}) =>  <DetailPageHeader data={data} />}
      </Fetch>
       
      </Box>
      <Box width={2 / 3}>
      <Fetch service={()=>service.getAlbumById(param.query.id,{token})}>
        {({data}) => <SongList tracks={data.tracks} />}
      </Fetch>
      </Box>
    </Flex>
  )
}

export default withPage()(AlbumDetailPage)



/*

let xx={
'title': item.name,
'subTitle': item.label,
'bottomLine': item.release_date+' '+ item.total_tracks + ' track',
'image': item.images[0].url,
'tracks': [
  {
    'name': item.tracks.items[0].name
    'artist': item.tracks.items[0].artists[0].name,
    'album': item.name,
    'image':item.images[0].url,
    'previewUrl':item.tracks.items[0].preview_url,
    'durationMs': item.tracks.items[0].duration_ms,
  },
}

*/
