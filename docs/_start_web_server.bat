cd /D "%~dp0"

start http://localhost:8777

python -m http.server 8777
