# Ussd-Menu
Created a USSD application that prompts the username.
Then prompts for the age.
If age is less than 30: 'welcome young ${username}, the future awaits.'
If age is greater than 30: 'welcome ${username}, age gracefully.'

![Screenshot from 2022-03-29 18-27-17](https://user-images.githubusercontent.com/55623011/160649905-2149eaa5-2d57-427d-8fd4-eb5cf87e1224.png)
![Screenshot from 2022-03-29 18-27-25](https://user-images.githubusercontent.com/55623011/160649970-7920aaa1-d02f-4a52-9257-7bdc9a2498d1.png)
![Screenshot from 2022-03-29 18-28-32](https://user-images.githubusercontent.com/55623011/160650045-84f321f7-0620-4cab-95a4-5da2de132215.png)
![Screenshot from 2022-03-29 18-28-53](https://user-images.githubusercontent.com/55623011/160650071-c3f826bf-3f93-42d9-822b-260bf477f3fa.png)
![Screenshot from 2022-03-29 18-38-54](https://user-images.githubusercontent.com/55623011/160650627-1e160ed7-286e-4ef9-b343-410f77af2fde.png)
![Screenshot from 2022-03-29 18-39-07](https://user-images.githubusercontent.com/55623011/160650653-1d1a2aa8-42c9-4c6f-b07e-c6cdad263fd0.png)
![Screenshot from 2022-03-29 18-39-15](https://user-images.githubusercontent.com/55623011/160650689-b4adbe00-250a-4a90-9b99-e15bd86fdc11.png)


#Instructions
1. Create a new folder and clone this repository in it: git clone https://github.com/Lucky-Tsuma/Ussd-Menu.git
2. run 'npm install' to install all node modules needed to run the project
3. At the root of the project, create a new file '.env' and add this line 'PORT="port number here"
4. run 'npm install nodemon' 
5. On the terminal run this command 'nodemon'
6. Head over to [ngrok](https://ngrok.com/) and create an account there if you don't already have one.
7. Check the installation prodedure specific for your environment and install ngrok on your computer.
8. Finally, open your terminal and run this command 'ngrok http localhost:"the port you are running your app here"'
9. copy the forwarding url(with https). This is what we will use to tunnel to our localhost to the public.
10. Log in to [africastalking](https://africastalking.com/).
11. Go to sandbox app.
12. Click lauch simulator on the side menu.
13. Enter your prefered phone number on the simulator. 
14. Having set the simulator, go back to the USSD menu on the sidebar and click create channel.
15. Paste the url from ngrok on the callback url.
16. Choose a channel number (They will be suggested). Then click create channel.
17. You can then run the app on your simulator. use \*384\*'your channel no'# example : *384*976778#
