// test-buzzsumo.js

// If using Node v18+, fetch is built-in. Otherwise: npm install node-fetch
// const fetch = require("node-fetch");

const readline = require("readline");
const fs = require("fs");

const suggestedKeywords = [
  "Civic Issues",
  "Urban Care",
  "City Services",
  "Public Complaints",
  "Civic Engagement",
  "Smart City",
  "City Development",
  "Potholes",
  "Streetlight Repair",
  "Clean City",
  "Waste Management",
  "Safe Roads",
  "Water Leakage",
  "Green City",
  "FixMyCity",
  "City Maintenance",
  "Urban Solutions",
  "Better Living",
  "Civic Action",
  "Work Schedule",
  "Task Tracking",
];

function promptUserForKeywords() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    console.log("Suggested keywords:");
    suggestedKeywords.forEach((kw, i) => console.log(`${i + 1}. ${kw}`));
    console.log(
      'Type numbers separated by comma (e.g. 1,3,5) or type "all" to select all:'
    );
    rl.question("Your choice: ", (answer) => {
      rl.close();
      let selected = [];
      if (answer.trim().toLowerCase() === "all") {
        selected = suggestedKeywords;
      } else {
        selected = answer
          .split(",")
          .map((x) => suggestedKeywords[parseInt(x.trim(), 10) - 1])
          .filter(Boolean);
      }
      resolve(selected);
    });
  });
}

async function fetchBuzzsumoTrends(topics) {
  if (!topics.length) {
    console.error("No topics selected. Exiting.");
    return;
  }
  const topicParam = encodeURIComponent(topics.join(","));
  const url = `https://app.buzzsumo.com/search/trends?topic=${topicParam}&hours=24&count=24&result_type=trending_now&ignore=false&sort=trending_now&countries=India`;
  try {
    const response = await fetch(url, {
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
          "eyJpdiI6IlJ5c2twVW9FaXlyaExlV1gyU3ZpUXc9PSIsInZhbHVlIjoieHIxVW8zdFFqUVdSRkluZW1CSG50VWtnaFFjYmt0eWIyRy9NMTNqK3RlZDRHYW81ZU11blpEbXk2TWpEdHA2TTVYbUwva1lJaWJxK2lJMzJadzZPbFl4ZlRGMTJLaUlWTFZRRGVnaHE5cVE4U09QOVNrZGE1UGpMOVhVMVUrYTMiLCJtYWMiOiI3YzEwMDk5ZDEyMDgyM2RmMzllNjUzMjk4NzRmNTU1OWI4NDgyNjkxNTc4MzVmYzg0NGYwZWY2MzJjNmMwOTY0IiwidGFnIjoiIn0=",
        cookie:
          "tracking-preferences={%22version%22:1%2C%22destinations%22:{%22Actions%20Google%20Analytic%204%22:true%2C%22Bing%20Ads%22:true%2C%22Facebook%20Pixel%22:true%2C%22FullStory%22:true%2C%22Google%20Analytics%22:true%2C%22Google%20Tag%20Manager%22:true%2C%22Intercom%22:true%2C%22Mixpanel%22:true%2C%22ProfitWell%22:true%2C%22SatisMeter%22:true%2C%22Sentry%22:true%2C%22Visual%20Tagger%22:true}%2C%22custom%22:{%22marketingAndAnalytics%22:true%2C%22advertising%22:true%2C%22functional%22:true}}; optimizelyEndUserId=oeu1758314301350r0.05996484145982384; _gid=GA1.2.1945479234.1758314303; _fbp=fb.1.1758314304164.116493816646944765; first_referrer=; sa-user-id=s%253A0-dd34e426-493c-49a5-7415-dc9813604af6.CCAb%252BL17QQwhPUX66x%252Bqua7od7VTPQ3kexhvq28pI9Q; sa-user-id-v2=s%253A3TTkJkk8SaV0FdyYE2BK9g.MTrN7t0BA46kUgEhgFRYBjIu%252FKtUQUXOKTubfkxVToE; sa-user-id-v3=s%253AAQAKIG_otqssUzY7vYdSHJwKaxYfly4Cx0cE8cFdBhCWgj0_EHwYAiCa8IW8BjoE6C8uW0IEitHA6Q.EfBX6WbAsvw7%252F5FeVMPS6Hhknd%252FQ4eC0P9%252B5gAATIGA; intercom-id-elkzh1cy=5b4ab007-b968-48e9-8368-4b1bbb6eaf3c; intercom-device-id-elkzh1cy=ed616211-a7be-4fa0-9262-cb04fc04d7fe; __stripe_mid=3aa7ea41-c60d-41c8-9335-8703ec5a0e2d54333e; __stripe_sid=e93dca4b-b8bf-4b95-8508-26c99361aa377a6351; session_buzzsumo=Pk9ygD3uVBfw4Eei4T11B7RKs1f0jZjeytU1mvG2; plan_id=9999; ajs_anonymous_id=f325880c-97c0-4be6-bf0a-e400a45be629; ajs_user_id=1668504; ajs_group_id=1668158; fs_uid=#1aXZ#273219b3-468a-4771-ad72-a9a40fa31c76:7058a4dc-d3d9-4aae-bbe3-08c684adc9ec:1758314303966::5#b900dcfb#/1789850318; intercom-session-elkzh1cy=NnYxb1g3ZkFjQUU2amc2NStSdmdBM3VLc2VEVUhaNy9xQTVUUksyaXZPakJjMm5SdnhkUGVEdmRZdThHNU9vSGN0TTlGOHVVMEhodHZaM0xVZUw2WG1GdkZEdHQyRjdoVkxhYTlpVXY5eE09LS1tK1MyTllqZ1l2NmY3NXdsbk1XVFFRPT0=--23aaca49865db375c56a5b07a48efac123b7eecd; _ga=GA1.2.1473900753.1758314303; _gcl_au=1.1.724009325.1758314304.490014871.1758314571.1758315700; fs_lua=1.1758315711474; _uetsid=96696c50959811f0b0a93905c504f007; _uetvid=9669ab20959811f0a74d3d82269118e4; _ga_PSYG33S124=GS2.1.s1758314304$o1$g1$t1758316477$j50$l0$h0; XSRF-TOKEN=eyJpdiI6IlJ5c2twVW9FaXlyaExlV1gyU3ZpUXc9PSIsInZhbHVlIjoieHIxVW8zdFFqUVdSRkluZW1CSG50VWtnaFFjYmt0eWIyRy9NMTNqK3RlZDRHYW81ZU11blpEbXk2TWpEdHA2TTVYbUwva1lJaWJxK2lJMzJadzZPbFl4ZlRGMTJLaUlWTFZRRGVnaHE5cVE4U09QOVNrZGE1UGpMOVhVMVUrYTMiLCJtYWMiOiI3YzEwMDk5ZDEyMDgyM2RmMzllNjUzMjk4NzRmNTU1OWI4NDgyNjkxNTc4MzVmYzg0NGYwZWY2MzJjNmMwOTY0IiwidGFnIjoiIn0%3D",
      },
    });
    if (!response.ok) {
      throw new Error(`❌ Request failed with status: ${response.status}`);
    }
    const data = await response.json();
    fs.writeFileSync(
      "buzzsumo_trends_response.json",
      JSON.stringify(data, null, 2),
      "utf-8"
    );
    console.log("✅ Response saved to buzzsumo_trends_response.json");
    console.log("Open buzzsumo_trends_cards.html to view the results.");
  } catch (err) {
    console.error("❌ Error fetching BuzzSumo trends:", err);
  }
}

async function main() {
  const topics = await promptUserForKeywords();
  await fetchBuzzsumoTrends(topics);
}

main();
