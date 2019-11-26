import * as API from './repository'

export function getNewReleases({ token, limit }) {

  /**/ 
  return API.getNewReleases({ token, limit }).then((data) => {

      console.log(data)
     
      let listalbum=[]
      data.albums.items.map(function(item){

        listalbum.push({
          'id': item.id,
          'name': item.name,
          'images': [
            {
              'url':item.images[0].url,
            },
          ],
        })
        
      })
    
      return listalbum

   }

  )
}

export function getAlbumById(id, { token }) {
  return API.getAlbumById(id, { token }).then((data) => {

   // console.log(data)
    
     let listsong={
      'title': data.name,
      'subTitle': data.label,
      'bottomLine': data.release_date+' '+ data.total_tracks + ' track',
      'image': data.images[0].url,
      'tracks':[]
     }
   
     let inner=[]
     data.tracks.items.map(function(item){

          inner.push(
              {
            'name': item.name,
            'artist': item.artists[0].name,
            'album': item.name,
            'image':data.images[0].url,
            'previewUrl':item.preview_url,
            'durationMs':item.duration_ms,
            }
          )


     })





    listsong.tracks=inner

    return listsong
     


  })
}


/*

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
  ],

  */