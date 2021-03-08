---
layout: post
title: Running the Force.com Plugin for Eclipse on a Chromebook
description: ''
date: '2012-12-18T19:24:37.000Z'
categories: ['salesforce', 'development']
keywords: []
slug: >-
  /running-the-force-com-plugin-for-eclipse-on-a-chromebook
---

[Scott
Covert](https://www.tython.co/)

For all those lucky little boys and girls who will be pulling out a shiny new Samsung Chromebook from their stockings this year I’m afraid I must point out a small lump of coal-you can’t run Eclipse within Chrome OS. As many of you probably already know, Chrome OS does not allow you to install programs in the traditional sense; instead users are expected to download apps from the Chrome Web Store. Since there is no Eclipse app then I’m afraid if you were hoping to use the Force.com plugin on your Chromebook you’re out of luck-the same goes for the standalone Force.com IDE. No deposit no return…BUT WAIT! I think I see one more gift left in Santa’s bag:

You CAN run the Force.com Plugin for Eclipse on your Chromebook by loading Chrubuntu (Ubuntu 12.04 LTS for Chromebook) and following the instructions below.

It took a good amount of tinkering but I’m happy to say I got the Force.com plugin working for Eclipse Indigo on my Chromebook, and more importantly for you, I took note of the required steps so you could do the same (hopefully in much less time). After I installed Chrubuntu and Eclipse on my Chromebook the installation of the Force.com plugin kept causing Eclipse to crash so finally I solved the issue by installing on another computer and copying over the necessary plugin .JAR files-in the steps below I’ve included links where you can download these same files so you can skip the superfluous installation. Afterwards I followed the standard plugin installation instructions provided by Salesforce with the Helios repository (Yes, I said Helios and not Indigo-more on that later) added as another available download site and voila! Enough chitchat-let’s get down to the meat of the sandwich. In order to get the latest (version 26) Force.com plugin for Eclipse working on your Chromebook you will need to:

**1.** Follow these [Chrubuntu installation](http://chromeos-cr48.blogspot.com/2012/10/arm-chrubuntu-1204-alpha-1-now.html) instructions — many thanks to Jay Lee for his work on this! I would also highly recommend getting your sound working by following George McBay’s suggestions as summarized by Aaron Zak:

1\. Open a Terminal (ctrl-alt-T) type ‘alsamixer’ and hit enter  
2\. Make sure that ‘\[Playback\]’ is highlighted in yellow, either hit the ‘Tab’ key to cycle through, or ‘F3’ (refresh icon) to select it.  
3\. Use the cursor keys to cycle over to the following items. For each one you will press the ‘m’ key which will toggle muting for that specific Item. Again, there are many permutations so pay attention that you have the correct combination of Left and Right channels  
a. Left Headphone Mixer Left DAC1  
b. Left Speaker Mixer Left DAC1  
c. Right Headphone Mixer Right DAC1  
d. Right Speaker Mixer Right DAC1  
4\. After you’ve enabled all these channels you can test them using the Sound Control applet and you should hear sound out of each channel  
5\. If everything works use ALT-Q to exist out of AlsaMixer

**2.** Install Chromium from the Ubuntu Software Center

Technically you don’t really need Chromium to get the Force.com plugin running with Eclipse, but come on-it’s a Chromebook for crying out loud!

**3\.** Install flash by typing “sudo apt-get install gnash mozilla-plugin-gnash” into a new terminal window (Note: The default login for Chrubuntu is user/user)

Again, you don’t really need to have the gnash plugin for flash, but if you’re like me you might get stuck somewhere along the way and want to watch a youtube video or two for more instructions…

**4\.** Install OpenJDK by typing “sudo apt-get install openjdk-6-jdk”

**5\.** Verify a proper installation by typing “java -version” and “javac -version” to ensure the commands are recognized

**6\.** Install Eclipse from the Ubuntu Software Center (this will install Eclipse Indigo)

**7\.** In a terminal window access the installation directory by typing “cd /home/user/.eclipse/org.eclipse.platform\_3.7.0\_155965261”

**8\.** Empty the following 4 folders from this directory: configuration, features, p2, plugins by typing “sudo rm -R ./\[Folder\_Name\_Here\]/\*”

**9\.** Download the [required files](https://docs.google.com/open?id=0BxHrvOZJ2MAvUWdJVUhXR0pucHM) zip folder hosted on my Google Drive and extract it within your Downloads folder

**10\.** Within the terminal window (which should still be in the Eclipse installation directory from before) open up permissions for the 4 folders mentioned previously by typing “sudo chmod 777 \[Folder\_Name\]”

**11\.** Now, again for each of the 4 folders, type “sudo cp -R /home/user/Downloads/\[Folder\_Name\]/\* ./\[Folder\_Name\]/” to copy over the files you downloaded

**12\.** Create a new workspace by typing “sudo mkdir /home/user/workspace”

**13\.** Navigate to this new directory by typing “cd /home/user/workspace”

**14\.** Create a metadata folder by typing “sudo mkdir ./.metadata”

**15\.** Navigate to your new metadata folder by typing “cd .metadata”

**16\.** Download the [required metadata](https://docs.google.com/open?id=0BxHrvOZJ2MAvOVZPNnFPMDRvZEE) zip folder hosted on my Google Drive and extract it within your Downloads folder

**17\.** Within the terminal window (which should still be in the workspace metadata directory from before) copy the generic metadata by typing “sudo cp -R /home/user/Downloads/metadata/\* .”

**18\.** Create a new plugins folder by typing “sudo mkdir .plugins”

**19\.** Navigate to your new plugins folder by typing “cd .plugins”

**20\.** Copy the plugin metadata downloaded previously by typing “sudo cp -R /home/user/Downloads/plugins2/\* .”

**21\.** Navigate to your user directory by typing “cd ../../..”

**21\.** Open up permissions for your workspace folder by typing “sudo chmod -R 777 ./workspace”

**22\.** Fire Up Eclipse (be sure to choose “/home/user/workpace” as your workspace)

**23\.** If the Force.com plugin is not already active then go to Help>Install New Software

**24\.** Click “Available Software Sites”

**25\.** Uncheck all sources with URLs similar to “download.eclipse.org/releases” except the one that ends with “/helios” (If needed you can add this source) This is an important deviation from most of the other installation instructions I’ve found on the web for getting the Force.com plugin to work with Indigo; you must use the Helios repository or Eclipse will crash upon the Force.com plugin installation

**26\.** After this, you may follow the typical [Force.com plugin installation instructions](http://wiki.developerforce.com/page/Force.com_IDE_Installation_for_Eclipse_3.6)

After restarting Eclipse you should have the Force.com plugin working on your new Chromebook-merry coding to all, and to all a good night!

![ForceEclipseChrubuntu]({{ site.baseurl }}/images/0_MlghwNRmlOhtZV62.png)