import * as API from './repository'


export function getPlaylistById(id, { token }) {


  return API.getPlaylistById(id, { token }).then((data) => {

   let listsong={
    'title': data.name,
    'subTitle':data.owner.display_name,
    'bottomLine': data.tracks.total + ' track',
    'image': data.images[0].url,
    'tracks':[]
   }

   let inner=[]
   data.tracks.items.map(function(item){

        inner.push(
            {
          'name': item.track.album.name,
          'artist': item.track.album.artists[0].name,
          'album': item.track.album.name,
          'image':item.track.album.images[0].url,
          'previewUrl':item.track.preview_url,
          'durationMs':item.track.duration_ms,
          }
        )

   })

  listsong.tracks=inner

  return listsong

  })
}



export function getMyPlaylist({ token }) {


  return API.getMyPlaylist({ token }).then((data) => {

    
    let myplaylist=[]
    data.items.map(function(item){

      myplaylist.push({
        'id': item.id,
        'name': item.name,
        'images': [
          {
            'url':item.images[0].url,
            height: 640,
            width: 640
          },
        ],
      })
      
    })
    return myplaylist
    

  }
 )
}



/*

export function getPlaylistById(id, { token }) {
  return API.getPlaylistById(id, { token }).then((data) => {

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

*/