# Ease-D

#### Problem Statement-
Drawing is not just a form of visual art but also a means of communication. Long before languages, communication was done using drawing. In ancient times, People drew symbolic representations of  what they saw or learnt to pass on the knowledge. Visual learning leaves a greater impact than words. Knowing to draw can help people communicate without any language barriers. It is especially helpful for deaf people to convey their thoughts and get information using pictorial representation. Good drawing skills are not accidental. It is a skill that can be learned with practice. The goal is to design a platform that helps people learn to draw. The main focus of the project shall be to teach children how to draw.
#### Model Used-
WaterFall Model
#### Project Timeline- [link](https://docs.google.com/spreadsheets/d/1dbgiKwDt6Sv6VdQ2t54Iu6b7pfj3H8rtjtr393cTbig/edit?usp=sharing)

###### Inside chiluServer directory

##### Start Django server, to connect with ML model
Install requirements.txt
```
$ python manage.py runserver
```
Change the IP and port in chilu/src/sketching.jsx




###### Inside chilu directory

##### Setup Environment and run
Install Node.js version 13+
##### To install all required dependency 
```
$ npm install 
```
Paste the [Image data](https://drive.google.com/drive/folders/1mMHCBcoVjk2T4zHg0tMIp01RYWArStu9?usp=sharing) in Android phone ``` Picture/canvas/datasets/``` directory.
as we have have trained our model for limited classes, and its in testing phase, so we are fetching images from phone for now.

##### Start react-native server
``` 
$ npx react-native start
```
##### Run app on your android device
```
$ npx react-native run-android
```
You have to connect android device with system via adb or USB with USB-debugging enebaled in developer option

if you want to use virtual device then follow https://developer.android.com/studio/run/emulator 
Read about adb https://developer.android.com/studio/command-line/adb


