---
author: "Ronald Martin"
categories: ["programming", "swift", "ios"]
date: "2017-06-11T13:30:00-07:00"
description: "That happy moment when the API you need already exists"
featured: ""
featuredalt: ""
featuredpath: ""
linktitle: ""
title: "Simple ordinal date queries in Swift"
type: "post"
---

I had a very specific question a while ago:

> When is the next 5th Sunday of the month?

That is, what is the next date which is not only a Sunday, but also the 5th occurrance of Sunday in its enclosing month? 

This only occurs a handful of times in any given year (in the Gregorian calendar): an average of 30 days per month means `30 days/month / 7 days/week = ~4.29 weeks/month`. For there, since each weekday occurs exactly once per week, this then implies that most weekdays will occur _4.29_ times on average per month as well. That little fractional part adds up though, so periodically the calendar will line up such that the "Fifth Sunday" does occur.

I have a recurring appointment on 5th Sundays of the month, but at the time I started scheduling them, couldn't find a good way of knowing when to set reminders. I could leaf through a calendar and look for all the fifth Sundays, I guess. But I write code for fun and profit, so I can automate this, right?

## Building a date query

I sketched out a rough, brute force plan in my head. Loop through months in a calendar, maybe then loop through each Sunday, returning the date if the Sunday was a fifth occurrence. Not the worst thing in the world. But then I looked at the Foundation `Date` API to refine the idea and stumbled upon the obscure [`weekdayOrdinal` property on `NSDateComponents`](https://developer.apple.com/documentation/foundation/nsdatecomponents/1409476-weekdayordinal):

> #### Declaration
> `var weekdayOrdinal: Int { get set }`
>
> #### Discussion
> Weekday ordinal units represent the position of the weekday within the next larger calendar unit, such as the month. For example, 2 is the weekday ordinal unit for the second Friday of the month.

💡💡💡 "Oh, that's exactly what I need!"

We just need to combine this with one of the newer `NSCalendar` functions added in iOS 8 to compute the actual answer we want:

```swift
import Foundation

let now = Date()

var components = DateComponents()
components.weekday = 1          // 1 == Sunday
components.weekdayOrdinal = 5   // 5th occurrence of this weekday

let calendar = Calendar(identifier: .gregorian)
let next5thSunday = calendar.nextDate(after: now, matching: components, matchingPolicy: .strict)

print(next5thSunday)
// "Jul 30, 2017, 12:00 AM"
```

And that's it! Thanks, Foundation engineers!

### Extending past one date

Knowing the next date is useful and answered my original question, but isn't quite enough for all use cases. If you need to query the calendar for multiple dates, iOS 8 also introduced the `NSCalendar` function [`enumerateDates(startingAfter:matching:options:using:)`](https://developer.apple.com/documentation/foundation/nscalendar/1413938-enumeratedates) that calls a closure you provide with each successive query result (synchronously!). The function params are as follows:

* `startingAfter start: Date` - as described by the label, the date at which to start querying the calendar
* `matching components: DateComponents` - the constraints on the query, e.g. for us, '5th Sundays'
* `matchingPolicy: Calendar.MatchingPolicy` - the strategy to use when encountering ambiguous matches, e.g. due to Daylight Saving Time. Possible values can be [found here](https://developer.apple.com/documentation/foundation/calendar.matchingpolicy).
* `using block: (Date?, Bool, inout Bool) -> Void` - the closure that will be called with each matching query result. It takes three params: the first is the matching date, the second is a `Bool` describing whether this is an exact match to your `components` (whether or not this is relevant depends on your `matchingPolicy`), and finally, another `Bool` flag you can use to stop searching for more dates.

You use it like this:

```swift
// Find all the fifth Sundays up through the end of next year (2018).
calendar.enumerateDates(startingAfter: now,
                        matching: components,
                        matchingPolicy: .strict) { 
    date, isExactMatch, shouldStop in
    // I'm only interested in continuing with exact date matches
    guard let date = date, isExactMatch else { return }

    if calendar.component(.year, from: date) <= 2018 {
        print("\(date) is a fifth Sunday")
    } else {
        // Just set the `stop` flag when you're ready to stop the enumeration.
        shouldStop = true
    }
}
print("All done!")

// Prints:
"2017-07-30 07:00:00 +0000 is a fifth Sunday"
"2017-10-29 07:00:00 +0000 is a fifth Sunday"
"2017-12-31 08:00:00 +0000 is a fifth Sunday"
"2018-04-29 07:00:00 +0000 is a fifth Sunday"
"2018-07-29 07:00:00 +0000 is a fifth Sunday"
"2018-09-30 07:00:00 +0000 is a fifth Sunday"
"2018-12-30 08:00:00 +0000 is a fifth Sunday"
"All done!"
```

Sweet!

I have since discovered that Google Calendar now has the ability to create events that recur in this pattern, but now we know how to build something similar ourselves. :)