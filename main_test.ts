import { assertEquals } from "@std/assert";
import { handler } from "./main.ts";

function request(country: string | null): Request {
  const headers = new Headers();
  if (country !== null) headers.set("CF-IPCountry", country);
  return new Request("http://localhost/", { headers });
}

Deno.test("flags GB as an age-restricted geo", async () => {
  const res = handler(request("GB"));
  assertEquals(res.headers.get("Content-Type"), "application/json");
  assertEquals(res.headers.get("Access-Control-Allow-Origin"), "*");
  assertEquals(await res.json(), {
    countryCode: "GB",
    isAgeRestrictedGeo: true,
  });
});

Deno.test("does not flag other countries", async () => {
  assertEquals(await handler(request("US")).json(), {
    countryCode: "US",
    isAgeRestrictedGeo: false,
  });
});

Deno.test("handles a missing CF-IPCountry header", async () => {
  assertEquals(await handler(request(null)).json(), {
    countryCode: null,
    isAgeRestrictedGeo: false,
  });
});
