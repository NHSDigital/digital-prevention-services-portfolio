---
layout: sub-navigation
order: 1
title: Incident management process
sectionKey: docs
---


If your service stops working as intended in production, follow these steps.

## Create a dedicated public Slack channel

- **name it** and prefix it with the word “incident” and the date in YYYY-MM-DD form: `#incident-2025-04-01-invite-downtime`. Use this filename for the incident report too.
- **send invitations**: engineers, PM, DM, clinical safety, upper management, impacted services.
- **announce** the channel in #dpsp-all-hands.

## Form an incident response team 

Self-organise to appoint these roles. 

- **A comms lead**: responsible for communicating and alerts to users and
stakeholders. Usually the delivery manager of the affected service.
- **A tech lead**: responsible for technical direction and communicating to the comms
lead. Usually the tech lead of the affected service.
- **A support lead**: responsible for monitoring user support requests and responding to users.
- **A clinical lead**

If there are multiple affected services, it's up to you how to split things up. If you have separate incident teams, consider having an overall comms lead who co-ordinates across them.

## Start your investigation

Whilst restoring service is the number 1 priority, we must notify the relevant
stakeholders. Use this rule of thumb to triage the incident severity so you can
establish who to contact:

- **P1**: Majority of users of the product are affected.
- **P2**: Some users of the product may be affected.
- **P3**: Users of the product are not directly affected but may be at some point (near miss).
- **Security incident** (not mutually exclusive with the above): follow the instructions in the [Security incident management Confluence page](https://nhsd-confluence.digital.nhs.uk/spaces/DIS/pages/778767672/Security+incident+management).

If in doubt, consult the [NHS England guidance on Priority levels](https://nhsdigitallive.service-now.com/now/nav/ui/classic/params/target/dms_document.do%3Fsys_id%3D10d5fbecc35956106c39935c050131b5). The definition of a P1 incident in that document is

> a significant adverse impact on the provision of the Service to End Users... on the delivery of care to patients/citizens... [or] significant financial loss to the organisation [or data loss or incorrect data being provided].

P2 and P3 moderate “significant” to “moderate” and “minor”. Note that data issues are always P1.

**Know your service tier**, which will determine your SLA. NHS England ranks services on a Gold-Silver-Bronze scale. There is a list in Slack [here](https://screening-discovery.slack.com/archives/CJBBTHWTX/p1763049602409279) (we are seeking a better source). Teams can determine their own service tier. Contact Service Management to do this.

> [!IMPORTANT] Major incidents
> NHS England calls P1 or P2 incidents (defined according to the criteria linked above) **Major incidents**. If this is a Major incident the comms lead must report it to NHS England’s “Service Bridge”. Their contact details are published on page 10 of the [Service Management documentation](https://nhsdigitallive.service-now.com/now/nav/ui/classic/params/target/%24viewer.do%3Fsysparm_stack%3Dno%26sysparm_sys_id%3Da76b63e4fb465e50ecbef3baaeefdc64).
> This is important because Service Bridge can send out “Major Incident Comms” to people who may be affected without being direct users, e.g. Trust CISOs.

## Write everything down as you work

Make a copy of the [incident report template](https://nhs.sharepoint.com/:w:/s/X26_Digital_Prevention_Service/EWUUIs-x8G5IgOegkJ4pgCwB0Szh_vHcNOnF-CQj0MbRmA?e=GWlAyA) and complete the “Overview” section.

- **Store and permission it**:
    - it should be editable by anyone in NHS England
    - it should be stored in the [DPSP Incident Reports](https://nhs.sharepoint.com/:f:/r/sites/X26_Digital_Prevention_Service/Shared%20Documents/DPSP%20Incident%20Reports?csf=1&web=1&e=tYqBT2) folder. Use the same name you used for the Slack channel.
- **Pin the link** in the incident channel
- **Record actions** in the timeline: alerts received, actions taken, communication sent or received, observations. This is invaluable information for troubleshooting, investigating root causes and reviewing our comms.

## Close the incident

Once service is restored,
- **change the status** of the incident in the report 
- **inform stakeholders** on Slack and email if necessary 
- **assign someone to run a retro** and use the retro as a deadline to complete the report.

## The incident retro

Unless the incident was a false alarm or trivial, you must have a retro.

Retros should be run according to the principles of [blameless postmortem](https://www.atlassian.com/incident-management/postmortem/blameless).

During the meeting, read the incident report and listen to feedback to improve the document.

The report template contains questions to guide the conversation. Use them to detail the issue and our response.

List actions to improve the technology, documentation and processes—including this guidance. Assign tickets for each action in the most relevant team backlog. They should then be prioritised depending on the urgency. If necessary, schedule a follow-up.

To propose amendments to this page, [raise a pull request](https://github.com/nhsdigital/digital-prevention-services-portfolio) and/or open a thread in [#dpsp-prof-engineering](https://nhsdigitalcorporate.enterprise.slack.com/archives/C07LGTYKQBH).
