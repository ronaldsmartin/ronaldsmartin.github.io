+++
author = ""
categories = ["android", "kotlin", "dagger", "programming"]
date = "2016-06-14T22:48:04-07:00"
description = ""
featured = ""
featuredalt = ""
featuredpath = ""
linktitle = ""
title = "Lessons Learned: Kotlin + Dagger2"
type = "post"

+++

## Living Life on the "Edge"

I'm currently building an Android app to remind me to take healthy breaks from starting at computer screens. For extra funsies, it's built on the cutting edge of current fashionable Android technologies. Of particular note today, we have:

1. MVP architecture using [Dagger 2](http://google.github.io/dagger/) for dependency injection, and
2. Kotlin, the JVM language by JetBrains.

I've run into a few roadblocks along the way, and since we're using shiny new tools, there's fewer than usual online solutions addressing them. Hopefully these tips might help someone out there who's doing something similar.

At the time of writing, I'm currently using Dagger v2.2 with Kotlin v1.0.2. I have just discovered that Dagger 2.4 is [already stable](https://github.com/google/dagger/releases/tag/dagger-2.4) and that Dagger 2.5 was commited to master a few hours ago, so I'll update this again when I've looked into whether using one of these instead of v2.2 addresses some of the issues that follow.

### `kapt`, the Kotlin annotations processor

Most of the tutorials on (Java) Dagger integrations rely on Hugo Visser's [Android Studio Annotations Processor](https://bitbucket.org/hvisser/android-apt). This is used with Dagger as follows:
	
	apply plugin: 'com.neenbedankt.android-apt'
	 
	buildscript {
	    repositories {
	        jcenter()
	    }
	    dependencies {
	        classpath 'com.neenbedankt.gradle.plugins:android-apt:1.4'
	    }
	}
	 
	android {
	    ...
	}
	 
	dependencies {
	    apt "com.google.dagger:dagger-compiler:$rootProject.ext.daggerVersion"
	    compile "com.google.dagger:dagger:$rootProject.ext.daggerVersion"
	    provided 'javax.annotation:jsr250-api:1.0' 
	    
	    ...
	}

However, when using these annotations in Kotlin files we should be using the built-in Kotlin annotation processor instead (source: [Stack Overflow](javax.annotation:javax.annotation-api)):

	// apply plugin: 'com.neenbedankt.android-apt' - no longer necessary
	 
	buildscript {
	    repositories {
	        jcenter()
	    }
	    dependencies {
	        // classpath 'com.neenbedankt.gradle.plugins:android-apt:1.4' - no longer necessary
	    }
	}
	 
	android {
	    ...
	}

	kapt {
		generateStubs = true
	}
	 
	dependencies {
	    // apt "com.google.dagger:dagger-compiler:$rootProject.ext.daggerVersion" - use kapt instead
	    kapt "com.google.dagger:dagger-compiler:$rootProject.ext.daggerVersion"
	    compile "com.google.dagger:dagger:$rootProject.ext.daggerVersion"
	    provided 'javax.annotation:jsr250-api:1.0' 
	    
	    ...
	}

### Multiple JSR 250 Dependencies 

That `provided 'javax.annotation:jsr250-api:1.0'` line might have stuck out to you.

Developers haven't seemed to have agreed on a source for the [JSR-250 Java annotations API](https://en.wikipedia.org/wiki/JSR_250) used by the Dagger compiler. I've encountered at least three Gradle artifacts in various projects:

1. [`javax.annotation:javax.annotation-api:1.2`](https://bintray.com/bintray/jcenter/javax.annotation%3Ajavax.annotation-api/view) - used in [Mosby](https://github.com/sockeqwe/mosby)'s Dagger sample; in Facebook's [Fresco library](https://github.com/facebook/fresco)
2. [`org.glassfish:javax.annotation:10.0-b28`](https://bintray.com/bintray/jcenter/org.glassfish%3Ajavax.annotation/10.0-b28/view#) - used in Google's MVP+Dagger example and damianpetla's Kotlin+Dagger example
3. [`javax.annotation:jsr250-api:1.0`](https://bintray.com/bintray/jcenter/javax.annotation%3Ajsr250-api/1.0/view) - per codepath's [Dagger 2 article](https://github.com/codepath/android_guides/wiki/Dependency-Injection-with-Dagger-2)

So, what gives? A rudimentary Google search suggests that all of these were implemented as part of Sun/Oracle's [GlassFish project](https://en.wikipedia.org/wiki/GlassFish). I didn't find what I was looking for in jCenter, so I found what I believe are the original uploads on good maven central. This is what I found:

1. [`javax.annotation:javax.annotation-api:1.2`](http://search.maven.org/#artifactdetails%7Cjavax.annotation%7Cjavax.annotation-api%7C1.2%7Cjar)
  * **Description:** "Common Annotations for the JavaTM Platform API"
  * **URL (from metadata):** https://jcp.org/en/jsr/detail?id=250
  * **Last updated:** 2013
  * **Main `.jar` filesize:** 42311 bytes
  * **Includes developer in metadata:** Rajiv Mordani, the JSR-250 lead at Sun (and now at Oracle).
2. [`org.glassfish:javax.annotation:10.0-b28`](http://search.maven.org/#artifactdetails%7Corg.glassfish%7Cjavax.annotation%7C10.0-b28%7Cjar)
  * **Description:** "Common Annotations for the JavaTM Platform API version ${spec.version} Repackaged as OSGi bundle in GlassFish"
  * **URL (from metadata):** None
  * **Last updated:** 2011
  * **Main `.jar` filesize:** 20542 bytes
  * **Includes developer in metadata:** No
  * **Notes:**
     - Manifest includes in header: "Copyright 1997-2008 Sun Microsystems, Inc."
     - Lists #3 below as an optional dependency!
     - OSGi ([official site](https://www.osgi.org/developer/architecture/); [Wikipedia](https://en.wikipedia.org/wiki/OSGi)) is a standard for packaging Java components.
3. [`javax.annotation:jsr250-api:1.0`](http://search.maven.org/#artifactdetails%7Cjavax.annotation%7Cjsr250-api%7C1.0%7Cjar)
  * **Description:** "JSR-250 Reference Implementation by Glassfish"
  * **URL (from metadata):** https://jcp.org/aboutJava/communityprocess/final/jsr250/index.html
  * **Last updated:** 2007
  * **Main `.jar` filesize:** 5848 bytes
  * **Includes developer in metadata:** No

According to the [community page](https://jcp.org/en/jsr/detail?id=250) (which is the same URL provided by #1), the original release was in 2006, with maintenance releases in 2009 and 2013 (n.b.: [another maintenance release](https://jcp.org/aboutJava/communityprocess/maintenance/jsr250/JSR-250-MR3-changes.html) is scheduled for next month, Jul 2016!). So it looks like #1, `javax.annotation:javax.annotation-api:1.2` implements the latest version of this spec, whereas #3 implemented the first stable version almost ten years ago.

For what it's worth, I gave all of them a whirl with Dagger and didn't run into any issues. This is a good enough comparison for my purposes short of peeking inside the JARs and comparing them. Since #3 is the smallest and seems to contain the bare minimum necessary for Dagger, I've taken to using that package.

### kotlin-android-extensions

JetBrains' [Kotlin Android Extensions](https://kotlinlang.org/docs/tutorials/android-plugin.html) plugin provides some great features on top of the standard tooling. For those who haven't used it, it can create "synthetic properties" properties from your XML layout files so that you don't need to make `findViewById()` calls and cast them to assign your instance variables. These calls are the bane of Android developers everywhere, many of whom use [ButterKnife](http://jakewharton.github.io/butterknife/) to fight back:

**Traditionally in Java:**

    public class MyActivity extends Activity {

        private TextView mTextView;

        @Override
        public void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_main);
            mTextView = (TextView) findViewById(R.id.textview);

            // Now you can use mTextView:
            mTextView.setText("Hello, reader!");
        }
    }

**With ButterKnife (Still in Java):**

    public class MyActivity extends Activity {
        @BindView(R.id.textview) TextView textView;

        @Override
        public void onCreate(Bundle savedInstanceState) {
        	super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_main);
            ButterKnife.bind(this);

            // Now you can use textView:
            textView.setText("Hello, reader!");
        }
    }

**With kotlin-android-extensions:**

	import kotlinx.android.synthetic.main.activity_main.* // Import all views in R.layout.activity_main

    class MyActivity: Activity() {
    	override fun onCreate(savedInstanceState: Bundle) {
    		super.onCreate(savedInstanceState)
            setContentView(R.layout.activity_main)

            // textview is already available
            textview.text = "Hello, reader!"
    	}
    }

#### Dagger 2.2 Compatibility

Nice, right? _However_, I couldn't for the life of me make my view classes work with *both* Dagger and Kotlin. I started out with an Activity that used Dagger for injecting its presenter. Then, I tried factoring out those pesky `findViewById()` calls and using the synthetic properties directly, only to run into various build errors. Either the compiler couldn't import the synthetic layout "`Unresolved reference kotlinx`," or component classes generated by Dagger "`references unknown class X`," where X is the component interface that Dagger used to generate it. Okay.

This was oft accompanied by the sad error message:

> :app:transformClassesWithNewClassShrinkerForDebug FAILED

> Error:Execution failed for task ':app:transformClassesWithNewClassShrinkerForDebug'.

> Warnings found during shrinking, please use -dontwarn or -ignorewarnings to suppress them.

The fix:

    buildTypes {
    	yourBuildType {
    		// ...
    		minifyEnabled false
    		// ...
    	}
    }

Voila. No more errors. Hope that gets fixed soon, though.

#### Misleading solutions

While trying to fix the problem above, Googling pointed me at fairly recent Stack Overflow answers [like this one](http://stackoverflow.com/a/36526153/4499783) that suggested the following:

1. Move the `buildscript` kotlin classpath dependencies to the app module's `build.gradle` file
2. `apply plugin: 'kotlin-android-extensions'` and add `classpath "org.jetbrains.kotlin:kotlin-android-extensions:$kotlin_version"` in the gradle file

In fact, the [official docs](https://kotlinlang.org/docs/tutorials/android-plugin.html#using-kotlin-android-extensions) do say you need to apply the `kotlin-android-extensions` plugin. We should do this. Better safe than sorry, right?

However, I think it's worth noting that these tips did _not_ fix the conflicts I ran into above with my current setup (Android Studio 2.2-preview3/Dagger 2.2/Kotlin 1.0.2), and that after turning minify off the standard setup (i.e. `buildscript` in project root `build.gradle`; no explicit mention of `kotlin-android-extensions`) everything worked perfectly. Again, this may vary based on what tool versions you are using.

**Update 2016-06-15:** Using Dagger 2.4 did not solve this problem.

### `inject()` requires the *exact* class you're injecting into

Lastly, my "d'oh!" moment.

One of my Activities implemented an interface for interaction with its presenter:

`TimerActivity.kt`:

    class TimerActivity : AppCompatActivity(), TimerContract.TimerView {

    	@Inject
    	override lateinit var presenter: TimerContract.UserActionsListener
    	...
    }

`TimerPresenter.kt`:

	class TimerPresenter
    	@Inject constructor(override var view: TimerContract.TimerView)
    	: TimerContract.UserActionsListener {
    	...
    }

I wanted to inject the presenter in `TimerActivity` using Dagger, so I implemented a module and component for it.

`TimerComponent.kt`:

	import dagger.Component

	@Component(
	        modules = arrayOf(TimerModule::class)
	)
	interface TimerComponent {

	    fun inject(timerView: TimerContract.TimerView)
	}

`TimerActivity.kt`:

    class TimerActivity : AppCompatActivity(), TimerContract.TimerView {

    	@Inject
    	override lateinit var presenter: TimerContract.UserActionsListener
    	...

    	override fun onCreate(savedInstanceState: Bundle) {
    		super.onCreate(savedInstanceState)
    		// Inject away!
    		DaggerTimerComponent.builder()
    			.timerModule(TimerModule(this))
    			.build()
    			.inject(this)
    	}
    }

It type-checks and everything! But `presenter` still wasn't getting injected. Did you see the problem?

Despite `inject()` type checking for a `TimerActivity` that conforms to the `TimerContract.TimerView` interface, it turns out that the method much match the type of the injecting object exactly.

`TimerComponent.kt`:

	import dagger.Component

	@Component(
	        modules = arrayOf(TimerModule::class)
	)
	interface TimerComponent {

	//  fun inject(timerView: TimerContract.TimerView) Nope!
	    fun inject(timerActivity: TimerActivity)	// Yup!
	}

Total noob move, I'm sure, but hey, now I know.


## Helpful Resources

I probably wouldn't have figured out how to make everything work without the help of the following resources -- props to the makers:

* damianpetla's [kotlin-dagger-example](https://github.com/damianpetla/kotlin-dagger-example)
* Google's example [MVP+Dagger architected ToDo App](https://github.com/googlesamples/android-architecture/tree/todo-mvp-dagger)
* soflete's [Android with Dagger](http://soflete.github.io/2016/04/01/Android-MVP-with-Dagger/) example

Thanks for reading, and catch you next time.
