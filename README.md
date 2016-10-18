# Warble


## Matching flow
- Client makes a socket connection to server.
- Client makes a peer connection with the peer broker.

  //Socket connection is required to send peerid to server. 
- Upon socket connection -> A peer connection is established.
- Upon peer connection -> A { peerId event } is sent on the socket to the server.

//When searching
- Users peerId is thrown into { Searching Pool } via socket event.
- Server finds a match from { Searching Pool } using users session cache for algorithm.

//Session cache includes:
- Users spoken to recently
- Location || IP (maybe)

//Searching algorithm
- Look in { Search Pool }, 
  if ( Search Pool > 0 ){
    search { Search Pool } backwards for target{
      if(target !in user.cache){
        set target.available = false
        if(attemptConnect(target).isSuccessful) //
          remove target from { Search Pool }
          return
      }
      //If can't find any fresh targets then clear user cache and enter Searching Pool for 5 seconds
      { Search Pool }.push(user)
      //after 10 seconds searching loop.
    }
  }
  else
    put user in Search Pool
      
    
  

