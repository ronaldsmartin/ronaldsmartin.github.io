---
layout: ../layouts/SinglePage.astro
title: "Projects"
author: "Ronald Martin"
---

## Current

### [Material ViewPagerIndicator](https://github.com/ronaldsmartin/Material-ViewPagerIndicator)

- _On Github:_ https://github.com/ronaldsmartin/Material-ViewPagerIndicator

An Android library that implements pretty Material Design animations for swipeable pages. I'm trying to write a few posts on what I've learned from building it: here's [Part I](/blog/2016/10/my-first-library).

### [20 twenty 20](/20twenty20)

- _On Github:_ https://github.com/ronaldsmartin/20twenty20

An Android app built with Dagger 2 and RxJava (written fully in Kotlin!). Addresses the (unfortunately common) unhealthy habit of getting stuck sitting and staring in front of the computer too long by notifying you to do exercises and take eye breaks [per the 20-20-20 Rule](/20twenty20).

I tinker with this on and off, and it already works rather well. In the future, I'd like to build in automatic scheduler to turn it on daily or something. (So I can be _really_ lazy about my healthy habits...?)

[<img src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png" width="250" alt="Get it on Google Play">](https://play.google.com/store/apps/details?id=com.itsronald.twenty2020&utm_source=global_co&utm_medium=prtnr&utm_content=Mar2515&utm_campaign=PartBadge&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1)

### "And now, Your Highness, we will discuss the location of your hidden Rebel base."

[My roomie Dean](https://deanwilhelmi.wordpress.com/) and I threw together a Android app (Kotlin-based) to augment our galactic battles in the [Star Wars: Rebellion](https://www.fantasyflightgames.com/en/products/star-wars-rebellion/) board game. So far, it implements a basic visual state toggle (pretty much a color-coded grid) so that the Imperial players can keep track of their intelligence on each system. I started this off as a RecyclerView-based grid just to get the project off the ground, but once we can get some quality images of the game board we're going to learn how to make arbitrarily-shaped clickable regions to turn this into a touchable mini-map.

**Update:** I am updating the [AndroidImageMap library](https://github.com/ronaldsmartin/AndroidImageMap) to serve this purpose.

Long term, we're thinking about adding a game clock that syncs across all players' devices because our matches take too long. Longer term, we'd love to build an AI that'll play the game against us.

- Repo on on GitHub: https://github.com/turniphead/RebelBase

### You Are Here!

I'm learning my way around the awesome [Hugo static site generator](https://gohugo.io/) and currently building out the website you see here.

## Inactive (Older/Complete)

### APO-DZ

A suite of applications to facilitate community service and communication for my undergrad community service group, [Alpha Phi Omega](http://upennapo.org). The app provides native interfaces on iOS and Android to communicate with fellow brothers and to create/search/sign up for/report service projects & other chapter events.

As an app to help my friends and the local Philadelphia community, APO-DZ has served as my primary point of entry for exploratory forays into unfamiliar technologies:

#### Android app

- About: https://ronaldsmartin.github.io/APO-DZ-Android/
- Repo on GitHub: https://github.com/ronaldsmartin/APO-DZ-Android

[<img src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png" width="250" alt="Get it on Google Play">](https://play.google.com/store/apps/details?id=org.upennapo.app&utm_source=global_co&utm_medium=prtnr&utm_content=Mar2515&utm_campaign=PartBadge&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1)

#### iPhone app

- Repo on GitHub: https://github.com/ronaldsmartin/APO-DZ-iOS

[![Get it on the App Store](https://linkmaker.itunes.apple.com/htmlResources/assets/en_us//images/web/linkmaker/badge_appstore-lrg.svg)](https://itunes.apple.com/us/app/apo-dz/id862246150?mt=8&uo=4)

#### Google Apps Script

The API that makes this possible [is a Gist here on GitHub](https://gist.github.com/ronaldsmartin/47f5239ab1834c47088e).

#### APO Status Checker

- Use it: https://ronaldsmartin.github.io/apo-status/
- Repo on GitHub: https://github.com/ronaldsmartin/apo-status

An almost-complete Angular.js webapp to check a specific brother's membership status without sifting through the APO Spreadsheet. I'm learning Angular as I go and hope to branch out into some data visualization with D3.

#### Other

- a prototype web version built using Google Polymer web components is unfortunately not public because of private brother data
- a Windows Phone version is planned but not currently in progress

### Mater Dolorosa App

Native Android app for my parish. Currently, it uses the current date and time to provide up-to-date information about service times and office hours, as well as easing access to appropriate personnel. Future plans involve creating a dashboard for current and future events, but that entails setting up a backend somewhere and more careful planning.

- Repo on GitHub: https://github.com/ronaldsmartin/mater-dolorosa-android

### Name Formatter for APO Update Forms

The backend of the APO spreadsheet is built upon a network of Google Sheets, Forms, and update scripts created by my awesome robotics-master roommate, Dean (@turniphead). These forms require a specific format for brother names that is inconvenient to produce without a programmer's text editor (three cheers for regexps!). This simple webapp solves that problem.

- Check it out: https://ronaldsmartin.github.io/APO-DZ-Form-Name-Formatter/
- Repo on GitHub: https://github.com/ronaldsmartin/APO-DZ-Form-Name-Formatter

### Comegys Reporter

A proof-of-concept native Android app for student behavior reporting. Built for the [Comegys Elementary School](http://webgui.phila.k12.pa.us/schools/c/comegys) in Philadelphia during the course of Penn's [CIS 350](http://www.cis.upenn.edu/~cdmurphy/cis350/), the app allows teachers to create, save, and manage student behavior reports in a cloud database hosted by Parse.

- Repo on GitHub: https://github.com/ronaldsmartin/Comegys-Behavior-Android

### Automated Theorem Deducers

As a big fan of recursion and functional programming, one of my interests has been working on modeling proof systems in Haskell. The original version for Gentzen's sequent calculus was built during Penn's [FA'13 Advanced Programming course](http://www.seas.upenn.edu/~cis552/13fa/index.html) with my partner, Anne Foster. Code will be open-sourced as time permits.

### Chores-at-4030

A Ruby on Rails webapp built as a class project for CIS 196 designed to let houses keep track of their chores.

- Check it out here: http://chores-at-4030.herokuapp.com/
- Repo on GitHub: https://github.com/ronaldsmartin/chores-at-403
