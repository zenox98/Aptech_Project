#!/bin/bash

tmux new-session -d -s Project

# Backend Window
tmux rename-window -t Project
tmux rename-window -t Project:1 'backend'
tmux send-keys -t Project:1 'cd backend' C-m
tmux send-keys -t Project:1 'nvim' C-m

# Frontend Window
tmux new-window -t Project
tmux rename-window -t Project:2 'frontend'
tmux send-keys -t Project:2 'cd frontend/Converter' C-m
tmux send-keys -t Project:2 'nvim' C-m

# Dev Running Window
tmux new-window -t Project
tmux rename-window -t Project:3 'Dev Script'

# Split window:3 horizontally
tmux split-window -h -t Project:3 # Spliting  vertically

# Split window:3 vertially
tmux split-window -v -t Project:3.1 # Spliting  horizontally

# Run commands in each pane
# pane 3.1
tmux send-keys -t Project:3 'cd backend' C-m
tmux send-keys -t Project:3 'npm run dev' C-m

# pane 3.2
tmux send-keys -t Project:3.1 'cd frontend/Converter' C-m
tmux send-keys -t Project:3.1 'npm run dev' C-m

# pane 3.3
tmux send-keys -t Project:3.3 'lazygit' C-m


# Attact to the session
tmux attach-session -t Project
