---
order: 4
title: Breast screening gateway
image:
  src: /assets/images/gateway-future.png
  alt: Graphic showing the future gateway state
  opengraphImage: true
---

## Connecting hospital machines to the cloud – a new type of infrastructure

In breast screening, we're working to replace the decades-old tech that underpins the entire service. Part of this work will be a major upgrade to how the service connects to the cloud, which will allow easier and quicker data sharing on a national level.

This practical example of reducing fragmentation in the system will have far-reaching consequences for this, and for future services that need a safe way to connect to the cloud.

### We have a 75-piece puzzle

There are 77 breast screening offices (BSOs) across England, which between them have 75 instances of the National Breast Screening Service (NBSS). This software is involved in everything along the breast screening service, including: inviting people to appointments, recording data from mammograms, noting decisions about treatment, and collecting outcomes at various stages.

This fragmentation of data comes at a cost.

![Gateway Now](/assets/images/gateway-now.png)

The current set up with 75 instances of NBSS that run locally, within each secure hospital trust network (represented by grey rectangles).

#### To the participants

If someone moves from one area to another, their screening images don't follow them and have to be requested in a manual process.

#### To the organisation

Making changes, upgrades or security improvements to NBSS means each instance having to be worked on. Duplicating this work 75 times creates stress in workloads, time dependencies and a loss of productivity, plus increased associated costs.

#### To the national programme

Without a straightforward way to join up the data from across the country, it's complicated to get a national picture. Understanding data over time provides powerful insights into how breast cancer is changing, which in turn informs policy and treatment decisions. Understanding this data is one of the most transformative things we can do for helping the NHS move from treatment to prevention, particularly helping identify those experiencing the greatest impact of health inequalities.

### Solving the puzzle: creating one picture

NBSS communicates with mammogram machines, and both the machines and NBSS are inside a hospital trust's network. The network is heavily protected to prevent data from freely entering or leaving – and that includes data from NBSS.

With Rubie, the replacement for NBSS, this will change as it will be online, and in the cloud.

We have been working on a way to allow some data through securely, and we call this a 'gateway'.

Based inside the hospital network, the gateway will open a secure online channel to Rubie. Machines will communicate with the gateway, so for example the mammogram machines will get the list of the day's participants from Rubie. Because it will also be in the cloud, when clinicians add information into Rubie, this will be available to anyone using Rubie – not just those working inside the same hospital.

### One of the biggest changes breast screening has seen

Rubie being cloud-based will enable huge future opportunities for using and interpreting data, including the metadata from X-rays and MRIs. Information from all BSOs can be gathered at a national level more easily and in real time. It reduces reliance on manual (and error prone) processes and will save thousands of hours of productivity. It enables AI readiness and the potential for further improvements to the programme, including connecting to other IT such as GP systems.

![Gateway Future](/assets/images/gateway-future.png)

The future set up with 75 gateways running locally within each secure hospital network, and also connecting to Rubie – one national breast screening service.

### Can we solve other puzzles with this answer?

Solving the problem of getting data out of a hospital trust's network in a secure way for Rubie means that we have also helped solve this problem for other services and users.

This piece of NHS proto-infrastructure can be reused by other teams. It can be considered an '[operating pattern](https://operatingpatterns.org/)', which is a way of working that others can use. By working in the open, we can encourage reuse and reuse saves time, money, risk and reliance on third-party solutions.

When we solve problems [for the NHS by the NHS](/docs/for-the-nhs-by-the-nhs/), we increase our ability to navigate our own complex infrastructure with our own knowledge. Reducing fragmentation benefits all of us.
