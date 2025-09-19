// test-buzzsumo.js

// If using Node v18+, fetch is built-in. Otherwise: npm install node-fetch
// const fetch = require("node-fetch");

async function testBuzzsumo() {
  try {
    const response = await fetch(
      "https://app.buzzsumo.com/search/trends?topic=Indore+Municipal+Corporation,Civic+,%23CivicIssues++%23UrbanCare++%23CityServices++%23PublicComplaints++%23CivicEngagement++%23SmartCity++%23CityDevelopment++Specific+Problems++%23Potholes++%23StreetlightRepair++%23CleanCity++%23WasteManagement++%23SafeRoads++%23WaterLeakage++%23GreenCity++Action+%2F+Resolution++%23FixMyCity++%23CityMaintenance++%23UrbanSolutions++%23BetterLiving++%23CivicAction++%23WorkSchedule++TaskTracking,CivicIssues,+UrbanCare,+CityServices,+PublicComplaints,+CivicEngagement,+SmartCity,+CityDevelopment,+Potholes,+StreetlightRepair,+CleanCity,+WasteManagement,+SafeRoads,+WaterLeakage,+GreenCity,+FixMyCity,+CityMaintenance,+UrbanSolutions,+BetterLiving,+CivicAction,+WorkSchedule,+TaskTracking&hours=24&count=24&result_type=trending_now&ignore=false&id=158226&sort=trending_now&countries=India",
      {
        method: "GET",
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9,hi;q=0.8",
          "cache-control": "no-cache",
          priority: "u=1, i",
          "sec-ch-ua":
            '"Chromium";v="140", "Not=A?Brand";v="24", "Google Chrome";v="140"',
          "sec-ch-ua-mobile": "?1",
          "sec-ch-ua-platform": '"Android"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest",
          "x-vue-route-name": "discover.trending",
          "x-xsrf-token":
            "eyJpdiI6Iit2MWlvaDNaVEZoaFZtelVRVEhhaGc9PSIsInZhbHVlIjoianozdWliSjdYeXQrOFNFQ1lVd3NMYXBtaTVYUGN2TVNJRk5HaEF6STFCREU0SUNLTmc0ZWxvbm5NSGV0dDkwdmtoVGdNTFhOMXJGSDF4SmkwUFNML0lNRCtXbXZCV1dCSzN3ZEdGd0lEZGZjVklKbTBVZTBFWld3NFBNYW51cGYiLCJtYWMiOiJmMDY2NDNjYjZlY2IyYzdkNmVlOGY3MDBiZDY2NmM2YTA5ZTg5MDM4NDUwNjgxNTRhNDY3NWZiYzljY2NmNTljIiwidGFnIjoiIn0=",
          cookie:
            "tracking-preferences=...; session_buzzsumo=Pk9ygD3uVBfw4Eei4T11B7RKs1f0jZjeytU1mvG2; ...", // shortened for clarity
        },
      }
    );

    if (!response.ok) {
      throw new Error(`❌ Request failed with status: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ BuzzSumo Trends Response:");
    console.dir(data, { depth: null });

    // Store response in a JSON file
    const fs = require("fs");
    fs.writeFileSync(
      "buzzsumo_trends_response.json",
      JSON.stringify(data, null, 2),
      "utf-8"
    );
    console.log("✅ Response saved to buzzsumo_trends_response.json");
  } catch (err) {
    console.error("❌ Error fetching BuzzSumo trends:", err);
  }
}

testBuzzsumo();
