const denyFilter = new RegExp('^(?:mailto\x3A.*|tel\x3A|.*reddit(?:help|blog|inc)?\x2Ecom|.*redd\x2Eit|.*youtube|.*youtu\x2Ebe|.*google\x2Ecom|.*apple\x2Ecom|.*instagram|.*wikipedia\x2E|.*mediawiki\x2Eorg|.*wikimedia|.*wikidata|.*creativecommons.org|.*kickstarter|.*archive\x2Eorg|.*twitter\x2Ecom|.*facebook\x2E|.*spotify|.*telegram|https\x3A\x2F\x2Ft\x2Eme/|.*chrome\x2Egoogle\x2Ecom|.*dailymotion\x2Ecom|.*\x2Fundefined).*');  // Deny list.  Sites matching this regex won't be crawled to

const allowFilter = new RegExp('^(?:https\x3A\x2F\x2F|http\x3A\x2F\x2F)')

// startPage = 'https://en.wikipedia.org/wiki/Special:Random'  //crawl reset page
startPage = 'https://www.reddit.com/r/all/new/.compact?safe=off&include_over_18=on&count=' + Math.floor(Math.random() * 100001)  //crawl reset page
function sleep (seconds) {
    var start = new Date().getTime();
    while (new Date() < start + seconds*1000) {}
    return 0;
}

// Initialze counter to zero if it isn't an int.  Stores in localStorage to persist across pages of the SAME DOMAIN.
count=localStorage.getItem("count");

if (count == null) {
    count=0;
    localStorage.setItem("count", count);
} else {
    count=localStorage.getItem("count");
    count=++count;
    localStorage.setItem("count", count);
}
window.onload = function() {

    // find all links
    var links = [].slice.apply(document.getElementsByTagName('a'));
    links = links.map(function(element) {
        // Return href reference and if html is relative path, it is converted to absolute URL
        var href = element.href;
        var hashIndex = href.indexOf('#');
        if (hashIndex >= 0) {
            href = href.substr(0, hashIndex);
        }
        return href;
    });

    links.sort();

    // Remove duplicates and invalid URLs and denied sites
    var kBadPrefix = 'javascript';
    for (var i = 0; i < links.length;) {
        if (((i > 0) && (links[i] == links[i - 1])) ||
            (links[i] == '') ||
            (kBadPrefix == links[i].toLowerCase().substr(0, kBadPrefix.length)) ||
            (denyFilter.test(links[i].toLowerCase()) == true)  || // not intuitive because it's removing matches, not including them in the links
            (allowFilter.test(links[i].toLowerCase()) == false)){
                links.splice(i, 1);  //remove item if it matches
        } else {
            ++i;
        }
    }
    console.log(links);

    // pick a random link from all the links
    var nextHop = links[Math.floor(Math.random() * links.length) + 1];
    console.log("nexthop " + nextHop);
    console.log("links.length " + links.length )
    
    // reset to a random Wikipedia page if we've been at the same DOMAIN for too long.
    if (count > 5 || links.length == 0 || nextHop == undefined) {
        localStorage.setItem("count", 0);
        window.location=startPage
    } else {
        window.location = nextHop;
    }
}




// // janky failsafe
// sleep(60);
// 
// window.location=startPage
