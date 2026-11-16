---
title: "Finding a website's hidden paths without knocking on its door"
date: "2026-11-17"
description: "When you start looking at a website for security testing or a bug bounty, one of the first questions is simple: what's actually on this site?"
tags: ["bugbounty", "recon", "infosec", "osint", "cybersecurity"]
---

When you start looking at a website for security testing or a bug bounty, one of the first questions is simple: what's actually on this site?

The homepage and the links you can click are only part of it. Most sites also have old pages, forgotten admin panels, backup files, test folders and subdomains that nobody links to anymore. Many security problems turn up in exactly those places.

The usual way to find them is brute-forcing. You take a huge wordlist and send thousands of requests to the site, guessing paths like `/admin`, `/backup` and `/old`, and you see which ones respond. It works, but it's slow and noisy. It can also get you blocked, and on some programs it isn't allowed at all.

I wanted a quieter way to do this first step, so I built spider.

## The idea

The internet has a long memory. Websites get crawled, archived, scanned and indexed all the time by services that have nothing to do with you. Over the years, those services collect a lot of URLs for almost any domain, including pages the owner may have forgotten about.

spider doesn't guess. It asks those services what they've already seen.

You type in a domain and spider checks several public sources at the same time:

- **The Wayback Machine**, which has been archiving websites for decades
- **Common Crawl**, a huge open dataset of crawled web pages
- **AlienVault OTX**, a threat intelligence platform that records URLs
- **urlscan.io**, where people submit websites to be scanned
- **The site's own robots.txt and sitemaps**, the files a website publishes to tell search engines what to crawl or avoid

spider then combines everything into one clean list with duplicates removed.

## How quiet is it, really?

This was important to me, so here it is plainly. Almost everything spider finds comes from third-party archives and indexes, and none of that touches the target website.

The only time spider talks to the target directly is to read its robots.txt and sitemaps. Those are public files that websites deliberately publish for crawlers, so fetching them is about as normal as web traffic gets. There's no brute-forcing and no guessing.

## What you get back

Results are split into directories, files and subdomains, so you can focus on the part you care about.

Each result also shows which sources reported it. That turned out to be more useful than I expected. If a path shows up in four different sources, it has probably been around for a while and is worth a look. If only one old archive has it, it may be long gone, or it may be something interesting that was quietly removed.

## A few things I cared about while building it

**Speed.** Some of these archives are fast and some are very slow. Instead of making you wait for the slowest one, spider shows results from each source as soon as they arrive, and the list fills in while you watch.

**Reliability.** Public services go down or time out sometimes. If one source fails, spider still gives you everything the others found, so one bad source doesn't ruin the search.

**Easy to use with other tools.** You can view results in the browser or get them as a plain list, one per line, so they're easy to feed into whatever you use next.

**Fair use.** spider is free and public, so it has limits to keep it from being overloaded. Repeated searches for the same domain are also remembered for a while, which makes them faster and saves load on the archive services.

## Where it fits

spider doesn't replace active testing. Think of it as the first look before anything else. You run it before touching the target, and you come away with a map of what's probably out there. After that, you can decide where to spend your time, and you'll often find something interesting without sending any unusual traffic.

## Try it

spider is live here: **https://sachithdh.github.io/spider/**

It's open source too, so you're welcome to look around: **[GitHub repo link]**

One important note: only use spider on domains you own or have permission to test. Even passive recon should stay within the scope you're authorized for.

If you have ideas for other public sources it should check, or something isn't working the way you expect, I'd like to hear about it.

---

Two things to fill in before you post: replace **[GitHub repo link]** with your repo URL, and if there's a real reason you started building spider, add it near the top in a sentence or two. A true personal detail will make the post sound more like you than anything I could write.