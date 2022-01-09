<p align="center">
  <img width="500" alt="image" src="https://user-images.githubusercontent.com/44622454/148669616-b4bbfb64-ebea-4271-9c00-e16d40f1f394.png">
</p>

---

A browser extension for keeping on top of your finances. This project will keep track of the purchases you make online, and allow you to view charts and comprehensive reports to see how you spent your money. You can also set spending limits on a daily, weekly, and monthly basis and get notified if you overspend.

## Installation

To download the latest release click [here](https://github.com/Harsh-Topi/spendy/releases/latest).

To install from the latest release, unzip the contents from spendy_build.zip into a folder. Then, from chrome://extensions/, enable developer mode and click the 'Load unpacked' button on the top left of the screen. From there, select the folder with the contents from the spendy_build.zip file. $pendy will now be installed on your browser and can be accessed through clicking it's extension icon on the top right extension menu.

Alternatively, instructions for development / building $pendy locally:
```
git clone https://github.com/Harsh-Topi/spendy.git
cd spendy
npm install
npm run build
```

Note: if you are on Windows you may need to use this command to build the extension instead:
```
npm run build-windows
```
