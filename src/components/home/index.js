import React,{ useState, useEffect }  from 'react'
import { Flex, Box } from '@grid'
import { useMember } from '@lib/auth'
import withPage from '@lib/page/withPage'
import colors from '@features/_ui/colors'
import AlbumList from './AlbumList'
import * as service from '@features/album/services'
import {Fetch} from '@lib/api'

HomePage.defaultProps = {

  albums: [
    {
      id: '2Pz8VAMiGc9UW1rrbBRDuO',
      name: 'KILL THIS LOVE',
      images: [
        {
          url:
            'https://i.scdn.co/image/ab67616d0000b273adf560d7d93b65c10b58ccda',
        },
      ],
    },
    {
      id: '2Pz8VAMiGc9UW1rrbBRDuO',
      name: 'KILL THIS LOVE',
      images: [
        {
          url:
            'https://i.scdn.co/image/ab67616d0000b273adf560d7d93b65c10b58ccda',
        },
      ],
    },
  ],

}




function HomePage({ albums }) {



  const { token } = useMember()

  if (token === null) {
    return null
  }

  let releaseOBJ={
    'token':token,
    'limit':18
  }


  return (
    <Flex flexWrap="wrap" css={{ padding: '60px 120px' }}>
      <Box width={1}>
        <h1
          css={{
            color: colors.link,
            fontSize: '2em',
            padding: '50px 10px 10px',
          }}>
          New Releases
        </h1>
      </Box>

      <Fetch service={()=>service.getNewReleases(releaseOBJ)}>
       {({data}) => <AlbumList albums={data} />}
      </Fetch>


    </Flex>
  )
}

export default withPage({ restricted: true })(HomePage)
