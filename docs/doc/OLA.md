---
title: Organizational Level Agreement for api.met.no
date: 2019-12-13
author: Geir Aalberg
layout: post
state:  draft
tags:
  - internal
---

Følgende vilkår gjelder for alle tjenester som ønskes tilgjengeliggjort via
api.met.no og andre tilhørende siter og backender.

Arkitektur
----------

APIet kan levere både statiske og dynamiske data.

### Statiske filer

Statiske data (normalt pregenererte filer) hentes i dag fra opdata, hvor vi
kopierer videre ut til Ares. Filer beholdes normalt i kun tre dager.

Det arbeides med å erstatte opdata med en løsning hvor produsenter pusher filer
direkte til APIet, enten via HTTP eller SSH. Dette ventes på plass i løpet av 2019.

### Proxying mot backend

Dynamiske data må leveres via HTTP fra servere i backend som produsent
selv har ansvaret for. Vi setter opp lastbalansering i APIet og kan gi råd
og krav om hvordan tjenesten settes opp.

Siden proxying mot backend av erfaring produserer ti ganger så mye support som
å serve filer fra opdata vil vi ikke støtte dette for levering av statisk
genererte data.

QA
--

API-ansvarlig kan stille krav til data- og tjenestekvalitet for alle
produkter som ønskes tilgjengeliggjort via api.met.no. Eksempler kan være
dokumentasjon, metadata, validerbarhet, driftsorganisasjon, sikkerhet,
overvåkning osv. Produkter som ikke tilfredsstiller disse vil merkes som
beta eller holdes tilbake.

Følgende krav stilles til alle nye produkter. Dette vil etterhvert utvides
til et eget dokument.

### Redundans

Alle systemer må være reduntante slik at det finnes failover dersom fx et datarom
går ned. For proxying betyr det minst to servere i hvert datarom (lastbalansering
ordner vi). For systemer som produserer filer må det være backup som kan tre inn
dersom den primære slutter å fungere.

### VPN

Alle tilknyttede servere må kunne svare på ping og SSH via VPN, evt også
HTTP for tjenester som skal proxyes.

### Drift

Bygging og deployment skal være automatisert, med versjonskontroll, regresjons-
og unittesting. Utrulling bør skje vha verktøy som Ansible (for Ares) eller
Terraform (for Docker), ikke manuell installasjon.

Det skal være minst to personer som kan drifte backend i tilfelle ferie/sykdom etc.
Kontaktinfo skal kommuniseres til api-ansvarlige.

### Overvåkning

Det må avgjøres om produkter skal være priprod, flexprod eller bare "kjekt å ha".
Kritiske systemer må settes opp med Pagerduty, Team Punkt kan være behjelpelige med dette.

For systemer som produserer filer må det settes opp overvåkning av disse.
Samtidig må det defineres et kriterium for om en tjeneste kan sies å være operativ
eller ikke (typisk stat() av en fil eller katalog). Dette brukes dog av apiet
primært til å vise status, dersom man ønsker å bli varslet ved nedetid må dette
settes opp spesielt.

Det må også settes opp overvåkning av servere slik at de ikke stopper opp pga
full disk, manglende inoder (kjør apt-get autoremove), for høy load eller stale
nfs-monteringer.

Microservices som skal proxyes må kunne angi helsestatus via
[healthz](https://gitlab.met.no/team-punkt/weatherapi3/wikis/Healthz-format).

### Stabilitet

Alle produkter som tilgjengeliggjøres via api.met.no utenom betastatus
forventes å være stabile med mindre driftsproblemer. Endringer i
eksisterende produkter skal varsles brukerne i god tid, minimum én måned i
forveien og lenger dersom det skjer før ferieperioder. Nye produkter kan
normalt legges til uten forhåndsvarsling.

Tidsrom for utrulling
---------------------

For å ha mulighet til å ordne opp i evt feil som måtte oppstå vil utrulling
på produksjonsservere normalt kun på arbeidsdager man-tors mellom 10 og 15.
Unntak fra dette gjelder kun kritisk feilretting av driftsproblemer.

Utrullinger skjer samlet for alle produkter, og det er ikke mulig å
garantere at en viss endring rulles ut på en bestemt dag. Ved kritiske feil
som ikke lett kan fikses med en enkel oppdatering vil eneste umiddelbare
mulighet være å rulle tilbake til forrige versjon av apiet. Deretter vil det
ikke gjøres flere utrullinger inntil feilårsaken er lokalisert og fjernet.

Prosedyre
---------

Utrulling består av flere faser:

- innsjekking av kode, inkl bump av versjon
- kjøring av unittester
- bygging og opplasting av debianpakke
- utrulling på stagingmiljø
- manuell testing av staging
- utrulling i produksjon
- overvåking i grafana o.l. en times tid

Det er ingen garanti for at man greier å fullføre prosedyren samme dag som
man startet, særlig dersom man må involvere eksterne parter i testing mot
staging.

Enkelte av disse stegene kan ta lang tid, fx å fikse unittester som feiler
på byggeserveren. Dersom testene oppdager problemer kan utrulling avbrytes
og utsettes inntil man har lokalisert og fikset feil. Dette kan være snakk
om flere dager.

Garanti
-------

Pga dagens infrastruktur kan det ikke gis noen oppetidsgaranti eller SLA,
men driftsproblemer rettes etter beste evne. Priprod overvåkes kontinuerlig
og kritiske feil fikses asap, flexprod o.a. behandles i arbeidstiden.

Presedens
---------

Siden oppetid på apiet har høyrere prioritet enn tilgjengeliggjøring av nye
tjenester vil ovenstående vilkår ha presedens over hva som evt måtte avtales
i prosjektplanlegging o.l.
