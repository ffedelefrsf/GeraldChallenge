# Gerald Challenge

Hello, everyone! I just created this repository in order to achieve an interview challenge from [Gerald](https://joingerald.com/) and [Taller](https://tallertechnologies.com/). I took some extra built-in components that I had already developed within previous applications and created some kind of template to prevent spending useful time in basic stuff. 
It's important for you to know that every single line of code that doesn't come from a node library was written by me. I've made the adjustments for it to fit new libraries versions and this particular template which is brand new; feel free to take whatever you find useful for your own purpose though.

*PS: As this is a dummy project, I'm not going to ignore environment files from the repository so it'll be easier for you to run the app.*

## Installation

First, check [React Native Docs](https://reactnative.dev/docs/environment-setup) to be aware of the tools I'm assuming you already have installed. This project was built with **ReactNative Cli**, so make sure you have selected that tab in the Docs site.
In order to install the project in your computer, just run:

    yarn install

Keep in mind that I have used the following tools versions:

 - JDK: v19.0.2
 - Ruby: v2.6.10
 - Cocoapods: v1.11.3
 - NPM: v8.19.4
 - Node: v16.20.0
 - Gradle: v7.5.1

**Troubleshooting**: In case you face issues with iOS dependency installation, run the following:

    cd ios && pod install

## Usage

Once downloaded all the dependencies and checked all version listed above, you can go ahead and run the React Native project in your local device or simulator, run:
For **Development** Environment:

    yarn start:dev
For **Staging** Environment:

    yarn start:staging

And then, link your device/simulator to the Metro Builder you just started according to the OS you're willing to use, commands:
For **iOS**:

    yarn ios

For **Android**:

    yarn android

## The challenge

Well, now I'm going to try to solve the challenge that these companies sent me. I created this section to paste down below the challenge information once I finish.
Wish me luck, folks. 👋👋

### Description
 - Build a drawer menu similar to the one shown in the animation below:
[GIF](https://geraldtech.notion.site/image/https://user-images.githubusercontent.com/40486471/100883752-209b0300-34ca-11eb-9aa7-836d1be2d915.gif?id=afc55f43-3b72-456a-a9c6-56b917c8fc65&table=block&spaceId=7210ed3e-4721-40b0-b799-c6d10ac8e1d7&userId=&cache=v2)
 - Navigation Requested Structure:
	 - DrawerMenu(one in a gif)
		 - tab navigator (bottom tab navigation)
			 - home (stack navigation)
				 - screen1
				 - screen2
			 - contact
 - ⚠️ Have in mind that on the GIF above, tab navigation isn’t present, please add it according above pattern.

### Requirements
-   The screen should be built using React Native
-   Use of Typescript is required
-   Tab navigation needs to be configured (as above)
-   Pay attention that the Drawer needs to be a parent component of other children

### Evaluation Criteria
Your submission will be evaluated on the following aspects of your project:

1.  **React Code** (optimizations, structuring, and logic) **[This is very important to us]**
2.  UI (how similar it looks to the UI).
3.  How well navigation is integrated. (According to above mentioned navigation pattern)
4.  The functionality of the application.
5.  Use of [https://github.com/software-mansion/react-native-reanimated](https://github.com/software-mansion/react-native-reanimated) will be advantage.

### Duration
2-3 hours to send deliverable (+30 min to compile a short README file explaining your system and thought process). Please add a video/gif of the final product and how it looks like.

### Deliverable
Access to GitHub repo or zip file

## Feedback post challenge
To be honest among all the mobile applications that I've developed, I've never been asked for a Drawer. So, that was a picky task, mainly finding how to handle animations within the navigator. After a little of frustration, I started to consider how to achieve the described behavior; but as I wasn't that familiar with the Drawer Navigator structure, there was no way for me to find out a way to set the drawer behind the children navigator (in this case, the Bottom Tab) unless checking the actual code from React Navigation. I was losing too much time, so a few minutes later I decided to finish with all the other tasks and leave that blessed animation for the end.
That's how I managed to finish a version to deliver within 3 hours (if you check the commits description and take a look to this Readme at the top of **The Challenge** section, you will be able to validate that I had't read the challenge description until the first Readme and environment setup commit.
Nevertheless, after a whole regular work day, plus building this template (as I said, it's brand new I didn't have any updated one), I managed to create something organized, understandable, straightforward and maintainable. BUT, even though the time had already "expired" (not really sure how this works), I wouldn't let an issue like this one undermine me, so I kept trying; and not that much far later, I found out checking the code that my first approach about somehow move to the top the child navigator and hide the Drawer was impossible unless creating a patch-package of react-navigation (and we don't want to do that, right? RIGHT? I considered...), so I started searching for another one... What if I have the value in the Drawer, like using an Animated Shared Value listening an Animated Reaction and creating a communication parent-children by props? Well, being able to access the drawer progress from the Drawer Navigator has no use either because rotating a new Drawer Navigator Wrapper was rotating the whole Drawer, and there was no prop that I could send to this Navigator in order to get this behavior (trust me, I've read and read). So, after an hour maybe of this constant struggling, I started to think what if I play dirty, I mean, as long as the client does not find out it's ok, right? And this is a challenge, so maybe somebody someday faced this struggle and had the marvelous idea to ask for the solution in a three-hour challenge (writting my thoughts here). It was at this moment that I found out, the drawer is not that large; it's just an ilusion! What if the drawer is just 30% that purple/marine background and the rest is part of a normally hidden background that actually belongs to the child and it cannot be seing unless you transform and move it... 
So, yeah. It took me a while, but eventually I did it, and this is not the end of the story!!!! There is more, because once I wast ABOUT to let my mind rest Drawer was just getting a really strange behavior, and this guys was the biggest problem of the night. I spent hours searching for the solution... Didn't find it. But after doing a lot of research, the most accepted answers were from people who experienced trouble with React Native Reanimated in relation with React Drawer Navigator... So, guess what? React Native, Node Package Manager, the mighty modules association and dependency... See where I'm going? Yeap, dependency issues, no error, no warns, no info, no nothing, just a blank screen when you pressed the hamburguer menu of Drawer or tried to open/close/toggle the drawer programatically.
Anyways, this was my Friday night. Fun, huh. Will leave a GIF below for you to appreaciate the results.
Let me know if you need something or just create a pull request/issue if you find something important that's missing.

[Demo GIF](https://drive.google.com/file/d/1aqPTGBRMUrn833DS-hhYW1_PwqnB7cF1/view?usp=sharing)

Have a great weekend, people. 
Wish you the best!!! ✨✨