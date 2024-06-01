#!/bin/bash

# Create virtual env
python3 -m venv venv

# start the virtual env
source venv/bin/activate

# install the pip packages
pip install -r requirements.txt

# Test the game logic

# draw = -1
curl http://127.0.0.1:3000/game?userCard=rocks&computerCard=rocks
curl http://127.0.0.1:3000/game?userCard=paper&computerCard=paper
curl http://127.0.0.1:3000/game?userCard=scissors&computerCard=scissors

# win = True
curl http://127.0.0.1:3000/game?userCard=rocks&computerCard=scissors
curl http://127.0.0.1:3000/game?userCard=scissors&computerCard=paper
curl http://127.0.0.1:3000/game?userCard=paper&computerCard=rocks

# lose = True
curl http://127.0.0.1:3000/game?userCard=scissors&computerCard=rocks
curl http://127.0.0.1:3000/game?userCard=paper&computerCard=scissors
curl http://127.0.0.1:3000/game?userCard=rocks&computerCard=paper
