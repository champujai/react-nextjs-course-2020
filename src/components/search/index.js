import React, { useState, Fragment } from 'react'
import { Flex, Box } from '@grid'
import Link from '@link'
import { Fetch } from '@lib/api'
import { useMember } from '@lib/auth'
import withPage from '@lib/page/withPage'
import * as SearchService from '@features/search/services'

import colors from '@features/_ui/colors'

function SearchPage() {
  const { token } = useMember()
  const [keyword, setKeyword] = useState('')

  if (token === null) {
    return null
  }

  return (
    <Flex flexWrap="wrap" css={{ padding: '60px 120px' }}>
      <Box width={1}>
        <input
          type="text"
          value={keyword}
          placeholder="Search for artists, albums or playlists..."
          css={{
            padding: '15px 20px',
            borderRadius: '40px',
            border: 'none',
            width: '500px',
          }}
          onChange={e => {
            setKeyword(e.target.value)
          }}
        />
      </Box>

      {keyword !== '' && (
        <Fragment>
          <Box width={1}>
            <h1
              css={{
                color: colors.link,
                fontSize: '1.8em',
                padding: '50px 10px 0px',
              }}>
              Search results
            </h1>
          </Box>
          <Box width={1}>
            <Flex flexWrap="wrap">
              <Fetch
                service={() =>
                  SearchService.getSearchResults(keyword, { token })
                }>
                {({ data }) =>
                  data.items.map(playlist => (
                    <Box width={1 / 6} px={10} py={20} key={playlist.id}>
                      <article>
                        <Link
                          route="playlist-detail"
                          params={{ id: playlist.id }}>
                          <a>
                            <img src={playlist.images[0].url} />
                          </a>
                        </Link>
                        <h3
                          css={{
                            fontSize: '0.8em',
                            fontWeight: 'bold',
                            lineHeight: '1.5',
                            marginTop: '10px',
                            textAlign: 'center',
                          }}>
                          <Link
                            route="playlist-detail"
                            params={{ id: playlist.id }}>
                            <a>{playlist.name}</a>
                          </Link>
                        </h3>
                      </article>
                    </Box>
                  ))
                }
              </Fetch>
            </Flex>
          </Box>
        </Fragment>
      )}
    </Flex>
  )
}

export default withPage({ restricted: true })(SearchPage)