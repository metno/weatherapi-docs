---
title: Sunrise 3.0
date: 2023-02-21
author: Geir Aalberg
layout: page
parent: Sunrise
grand_parent: Forecasts
toc: 1
tags:
    - reference
    - sunrise
---

## Data format

Details of the GeoJSON format and parameters can be found under [Formats](../formats/SunriseJSON).

## Elevation and azimuth

In version 3 all angles are computed from the disc centre of the target. For
sunrise/set (which nominally indicates when the upper limb crosses the horizon),
the official definition is the moment when the center of the sun is 0.8333
degrees below the horizon. This is an approximation given the average apparent
radius of the sun and average refraction (both which can vary slightly due to
irregular planetary orbits and atmospheric conditions).

## Date start/end times

In contrast to version 2 where the starting point of a given date was computed
from the timezone offset, version 3 instead uses the longitude to compute the
midday point (the time when the sun crosses the meridian). The date interval is
then calculated as the midday point +/- 12 hours, corresponding to the start and
end of the mean solar day.

The reason for this is to fix a bug in version 2, where sunset sometimes came
before sunrise and actually referred to the previous day's sunset. Also,
sometimes user were adding `offset=+00:00` to get UTC timestamps, which resulted
in the start and end times being computed incorrectly.

{:.note}
Since the true solar day (interval between crossings of the antimeridian) is not
a constant 24 hours but [varies by ± 15 min during the year](https://en.wikipedia.org/wiki/Equation_of_time),
the solar midnight sometimes occurs at the start of the mean solar day and other
times at the end. This also means that during transitional periods some solar
midnights will not be included and others reported twice.
Since this can be confusing for users and the usual definition of a "day" starts
from midnight, we have expanded the start/end time to always report the solar
midnight preceeding noon (subsequent solar midnights will be ignored even if
within the stated time period).

## Timezone offset

The optional `offset` parameter is the difference between local time and UTC,
as defined in ISO 8601. This is used mainly for returning timestamps in local
time, but is also used in some instances to calculate the correct date period.

If omitted, all times will be given in UTC.

Presently timezones for the `offset` parameter range from -12:00 to +15:00,
although this may change in the future. For GMT, only +00:00 is allowed.
You can see a list of all current timezones on
[Wikipedia](https://en.wikipedia.org/wiki/List_of_UTC_time_offsets).

### Issues with the International Date Line

Sometimes the International Date Line doesn't follow the 180° meridian, so that
places in the Western hemisphere have a positive timezone offset and vice versa.
Examples include Tonga (which is on 175°W but uses UTC+13), and Attu (172.9°E
and UTC-10, same as Hawaii). In these cases it is mandatory to add the offset
parameter or you will get results for the wrong calendar day.

- [Nukuʻalofa, Tonga](https://api.met.no/weatherapi/sunrise/3.0/sun?lat=-21.133333&lon=-175.2&date=2023-06-01&offset=+13:00) (UTC+13)
- [Attu](https://api.met.no/weatherapi/sunrise/3.0/sun?lat=52.90&lon=172.91&date=2023-06-01&offset=-10:00) (UTC-10)
- [Hawaii](https://api.met.no/weatherapi/sunrise/3.0/sun?lat=-19.57&lon=-155.5&date=2023-06-01&offset=-10:00) (UTC-10)

## Polar regions

Due to Daylight Savings Time, sunsets near polar latitudes sometimes occur after
midnight local time. This can also occur in places where the mean solar time
differs greatly from the local time, e.g. in Western China. By using the mean
solar day as the time period, this is now reported correctly in version 3.

Polar regions also experience periods of midnight sun in summer, as well as
polar nights in winter when the sun doesn't rise over the horizon. In these
cases, the sunrise and/or sunset parameters will return `null`, and the
solarmidnight and solarnoon parameters will show the visible attribute as
true and false respectively.

### Examples

Røst, Norway (CEST in summer, CET in winter)

- [Sunset after midnight](https://api.met.no/weatherapi/sunrise/3.0/sun?lat=67.52&lon=12.1&date=2022-05-25&offset=+02:00)
- [Start of midnight sun](https://api.met.no/weatherapi/sunrise/3.0/sun?lat=67.52&lon=12.1&date=2022-05-29&offset=+02:00)
- [End of midnight sun](https://api.met.no/weatherapi/sunrise/3.0/sun?lat=67.52&lon=12.1&date=2022-07-14&offset=+02:00)
- [Polar night](https://api.met.no/weatherapi/sunrise/3.0/sun?lat=67.52&lon=12.1&date=2023-12-21&offset=+01:00)

## Lunar crossings

Due to the fact that a complete lunar cycle on the sky takes about 24 hours and 50 minutes,
there are days (around the full moon) when the moon doesn't cross the meridian.
In this case the `high_moon` values will return null`. Similar event will occur
around the new moon (no crossing of antimeridian), as well as missing moonsets
and moonrises.

### Examples

- [London, no meridian crossing](https://api.met.no/weatherapi/sunrise/3.0/moon?date=2022-12-08&lat=51.477&lon=-0.001&offset=%2B00%3A00)
- [London, no antimeridian crossing](https://api.met.no/weatherapi/sunrise/3.0/moon?date=2022-12-23&lat=51.477&lon=-0.001&offset=%2B00%3A00)

## Additional notes

### Calculating the sun and moon elevations for a given time

As the sun elevation describes an almost perfect sine curve on the sky,
the position at a given time can be calculated from the four fixed points
given in the `sunrise`, `solarnoon`, `sunset` and `solarmidnight` elements.
Similarly, the `moonrise`, `high_moon`, `moonset` and `low_moon` elements
can be used to calculate moon elevation. If any of the elements are missing,
it means the object is not visible or does not go below the horizon.

You can download a [PDF document](/doc/assets/PoleSunZenith.pdf) explaining
the formulas in detail.

### Sources

The source code for Sunrise 3.0 is available on [GitHub](https://github.com/metno/celestial)
under a GPL license.

Sunrise 3 uses the [Skyfield](https://rhodesmill.org/skyfield/almanac.html) Python
library for the calculations. If you have more advanced needs than is covered by
this service we recommend downloading this or a similar library and do your
calculations locally.