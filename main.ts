// Geoblocking service
//
// Requires origin to be behind Cloudflare
// Modelled after Bluesky's https://bsky.app/ipcc
//
// Age restricted content requires age verification:
// - UK as of 25th July 2025 (https://www.ofcom.org.uk/online-safety/protecting-children/online-age-checks-must-be-in-force-from-tomorrow)

if (import.meta.main) {
  Deno.serve({ port: 54444 }, (request) => {
    const countryCode = request.headers.get("CF-IPCountry");

    const body = JSON.stringify({
      countryCode,
      isAgeRestrictedGeo: countryCode === "GB",
    });

    const header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Access-Control-Allow-Origin", "*");
    header.append("Access-Control-Allow-Headers", "*");

    return new Response(body, {
      headers: header,
    });
  });
}
