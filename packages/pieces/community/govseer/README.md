# Govseer piece for Activepieces

The [Govseer](https://govseer.com) piece for [Activepieces](https://www.activepieces.com). Send a safety data sheet (PDF) and get back what a seller needs from it, each answer citing the rule it comes from.

## Install

In a self-hosted Activepieces, open **Settings → My Pieces → Install Piece** and enter `@govseer/piece-govseer`.

## Actions

- **Get EU CLP Label**: the label elements an online listing must show (pictograms, signal word, hazard and precautionary statements in their official wording, the "Contains" line), in any of the 24 EU languages, with what the sheet leaves open.
- **Get Marketplace Hazard Fields**: the hazard fields bol.com, eBay and Amazon EU ask sellers for.
- **Get Shipping Fields**: UN number, proper shipping name, hazard class and packing group from section 14, with the US ground limited quantity rule.
- **Check Against OSHA HCS and WHMIS**: what the sheet lacks under OSHA HCS 2024 and Canada's WHMIS, with the rule behind each gap.
- **Get Upcoming Rule Changes**: dated rule changes ahead for EU CLP, OSHA HCS, WHMIS, Quebec French labels, CPSC eFiling and Amazon dangerous goods, each with its official source.
- **Custom API Call**: any other [Govseer API](https://govseer.com/docs/api) endpoint.

The piece can also be used as a tool by an AI agent.

## Connection

1. Sign in at [govseer.com](https://govseer.com) and open your account page.
2. Under **API keys**, create a key and copy it. It is shown once.
3. In Activepieces, create a **Govseer** connection and paste the key.

A free plan is available. Plans and limits: [govseer.com/docs/api](https://govseer.com/docs/api). Each sheet counts once against your monthly allowance, whatever the number of languages. Sheets are read once and not stored.

The results are a tool, not legal advice. Support: [govseer.com/support](https://govseer.com/support)

## Version history

- 0.0.1: first release.
