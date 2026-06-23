export async function createGHLContact(data: {
  name: string;
  email: string;
  phone: string;
  propertyType: string;
  budget?: string;
  message?: string;
}) {
  try {
    const [firstName, ...rest] = data.name.split(" ");

    const response = await fetch(
      "https://services.leadconnectorhq.com/contacts/",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GHL_API_KEY}`,
          Version: "2021-07-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          locationId: process.env.GHL_LOCATION_ID,

          firstName,
          lastName: rest.join(" "),

          email: data.email,
          phone: data.phone,

          tags: ["Website Lead", "real estate"],

          customFields: [
            {
              key: "service_needed",
              fieldValue: data.propertyType,
            },
            {
              key: "monthly_marketing_budget",
              fieldValue: data.budget || "",
            },
            {
              key: "currently_facing_challenge_in_marketing_efforts",
              fieldValue: data.message || "",
            },
          ],
        }),
      }
    );

    const result = await response.json();

    console.log("GHL Status:", response.status);
    console.log("GHL Contact Created:", result);

    return result;
  } catch (error) {
    console.error("GHL Error:", error);
    return null;
  }
}