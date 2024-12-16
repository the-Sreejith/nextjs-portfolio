// prisma/seed.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const blogPosts= [
  {
      id: '1',
      title: 'Introduction to TypeScript',
      slug: 'intro-typescript',
      category: 'Web Development',
      img:'',
      content:'[{"type":"text","content":"Welcome to my blog!"},{"type":"image","src":"/images/landscape.jpg","alt":"A beautiful landscape"},{"type":"text","content":"Here is some more content after the image."},{"type":"text","content":"TypeScript extends JavaScript by adding type definitions..."}]',
      excerpt: 'Learn the basics of TypeScript and its advantages',
      publishedAt: new Date('2024-01-15'),
      author: 'John Doe',
      tags: 'typescript, programming',
      imageUrl: '/images/typescript-cover.jpg'
  },
  {
      id: '2',
      title: 'Next.js 15 Best Practices',
      slug: 'nextjs-best-practices',
      category: 'Web Development',
      img:'',
      content: '[{"type":"text","content":"Welcome to my blog!"},{"type":"image","src":"/images/landscape.jpg","alt":"A beautiful landscape"},{"type":"text","content":"Here is some more content after the image."},{"type":"text","content":"Explore the latest features and optimization techniques..."}]',
      excerpt: 'Improve your Next.js application performance and structure',
      publishedAt: new Date('2024-02-20'),
      author: 'Jane Smith',
      tags: 'nextjs, web development',
      imageUrl: '/images/nextjs-cover.jpg'
  }
]

const projectsData = [
{
  id: 1,
  title: "Pregsee - Flutter app",
  category: "Mobile App",
  description: "A comprehensive pregnancy tracking and health monitoring mobile application built with Flutter.",
  content:'[{"type":"text","content":"Welcome to my blog!"},{"type":"image","src":"/images/landscape.jpg","alt":"A beautiful landscape"},{"type":"text","content":"Here is some more content after the image."},{"type":"text","content":"TypeScript extends JavaScript by adding type definitions..."}]',
  image: "/project-thumbnails/pregsee.png",
  technologies: "Figma, Flutter, Dart, Firebase",
  githubLink: "https://github.com/sreejithns-2002/pregsee",
  liveLink: "https://pregsee.app"
},
{
  id: 2,
  title: "Hireflex - Landing Page",
  category: "Web Development",
  description: "Landing Page created using Tailwindcss and react for running initial campaingns",
  content :'',
  image: "/project-thumbnails/hireflex.png",
  technologies: "Next.js, React, JavaScript, Tailwind CSS",
  githubLink: "https://github.com/username/flexyhire",
  liveLink: "https://hireflex.vercel.app/"
},
{
  id: 3,
  title: "XDLINX Website",
  category: "Wordpress Development",
  description: "Wordpress website created for leading satalite manufacturing company",
  content :'',
  image: "/project-thumbnails/xdlinx.png",
  technologies: "Wordpress, CMS, Javascript, CSS",
  liveLink: "https://xdlinx.space"
},
{
  id: 4,
  title: "Click Go",
  category: "UI/UX Design",
  description: "Food and ecommerce supplier app prototype created part of a client requirement",
  content :'',
  image: "/project-thumbnails/clickgo.png",
  technologies: "Next.js, Tailwind CSS, Framer Motion",
  liveLink: "https://www.figma.com/proto/NPwLIKgFCogw2agXp9tqBm/Click-Go?node-id=305-1016&node-type=canvas&t=LY3FJubLH9RiuC63-1&scaling=min-zoom&content-scaling=fixed&page-id=7%3A3&starting-point-node-id=302%3A919"
},
]

async function main() {
  await prisma.project.createMany({
    data: projectsData,
  });

  console.log("Database seeded!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

 