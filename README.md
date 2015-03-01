# Glitchr

Glitch my Tumblr.

Glitch and upload images from Tumblr, to Tumblr.

## Install

1. Install [Docker] [0]
    
    $ sudo apt-get update
    $ sudo apt-get install docker.io
       
   Add auto-complete for BASH
       
    $ source /etc/bash_completion.d/docker.io
    
2. Build Docker Image

    $ sudo docker build -t martinffx/glitchr .
    
3. Install Packages
  
    $ npm install
    
   (I had issues installing `gulp-sass` and had to go into the node module 
   and manually run npm install for `pangyp` in the `node-sass` module.)
   
4. Build App
   
    $ gulp build

4. Create Docker Container

    $ sudo docker run --name glitchr -d -p 3000:8080 -v ~/code/glitchr/dist:/usr/src:ro martinffx/glitchr
    
   You now have an application container running on port 3000. 
   
   You can start/stop/restart the container at will like so:
   
    $ sudo docker glitchr stop
    $ sudo docker glitchr start
    $ sudo docker glitchr restart
    
   See a list of running containers:
   
    $ sudo docker ps
    
   See a list of all containers:
   
    $ sudo docker ps -l
    
   And view a containers logs:
   
    $ sudo docker logs glitchr
    
## Client

The client is going to be built with [React] [1] and the [Flux] [2] Architecture, 
making use of one-way data flows, [imumtable] [3] data structures and a functional style as much as possible. 

## Server

The server makes use of [Hapijs] [4] to build modular API around the various backend services I'll be interacting with and creating.
   
    
[0]: https://docs.docker.com/installation/#installation
[1]: http://facebook.github.io/react/index.html
[2]: http://facebook.github.io/flux/index.html
[3]: https://facebook.github.io/immutable-js/docs/#/
[4]: http://hapijs.com/
