import { db } from "@workspace/db";
import { usersTable, skillsTable, badgesTable, sessionsTable, messagesTable, reviewsTable } from "@workspace/db";

async function seed() {
  console.log("Seeding database...");

  // Clear existing data
  await db.delete(reviewsTable);
  await db.delete(messagesTable);
  await db.delete(sessionsTable);
  await db.delete(badgesTable);
  await db.delete(skillsTable);
  await db.delete(usersTable);

  // Create users
  const users = await db.insert(usersTable).values([
    { name: "Aradhya Negi", email: "aradhya@skillchain.io", bio: "Full-stack developer passionate about EdTech. Love teaching and learning!", location: "Dehradun, India", trustScore: 88, sessionsCompleted: 12 },
    { name: "Anwesha Kundu", email: "anwesha@skillchain.io", bio: "UI/UX Designer & Photography enthusiast. Exchange skills, not money!", location: "Kolkata, India", trustScore: 92, sessionsCompleted: 18 },
    { name: "Aakriti Pathak", email: "aakriti@skillchain.io", bio: "Data scientist who loves to write and speak multiple languages.", location: "Delhi, India", trustScore: 85, sessionsCompleted: 9 },
    { name: "Mohit Kunwar", email: "mohit@skillchain.io", bio: "Music producer and marketing guru. Here to share and grow together.", location: "Mumbai, India", trustScore: 79, sessionsCompleted: 6 },
    { name: "Priya Sharma", email: "priya@skillchain.io", bio: "Graphic designer & illustrator. I can teach Figma and Illustrator!", location: "Bangalore, India", trustScore: 94, sessionsCompleted: 24 },
    { name: "Rahul Verma", email: "rahul@skillchain.io", bio: "Python developer. Looking to learn video editing and music production.", location: "Pune, India", trustScore: 76, sessionsCompleted: 5 },
    { name: "Sneha Joshi", email: "sneha@skillchain.io", bio: "Finance professional and yoga instructor. Knowledge is the best currency.", location: "Ahmedabad, India", trustScore: 91, sessionsCompleted: 15 },
    { name: "Amir Khan", email: "amir@skillchain.io", bio: "Video editor & content creator. Happy to teach video production for coding!", location: "Hyderabad, India", trustScore: 83, sessionsCompleted: 11 },
  ]).returning();

  // Skills for each user
  const skillData = [
    // User 1 - Aradhya
    { userId: users[0].id, name: "React.js", category: "Programming", level: "expert", type: "offered" },
    { userId: users[0].id, name: "Node.js", category: "Programming", level: "advanced", type: "offered" },
    { userId: users[0].id, name: "UI/UX Design", category: "Design", level: "beginner", type: "wanted" },
    { userId: users[0].id, name: "Photography", category: "Photography", level: "beginner", type: "wanted" },

    // User 2 - Anwesha
    { userId: users[1].id, name: "UI/UX Design", category: "Design", level: "expert", type: "offered" },
    { userId: users[1].id, name: "Figma", category: "Design", level: "advanced", type: "offered" },
    { userId: users[1].id, name: "Photography", category: "Photography", level: "advanced", type: "offered" },
    { userId: users[1].id, name: "React.js", category: "Programming", level: "intermediate", type: "wanted" },
    { userId: users[1].id, name: "Python", category: "Programming", level: "beginner", type: "wanted" },

    // User 3 - Aakriti
    { userId: users[2].id, name: "Data Science", category: "Data Science", level: "advanced", type: "offered" },
    { userId: users[2].id, name: "Python", category: "Programming", level: "expert", type: "offered" },
    { userId: users[2].id, name: "French Language", category: "Language", level: "advanced", type: "offered" },
    { userId: users[2].id, name: "Music Production", category: "Music", level: "beginner", type: "wanted" },
    { userId: users[2].id, name: "Video Editing", category: "Video Editing", level: "beginner", type: "wanted" },

    // User 4 - Mohit
    { userId: users[3].id, name: "Music Production", category: "Music", level: "expert", type: "offered" },
    { userId: users[3].id, name: "Digital Marketing", category: "Marketing", level: "advanced", type: "offered" },
    { userId: users[3].id, name: "Guitar", category: "Music", level: "expert", type: "offered" },
    { userId: users[3].id, name: "Python", category: "Programming", level: "intermediate", type: "wanted" },
    { userId: users[3].id, name: "Data Science", category: "Data Science", level: "beginner", type: "wanted" },

    // User 5 - Priya
    { userId: users[4].id, name: "Graphic Design", category: "Design", level: "expert", type: "offered" },
    { userId: users[4].id, name: "Illustration", category: "Design", level: "advanced", type: "offered" },
    { userId: users[4].id, name: "Figma", category: "Design", level: "expert", type: "offered" },
    { userId: users[4].id, name: "Finance", category: "Finance", level: "beginner", type: "wanted" },
    { userId: users[4].id, name: "Digital Marketing", category: "Marketing", level: "intermediate", type: "wanted" },

    // User 6 - Rahul
    { userId: users[5].id, name: "Python", category: "Programming", level: "advanced", type: "offered" },
    { userId: users[5].id, name: "Machine Learning", category: "Data Science", level: "intermediate", type: "offered" },
    { userId: users[5].id, name: "Video Editing", category: "Video Editing", level: "beginner", type: "wanted" },
    { userId: users[5].id, name: "Music Production", category: "Music", level: "beginner", type: "wanted" },

    // User 7 - Sneha
    { userId: users[6].id, name: "Finance Planning", category: "Finance", level: "expert", type: "offered" },
    { userId: users[6].id, name: "Investment Analysis", category: "Finance", level: "advanced", type: "offered" },
    { userId: users[6].id, name: "Yoga & Wellness", category: "General", level: "expert", type: "offered" },
    { userId: users[6].id, name: "Graphic Design", category: "Design", level: "intermediate", type: "wanted" },
    { userId: users[6].id, name: "React.js", category: "Programming", level: "beginner", type: "wanted" },

    // User 8 - Amir
    { userId: users[7].id, name: "Video Editing", category: "Video Editing", level: "expert", type: "offered" },
    { userId: users[7].id, name: "Content Creation", category: "Marketing", level: "advanced", type: "offered" },
    { userId: users[7].id, name: "Adobe Premiere", category: "Video Editing", level: "expert", type: "offered" },
    { userId: users[7].id, name: "Python", category: "Programming", level: "beginner", type: "wanted" },
    { userId: users[7].id, name: "Finance Planning", category: "Finance", level: "intermediate", type: "wanted" },
  ];

  await db.insert(skillsTable).values(skillData);

  // Badges
  const badgeData = [
    { userId: users[0].id, badge: "🌱 New Member" },
    { userId: users[0].id, badge: "⭐ Quick Learner" },
    { userId: users[0].id, badge: "🤝 Trusted Exchanger" },

    { userId: users[1].id, badge: "🌱 New Member" },
    { userId: users[1].id, badge: "🏆 Top Teacher" },
    { userId: users[1].id, badge: "⭐ Quick Learner" },
    { userId: users[1].id, badge: "🤝 Trusted Exchanger" },
    { userId: users[1].id, badge: "🎯 Skill Master" },

    { userId: users[2].id, badge: "🌱 New Member" },
    { userId: users[2].id, badge: "🤝 Trusted Exchanger" },
    { userId: users[2].id, badge: "🎯 Skill Master" },

    { userId: users[3].id, badge: "🌱 New Member" },
    { userId: users[3].id, badge: "⭐ Quick Learner" },

    { userId: users[4].id, badge: "🌱 New Member" },
    { userId: users[4].id, badge: "🏆 Top Teacher" },
    { userId: users[4].id, badge: "⭐ Quick Learner" },
    { userId: users[4].id, badge: "🤝 Trusted Exchanger" },
    { userId: users[4].id, badge: "🎯 Skill Master" },

    { userId: users[5].id, badge: "🌱 New Member" },

    { userId: users[6].id, badge: "🌱 New Member" },
    { userId: users[6].id, badge: "🏆 Top Teacher" },
    { userId: users[6].id, badge: "🤝 Trusted Exchanger" },
    { userId: users[6].id, badge: "🎯 Skill Master" },

    { userId: users[7].id, badge: "🌱 New Member" },
    { userId: users[7].id, badge: "⭐ Quick Learner" },
    { userId: users[7].id, badge: "🤝 Trusted Exchanger" },
  ];

  await db.insert(badgesTable).values(badgeData);

  // Sessions
  const now = new Date();
  const sessions = await db.insert(sessionsTable).values([
    {
      initiatorId: users[0].id, partnerId: users[1].id,
      skillOffered: "React.js", skillRequested: "UI/UX Design",
      scheduledAt: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000), duration: 60, status: "confirmed",
      notes: "Looking forward to learning design principles!"
    },
    {
      initiatorId: users[1].id, partnerId: users[2].id,
      skillOffered: "Figma", skillRequested: "Python",
      scheduledAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000), duration: 90, status: "completed",
      notes: "Great session on Python data structures."
    },
    {
      initiatorId: users[2].id, partnerId: users[3].id,
      skillOffered: "Data Science", skillRequested: "Music Production",
      scheduledAt: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), duration: 60, status: "pending",
      notes: null
    },
    {
      initiatorId: users[0].id, partnerId: users[4].id,
      skillOffered: "Node.js", skillRequested: "Graphic Design",
      scheduledAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000), duration: 60, status: "completed",
      notes: "Awesome session!"
    },
    {
      initiatorId: users[6].id, partnerId: users[0].id,
      skillOffered: "Finance Planning", skillRequested: "React.js",
      scheduledAt: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000), duration: 90, status: "confirmed",
      notes: "Want to build a finance tracker app"
    },
  ]).returning();

  // Messages
  await db.insert(messagesTable).values([
    { senderId: users[1].id, receiverId: users[0].id, content: "Hey Aradhya! I saw you need UI/UX help. I'd love to exchange it for React.js lessons!", read: true },
    { senderId: users[0].id, receiverId: users[1].id, content: "That sounds amazing Anwesha! I've been wanting to learn design for so long.", read: true },
    { senderId: users[1].id, receiverId: users[0].id, content: "Perfect! When are you free this week? I'm flexible.", read: true },
    { senderId: users[0].id, receiverId: users[1].id, content: "How about Wednesday at 6 PM? I'll share my availability on the sessions page.", read: false },

    { senderId: users[4].id, receiverId: users[0].id, content: "Hi! I can teach you Graphic Design basics. Looking to learn Node.js for a project.", read: true },
    { senderId: users[0].id, receiverId: users[4].id, content: "Hi Priya! Let's do it. What's your experience level with backend dev?", read: true },
    { senderId: users[4].id, receiverId: users[0].id, content: "Complete beginner with Node.js. But I know HTML/CSS well.", read: false },
  ]);

  // Reviews
  await db.insert(reviewsTable).values([
    {
      reviewerId: users[1].id, revieweeId: users[0].id,
      rating: 5, comment: "Aradhya is an amazing React teacher! Patient, thorough, and really knows his stuff. Highly recommend!",
      skillExchanged: "React.js"
    },
    {
      reviewerId: users[4].id, revieweeId: users[0].id,
      rating: 5, comment: "Excellent Node.js session. Clear explanations and great practical examples. Will definitely exchange again!",
      skillExchanged: "Node.js"
    },
    {
      reviewerId: users[2].id, revieweeId: users[1].id,
      rating: 5, comment: "Anwesha's Figma skills are top-notch. She made design feel so accessible. Best skill exchange I've had!",
      skillExchanged: "Figma"
    },
    {
      reviewerId: users[0].id, revieweeId: users[4].id,
      rating: 5, comment: "Priya is a fantastic design teacher. Creative, inspiring and very patient. My UI skills improved dramatically!",
      skillExchanged: "Graphic Design"
    },
    {
      reviewerId: users[5].id, revieweeId: users[2].id,
      rating: 4, comment: "Aakriti's data science knowledge is impressive. Great session on machine learning basics.",
      skillExchanged: "Data Science"
    },
  ]);

  console.log("✅ Database seeded successfully!");
  console.log(`   ${users.length} users created`);
  console.log(`   ${skillData.length} skills added`);
  console.log(`   ${sessions.length} sessions booked`);
  console.log(`   5 reviews added`);

  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
