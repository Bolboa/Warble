## -- BETA

# WARBLE
 Essentially a replica of Omegle/Chatroulette. The idea is to create a web app with user authentication that will connect two random users together. A nice project for getting familiar with peer to peer communication using WebRTC and secure authentication using JSON web tokens (JWT) and Passport.js. 

## How To Use
* The distinctive feature of this web application that makes it stand out from Omegle and Chatroulette is the ability for user authentication. The first thing the user will see when lauching Warble is a modal window that allows for login and registration. Once logged in, the user is given a JWT that will be stored in their local storage, that way the next time Warble is lauched the user will be automatically logged in, thus skipping the authentication process.

* Once logged in, the user will be connected to a random user. Every time the user disconnects from a chat, an algorithm ensures that the user does not stay disconnected for long, as it will quickly connect the user to another available chat.
 
 ![Alt text](/github_images/step2.gif)
 
##APIs
* PeerJS (P2P communication using WebRTC)

##Technologies
* Redux-React
* Node.js
* MongoDB (MLab)

