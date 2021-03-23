# tracker_status
A tracker status [greasemonkey](https://www.greasespot.net/) user script for [RED](https://redacted.ch) forked from https://greasyfork.org/en/scripts/395736-is-it-down on March 24 2021 (version 0.4.3)

## Installation
Assumming GreaseMonkey extension is installed and active on the browser you are using, go to the [script page](https://github.com/lancerer314/tracker_status/blob/main/IsItDown.user.js) and click on the "raw" button

<img src="media/raw.png" alt="raw button" width="50%"/>

## How does it work

The scripts send a POST request to the [red.trackerstatus.info](https://red.trackerstatus.info/api/) API to retrieve status of the tracker, website,... 
Here is an example of response :
```
{
    "Website": {
        "Status": "1",
        "Latency": "16ms",
        "CurrentUptime": "19955",
        "UptimeRecord": "121077",
        "CurrentDowntime": "0"
    },
    "TrackerHTTP": {
        "Status": "1",
        "Latency": "30ms",
        "CurrentUptime": "29197",
        "UptimeRecord": "83546",
        "CurrentDowntime": "0"
    },
    "TrackerHTTPS": {
        "Status": "1",
        "Latency": "16ms",
        "CurrentUptime": "136",
        "UptimeRecord": "73539",
        "CurrentDowntime": "0"
    },
    "IRC": {
        "Status": "1",
        "Latency": "23ms",
        "CurrentUptime": "29208",
        "UptimeRecord": "369746",
        "CurrentDowntime": "0"
    },
    "IRCTorrentAnnouncer": {
        "Status": "1",
        "Latency": "online",
        "CurrentUptime": "419",
        "UptimeRecord": "59089",
        "CurrentDowntime": "0"
    },
    "IRCUserIdentifier": {
        "Status": "1",
        "Latency": "online",
        "CurrentUptime": "427",
        "UptimeRecord": "306740",
        "CurrentDowntime": "0"
    },
    "tweet": {
        "date": "27th of March 2019",
        "unix": "1553728335",
        "message": "As of 6 hours ago main site and tracker services have been restored."
    }
}
```
