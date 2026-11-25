
import { syncDemoListingsToDatabase } from "@/lib/sync-demo-listings";

async function main() {
  await syncDemoListingsToDatabase();
}

main()
  .then(() => {
    process.stdout.write("Demo listings seeded successfully\n");
  })
  .catch((error) => {
    console.error("Error seeding demo listings:", error);
    process.exitCode = 1;
  });
