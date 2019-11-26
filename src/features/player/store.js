import {observable,action}  from 'mobx'

export default class PlayerStore {


  listPlaying={}

  listAddPlayList={
    'tracks':[]
  }

  currentNumber=0

  @observable
  repeatState=0

  @observable
  randomState=0

  @observable
  currentSec=0

  nextPlaying = {
    playing: true,
    title: 'ไกลแค่ไหน คือ ใกล้',
    subTitle: 'Getsunova',
    image: 'https://i.scdn.co/image/ab67616d0000b273e76e64aa449965dd5e439c53',
    url:
      'https://p.scdn.co/mp3-preview/f0521c21357ae522872b59cf4dd082ad65880fe8?cid=e4abb1ea8fdf4926a463960abd146fcb',
  }


  @observable
  nowPlaying = {
    playing: true,
    title: 'ไกลแค่ไหน คือ ใกล้',
    subTitle: 'Getsunova',
    image: 'https://i.scdn.co/image/ab67616d0000b273e76e64aa449965dd5e439c53',
    url:
      'https://p.scdn.co/mp3-preview/f0521c21357ae522872b59cf4dd082ad65880fe8?cid=e4abb1ea8fdf4926a463960abd146fcb',
  }
 


  setPlaylist(tracks){
    this.listPlaying=tracks
  }


  @action
  play(track,playnumber=0) {


    this.resetTime()
    this.currentNumber=playnumber;
    const { previewUrl, name, artist, image } = track
    this.nowPlaying.playnumber = playnumber
    this.nowPlaying.playing = true
    this.nowPlaying.title = name
    this.nowPlaying.subTitle = artist
    this.nowPlaying.image = image
    this.nowPlaying.url = previewUrl
    console.log('Now Number:', this.currentNumber)
    console.log('Now Playing:', this.nowPlaying.title)

  }


  playCustom(repeat){

    const { previewUrl, name, artist, image } = this.listPlaying[this.currentNumber]
    this.nowPlaying.playnumber =  this.currentNumber
    this.nowPlaying.playing = true
    this.nowPlaying.title = name
    this.nowPlaying.subTitle = artist
    this.nowPlaying.image = image
    
    if(repeat==1) this.nowPlaying.url = `${previewUrl}#${Math.random()}`
    else this.nowPlaying.url = previewUrl

  }


  @action
  playtoggle() {

    if(this.nowPlaying.playing)  this.nowPlaying.playing=false
    else this.nowPlaying.playing=true
    console.log(' Playing state:', this.nowPlaying.playing)
  }


  @action
  checkstate(){
    console.log(' checking state:', this.nowPlaying.playing)
    return this.nowPlaying.playing
  }

  resetTime(){
    this.currentSec=0
  }

  @action
  getSec(){
    return this.currentSec
  }

  @action
  setSec(sec){

    this.currentSec=sec
  }

  @action
  setRepeat(){
    if(this.repeatState==0)  this.repeatState=1
    else this.repeatState=0
    console.log('Repeat state:', this.repeatState)

  }


  @action
  getRepeat(){
    return this.repeatState
  }

  @action
  setRandom(){
    if(this.randomState==0)  this.randomState=1
    else this.randomState=0
    console.log('Random state:', this.randomState)

  }


  @action
  getRandom(){
    return this.randomState
  }

 

  @action
  autonext(){

     if(this.repeatState==1){
      this.resetTime()
      this.playCustom(1)
      console.log('Repeat Number:', this.currentNumber)
      console.log('Repeat Now Playing:', this.nowPlaying.title)

     }else if(this.randomState==1){

      this.randomplay()
     

     }else{

      this.next()

     }
  }

  @action
  next(){
    
    this.resetTime()
    this.currentNumber=parseInt(this.currentNumber)+1
    if(this.currentNumber==this.listPlaying.length){
      this.currentNumber=0
    }
    this.playCustom()
    console.log('Now Number:', this.currentNumber)
    console.log('Now Playing:', this.nowPlaying.title)

  }


  @action
  randomplay(){

    this.resetTime()
    this.currentNumber= Math.floor(Math.random() * ((this.listPlaying.length-1) - 0)) + 0;
    this.playCustom()
    console.log('Now Number:', this.currentNumber)
    console.log('Now Playing:', this.nowPlaying.title)

  }


  @action
  back(){

    this.resetTime()
    this.currentNumber=this.currentNumber-1
    if(this.currentNumber<0){
      this.currentNumber=0
    }
    this.playCustom()
    console.log('Now Number:', this.currentNumber)
    console.log('Now Playing:', this.nowPlaying.title)

  }


  @action
  playall(){

    this.resetTime()
    this.currentNumber=0
    this.playCustom()
    console.log('Now Number:', this.currentNumber)
    console.log('Now Playing:', this.nowPlaying.title)

  }



  @action
  addPlayList(track){
    console.log('add to list :',track)
    this.listAddPlayList.tracks.push(track)

  }



}
