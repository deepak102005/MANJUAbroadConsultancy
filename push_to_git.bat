@echo off
echo ==================================================
echo Pushing Manju Abroad Consultancy to GitHub...
echo ==================================================
git init
git remote remove origin 2>nul
git remote add origin https://github.com/deepak102005/MANJUAbroadConsultancy.git
git branch -M main
git add .
git commit -m "feat: complete premium refocused overseas visa consultancy website with credential forms"
echo Pushing to GitHub...
git push -u origin main --force
echo ==================================================
echo Done!
pause
