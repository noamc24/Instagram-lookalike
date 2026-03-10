const bcrypt = require("bcryptjs");
const User = require("./models/userModel");
const Post = require("./models/postModel");
const Story = require("./models/storyModel");

async function seedData() {
  try {
    const usersCount = await User.countDocuments();
    const postsCount = await Post.countDocuments();
    const storiesCount = await Story.countDocuments();

    if (usersCount > 0 || postsCount > 0 || storiesCount > 0) {
    console.log("⏭️ Seed skipped - database already has data");
    return;
    }
    console.log("🌱 Seeding demo users and posts...");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("123456", salt);

    const demoUsers = await User.insertMany([
      {
        username: "noam_demo",
        fullName: "Noam Demo",
        email: "noamdemo@example.com",
        password: hashedPassword,
        profilePic: "/assets/Photos/prfl1.png",
        followers: [],
        following: ["ron_demo", "itzik_demo", "unreal_news", "sultan_demo"]
      },
      {
        username: "ron_demo",
        fullName: "Ron Demo",
        email: "rondemo@example.com",
        password: hashedPassword,
        profilePic: "/assets/Photos/prfl6.png",
        followers: ["noam_demo"],
        following: ["sultan_demo", "noam_demo"]
      },
      {
        username: "itzik_demo",
        fullName: "Itzik Demo",
        email: "itzikdemo@example.com",
        password: hashedPassword,
        profilePic: "/assets/Photos/prfl7.png",
        followers: ["noam_demo"],
        following: ["ron_demo", "sultan_demo"]
      },
      {
        username: "unreal_news",
        fullName: "Unreal News Demo",
        email: "unrealdemo@example.com",
        password: hashedPassword,
        profilePic: "/assets/Photos/prfl3.png",
        followers: ["noam_demo"],
        following: ["noam_demo", "sultan_demo"]
      },
      {
        username: "sultan_demo",
        fullName: "Sultan Demo",
        email: "sultandemo@example.com",
        password: hashedPassword,
        profilePic: "/assets/Photos/prfl2.png",
        followers: ["noam_demo", "ron_demo", "itzik_demo", "unreal_news"],
        following: []
      }
    ]);

    const noamUser = demoUsers.find((u) => u.username === "noam_demo");
    const ronUser = demoUsers.find((u) => u.username === "ron_demo");
    const itzikUser = demoUsers.find((u) => u.username === "itzik_demo");
    const unrealUser = demoUsers.find((u) => u.username === "unreal_news");
    const sultanUser = demoUsers.find((u) => u.username === "sultan_demo");

const now = new Date();

await Post.insertMany([
  {
    userId: unrealUser._id,
    username: unrealUser.username,
    profilePic: unrealUser.profilePic,
    caption: "Every once in a while, a young developer appears who combines technical ability with the kind of mindset companies are constantly searching for: disciplined, curious, and driven to solve real problems. As the tech industry looks toward its next wave of talent, he’s quickly emerging as a developer worth watching. His name is Noam, and he’s building something special. With a background in software engineering and a passion for creating seamless user experiences, Noam has been making waves in the developer community. His latest project, FinalIg, is a testament to his skills and vision. if you’re looking for a developer who can bring innovative ideas to life, DO NOT let this opportunity slip away.",
    mediaUrl: "/assets/Photos/post5.png",
    mediaType: "image",
    likes: [noamUser._id],
    comments: [],
    createdAt: new Date(now.getTime() + 5000)
  },
  {
    userId: noamUser._id,
    username: noamUser.username,
    profilePic: noamUser.profilePic,
    caption: "Welcome to FinalIg 🚀 First demo post is live!",
    mediaUrl: "/assets/Photos/post1.png",
    mediaType: "image",
    likes: [ronUser._id, sultanUser._id],
    comments: [
      {
        userId: ronUser._id,
        username: ronUser.username,
        text: "Nice project!"
      }
    ],
    createdAt: new Date(now.getTime() + 4000)
  },
  {
    userId: itzikUser._id,
    username: itzikUser.username,
    profilePic: itzikUser.profilePic,
    caption: "Another day, another post 😎",
    mediaUrl: "/assets/Photos/post4.png",
    mediaType: "image",
    likes: [noamUser._id, ronUser._id],
    comments: [],
    createdAt: new Date(now.getTime() + 3000)
  },
  {
    userId: ronUser._id,
    username: ronUser.username,
    profilePic: ronUser.profilePic,
    caption: "Testing the feed UI and it already looks smooth 👌",
    mediaUrl: "/assets/Photos/post3.png",
    mediaType: "image",
    likes: [noamUser._id],
    comments: [],
    createdAt: new Date(now.getTime() + 2000)
  },
  {
    userId: sultanUser._id,
    username: sultanUser.username,
    profilePic: sultanUser.profilePic,
    caption: "Demo content for anyone cloning the project 🔥",
    mediaUrl: "/assets/Photos/post2.png",
    mediaType: "image",
    likes: [noamUser._id, ronUser._id, itzikUser._id],
    comments: [],
    createdAt: new Date(now.getTime() + 1000)
  }
]);
await Story.insertMany([
  {
    username: "unreal_news",
    profilePic: "/assets/Photos/prfl3.png",
    mediaUrl: "/assets/Photos/story3.png",
    mediaType: "image",
    caption: "Breaking story 📰",
    duration: 5000,
    createdAt: new Date(now.getTime() + 5000)
  },
  {
    username: "noam_demo",
    profilePic: "/assets/Photos/prfl1.png",
    mediaUrl: "/assets/Photos/story2.png",
    mediaType: "image",
    caption: "Building FinalIg 🚀",
    duration: 5000,
    createdAt: new Date(now.getTime() + 4000)
  },
  {
    username: "itzik_demo",
    profilePic: "/assets/Photos/prfl7.png",
    mediaUrl: "/assets/Photos/story1.png",
    mediaType: "image",
    caption: "Another clean story 😎",
    duration: 5000,
    createdAt: new Date(now.getTime() + 3000)
  },
  {
    username: "ron_demo",
    profilePic: "/assets/Photos/prfl6.png",
    mediaUrl: "/assets/Photos/story4.png",
    mediaType: "image",
    caption: "Almog and i having fun 👌",
    duration: 5000,
    createdAt: new Date(now.getTime() + 2000)
  },
  {
    username: "sultan_demo",
    profilePic: "/assets/Photos/prfl2.png",
    mediaUrl: "/assets/Photos/story4.png",
    mediaType: "image",
    caption: "Ron and i having fun",
    duration: 5000,
    createdAt: new Date(now.getTime() + 1000)
  }
]);

    console.log("✅ Demo users and posts created successfully");
  } catch (error) {
    console.error("❌ Seed error:", error);
  }
}

module.exports = seedData;