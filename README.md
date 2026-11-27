# RS Live Go

A lightweight static website for live TV channels and live/upcoming sports matches. The project starts with empty JSON data files because no M3U playlist has been supplied.

## Project files

- `index.html`, `style.css`, `app.js` — website
- `data/channels/index.json` — channel data
- `data/matches/index.json` — match data
- `data/channels/example.json` — example channel format (reference only)
- `data/matches/example.json` — example match format (reference only)
- `.github/workflows/validate.yml` — validates JSON after data changes
- `scripts/validate_data.py` — validation script

## Add a channel

Edit `data/channels/index.json` and add an object inside the `channels` array:

```json
{
  "id": "channel-001",
  "name": "Channel Name",
  "category": "Bangla",
  "logo": "https://example.com/logo.png",
  "emoji": "📺",
  "streams": [
    {
      "name": "Main",
      "url": "https://example.com/authorized-stream.m3u8",
      "enabled": true
    }
  ]
}
```

Use a direct image URL for `logo`. A stream URL should be a stream or player URL that you are authorized to use. If no stream is available yet, use an empty `streams` array.

## Add a match

Edit `data/matches/index.json` and add an object inside the `matches` array:

```json
{
  "id": "match-001",
  "teamA": "Team A",
  "teamB": "Team B",
  "teamALogo": "https://example.com/team-a.png",
  "teamBLogo": "https://example.com/team-b.png",
  "category": "Football",
  "tournament": "Tournament Name",
  "status": "upcoming",
  "startTime": "2026-12-01T20:00:00+06:00",
  "endTime": "2026-12-01T22:00:00+06:00",
  "streams": [
    {
      "name": "Main",
      "url": "https://example.com/authorized-stream.m3u8",
      "enabled": true
    }
  ]
}
```

- `status`: `live`, `upcoming`, or `ended`.
- `startTime` and `endTime`: ISO date-time with Bangladesh offset `+06:00`.
- Team logos are optional. Use an empty string if you do not have a logo.
- `streams` can contain multiple authorized stream options. The first enabled stream is used by the player.

## Important notes

1. `index.json` files must remain valid JSON. Do not add comments or trailing commas.
2. Keep the example files as reference; the website reads only the two `index.json` files.
3. The GitHub Action checks JSON structure and stream URL format. It does not discover or create stream links.
4. No M3U playlist is configured. When one becomes available, a playlist import feature can be added separately.
5. This is a static website. To publish it, connect the repository to Cloudflare Pages (Build command: leave blank; output directory: `/` or the repository root). Each committed change will trigger a Pages deployment.
6. Admin Panel is intentionally not included yet. It can be added later to edit the same JSON data.

## Suggested Cloudflare Pages settings

- Framework preset: `None`
- Build command: leave empty
- Build output directory: `/`
- Root directory: `/`
