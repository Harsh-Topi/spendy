<p align="center">
  <img width="500" alt="image" src="https://user-images.githubusercontent.com/44622454/148669616-b4bbfb64-ebea-4271-9c00-e16d40f1f394.png">
</p>

---

A browser extension for keeping on top of your finances. This project will keep track of the purchases you make online, and allow you to view charts and comprehensive reports to see how you spent your money. You can also set spending limits on a daily, weekly, and monthly basis and get notified if you overspend.

## Installation

To download the latest release click [here](https://github.com/Harsh-Topi/spendy/releases/latest).

To install from the latest release, unzip the contents from spendy_build.zip into a folder. Then, from chrome://extensions/, enable developer mode and click the 'Load unpacked' button on the top left of the screen. From there, select the folder with the contents from the spendy_build.zip file. $pendy will now be installed on your browser and can be accessed by clicking its extension icon on the top right extension menu.

### Instructions for developing/building $pendy locally:

```
git clone https://github.com/Harsh-Topi/spendy.git
cd spendy
npm install
npm run build
```

Note: if you are on Windows, you may need to use this command to build the extension instead:
```
npm run build-windows
```

## How to use

This extension is easy to use and requires little setup. Simply install the extension and locate it under your browser's extensions to follow the initial setup instructions. You'll be asked to add your spending limits which are limits that you choose for yourself based on your spending habits to help you keep to a budget.

Once the initial setup is complete, you are good to go! Now when you purchase an item online, the chrome extension will keep track of it. On the home screen, you will see an overview of your recent spending as well as a list of all your purchases. The second page visualizes your spending and shows you how close you are to your limits. Here is where you can also change those limits if your spending habits change. On the final page, you can download pdf reports for different days, weeks, and months that you have purchased items.

If you purchase more then your set limit, you will get a desktop notification saying that you have spent over your limit.