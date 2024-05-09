import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Extract the IP address from X-Forwarded-For, which might contain multiple IPs
  const ipHeader = req.headers.get("X-Forwarded-For");
  const ip = ipHeader?.split(",").shift(); // Gets the first IP in the list

  console.log("Client IP:", ip);

  let city = req.geo?.city;

  if (!city && ip) {
    // Use HTTPS and handle potential errors in the fetch operation
    try {
      const response = await fetch(`https://ip-api.com/json/${ip}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const loc = await response.json();
      city = loc.city;
    } catch (error) {
      console.error("Error fetching IP info:", error);
      //   return NextResponse.json({
      //     error: "Error fetching location information",
      //   });
    }
  }

  const { restaurants }: { restaurants: string[] } = body;

  return NextResponse.json({
    // Dummy data for demonstration purposes
    // turn each restaurant name into a key-value pair
    // with the value being a random boolean
    ...restaurants.reduce((acc, restaurant) => {
      //@ts-ignore
      acc[restaurant] = Math.random() < 0.5;
      return acc;
    }, {}),
  });
}
