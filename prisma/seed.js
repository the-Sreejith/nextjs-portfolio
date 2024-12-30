// prisma/seed.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const blogPosts = [
  {
    "slug": "my-journey-in-tech",
    "title": "My Journey in Tech: Passion, Setbacks, and Lessons Learned",
    "category": "Personal Growth",
    "featured": true,
    "img": "/blog/journey-in-tech.png",
    "content":JSON.stringify( [
      {
        "type": "title",
        "content": "My Journey in Tech: Passion, Setbacks, and Lessons Learned"
      },
      {
        "type": "image",
        "src": "/images/journey-thumbnail.jpg",
        "alt": "Thumbnail image representing the journey"
      },
      {
        "type": "text",
        "content": "From a very early age, I was fascinated by technology. I loved tinkering with gadgets and figuring out how things worked. This curiosity quickly grew into a passion for creating. I taught myself programming through YouTube and other online resources, spending countless hours experimenting and learning. At just 17 years old, I built my first app: a simple QR code scanner and generator with a database to store scanning history. The joy of creating something functional and useful was unparalleled."
      },
      {
        "type": "text",
        "content": "This love for building led me to create a profile on Upwork, a freelancing platform. What started as a way to make some extra money turned out to be a significant turning point in my life. Through freelancing, I gained valuable experience building Flutter apps and websites for clients. I upskilled rapidly, diving deep into app development and learning the intricacies of creating user-friendly solutions. This was all before I even started college."
      },
      {
        "type": "text",
        "content": "During this time, I embarked on one of my most ambitious projects: Pregsee. Pregsee was a comprehensive Flutter mobile app designed to provide dynamic content, video courses, quizzes, interactive and seamless UI, authentication, user profiles, and data collection. It was a one-person project, and I handled everything from design to backend functionality. This project was a testament to my skills and determination. However, things took a different turn when I began college."
      },
      {
        "type": "title",
        "content": "The College Years"
      },
      {
        "type": "text",
        "content": "Like many, I entered college hoping it would be the launchpad for my career as a software engineer. Unfortunately, it didn’t turn out that way. The excessive workload of assignments, records, and other academic tasks left me with little time to focus on freelancing or personal projects. I had to give up freelancing entirely. Instead of fostering my growth, college felt like a weight holding me back."
      },
      {
        "type": "title",
        "content": "The Aftermath"
      },
      {
        "type": "text",
        "content": "After four years, I graduated and started applying for jobs, but I faced an unexpected challenge. My previous projects, which I had poured my heart and soul into, were no longer relevant. The apps I created had been removed from the Play Store due to lack of maintenance, and the websites I built had been updated or replaced. Additionally, the tech landscape had shifted significantly. Frameworks I once mastered had evolved or been replaced entirely, and the rapid rise of AI further transformed the industry. It felt like everything I had worked so hard for was gone."
      },
      {
        "type": "title",
        "content": "A Hard Lesson Learned"
      },
      {
        "type": "text",
        "content": "This period of my life taught me a valuable lesson: if you don’t maintain something, you’re going to lose it. Whether it’s apps, skills, or relationships, consistent effort and maintenance are crucial to ensure longevity and relevance. This realization has reshaped my approach to work and life. I now prioritize adaptability, staying updated with industry trends, and ensuring that I don’t let my skills or projects fall by the wayside."
      },
      {
        "type": "title",
        "content": "Moving forward"
      },
      {
        "type": "text",
        "content": "While the setbacks were discouraging, they also fueled my determination to make a comeback. Technology is ever-evolving, and so am I. My passion for building remains unwavering, and I’m committed to learning, growing, and creating impactful solutions that stand the test of time."
      },
      {
        "type": "text",
        "content": "To those starting their journey in tech: keep building, keep learning, and always stay adaptable. Remember, it’s not just about creating—it’s about sustaining and evolving with the world around you."
      }
    ]),
    "excerpt": "A story of passion, perseverance, and the lessons learned through setbacks in the tech world.",
    "publishedAt": new Date("2024-01-15"),
    "author": "Sreejith Sreejayan",
    "tags": "technology, personal growth, programming",
    "imageUrl": "/images/journey-in-tech-cover.jpg"
  }

]

const projectsData = [
  {
    id: 1,
    title: "Pregsee - Flutter app",
    category: "Mobile App",
    description: "A comprehensive pregnancy tracking and health monitoring mobile application built with Flutter.",
    content: '[{"type":"text","content":"Welcome to my blog!"},{"type":"image","src":"/images/landscape.jpg","alt":"A beautiful landscape"},{"type":"text","content":"Here is some more content after the image."},{"type":"text","content":"TypeScript extends JavaScript by adding type definitions..."}]',
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
    content: '',
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
    content: '',
    image: "/project-thumbnails/xdlinx.png",
    technologies: "Wordpress, CMS, Javascript, CSS",
    liveLink: "https://xdlinx.space"
  },
  {
    id: 4,
    title: "Click Go",
    category: "UI/UX Design",
    description: "Food and ecommerce supplier app prototype created part of a client requirement",
    content: '',
    image: "/project-thumbnails/clickgo.png",
    technologies: "Next.js, Tailwind CSS, Framer Motion",
    liveLink: "https://www.figma.com/proto/NPwLIKgFCogw2agXp9tqBm/Click-Go?node-id=305-1016&node-type=canvas&t=LY3FJubLH9RiuC63-1&scaling=min-zoom&content-scaling=fixed&page-id=7%3A3&starting-point-node-id=302%3A919"
  },
]

const blah = [{ "id": 3, "title": "XDLINX Website", "category": "Wordpress Development", "description": "Wordpress website created for leading satalite manufacturing company", "content": "[   {     \"type\": \"title\",     \"content\": \"Overview\"   },   {     \"type\": \"text\",     \"content\": \"XD Linx Space is a pioneering company specializing in building advanced satellites. The challenge was to create a visually appealing and functional WordPress website that would reflect the company’s innovative spirit while maintaining a professional aesthetic.\"   },   {     \"type\": \"title\",     \"content\": \"Development Challenge\"   },   {     \"type\": \"text\",     \"content\": \"The main development challenge was achieving pixel-perfect design alignment across various devices and browsers. This required extensive customization of WordPress themes to ensure all design elements matched the company’s vision.\"   },   {     \"type\": \"title\",     \"content\": \"Solution\"   },   {     \"type\": \"text\",     \"content\": \"To overcome the design challenges, I employed custom CSS and JavaScript within the WordPress framework. By meticulously tweaking stylesheets and adding custom scripts, I ensured that the website adhered to modern design principles and was fully responsive.\"   },   {     \"type\": \"title\",     \"content\": \"Outcome\"   },   {     \"type\": \"text\",     \"content\": \"The website for XD Linx Space successfully captured the company’s brand identity while providing a seamless user experience. The use of custom code allowed for precise design implementation, enhancing the overall professionalism and usability of the site.\"   } ]", "image": "/project-thumbnails/XDlinx.png", "featured": true, "technologies": "Wordpress, CMS, Javascript, CSS", "githubLink": null, "liveLink": "https://xdlinx.space", "createdAt": "2024-12-16T17:27:57.827Z", "updatedAt": "2024-12-16T17:27:57.827Z" }, { "id": 4, "title": "Click Go - Figma Prototype", "category": "UI/UX Design", "description": "Food and ecommerce supplier app prototype created part of a client requirement", "content": "[   {     \"type\": \"title\",     \"content\": \"Delivery Mobile App Prototype: A Seamless User Experience Design\"   },   {     \"type\": \"text\",     \"content\": \"This project involved designing a prototype for a delivery mobile app using Figma. The app was conceptualized to offer a streamlined and user-friendly interface for ordering and tracking deliveries in real time.\"   },   {     \"type\": \"title\",     \"content\": \"Design Challenge\"   },   {     \"type\": \"text\",     \"content\": \"The main challenge was to create an intuitive navigation flow that could accommodate multiple user roles, such as customers, delivery agents, and admins, while ensuring a consistent and appealing design across all screens.\"   },   {     \"type\": \"title\",     \"content\": \"Solution\"   },   {     \"type\": \"text\",     \"content\": \"Using Figma, I developed a comprehensive prototype featuring user-friendly interfaces and visually engaging layouts. The design included key features such as a real-time order tracker, an easy checkout process, and a delivery agent dashboard. Interactive components and transitions were added to simulate app functionality during the user testing phase.\"   },   {     \"type\": \"title\",     \"content\": \"Outcome\"   },   {     \"type\": \"text\",     \"content\": \"The prototype received positive feedback for its simplicity and practicality. It served as a valuable blueprint for developers, ensuring efficient implementation of the design. The client appreciated the attention to detail and the seamless navigation experience.\"   } ]", "image": "/project-thumbnails/Clickgo.png", "featured": false, "technologies": "Next.js, Tailwind CSS, Framer Motion", "githubLink": null, "liveLink": "https://www.figma.com/proto/NPwLIKgFCogw2agXp9tqBm/Click-Go?node-id=305-1016&node-type=canvas&t=LY3FJubLH9RiuC63-1&scaling=min-zoom&content-scaling=fixed&page-id=7%3A3&starting-point-node-id=302%3A919", "createdAt": "2024-12-16T17:27:57.827Z", "updatedAt": "2024-12-16T17:27:57.827Z" }, { "id": 2, "title": "Hireflex - Nextjs Landing Page", "category": "Web Development", "description": "Landing Page created using Tailwindcss and react for running initial campaingns", "content": "[   {     \"type\": \"title\",     \"content\": \"Next.js Landing Page: A Modern Web Presence for Enhanced Engagement\"   },   {     \"type\": \"text\",     \"content\": \"This project involved creating a sleek and highly responsive landing page using Next.js. The primary goal was to establish a modern and interactive web presence to captivate visitors and drive engagement.\"   },   {     \"type\": \"title\",     \"content\": \"Development Challenge\"   },   {     \"type\": \"text\",     \"content\": \"The key challenge was to ensure fast loading times, seamless navigation, and precise alignment with the client’s branding requirements. This included implementing advanced animations and dynamic content rendering while keeping performance optimization in focus.\"   },   {     \"type\": \"title\",     \"content\": \"Solution\"   },   {     \"type\": \"text\",     \"content\": \"Using Next.js, I built a server-side rendered (SSR) landing page that optimized both performance and SEO. Custom CSS modules were utilized for styling, while lightweight JavaScript libraries were employed to add interactive elements like animations and carousels. The modular structure of Next.js enabled easy scalability and maintenance.\"   },   {     \"type\": \"title\",     \"content\": \"Outcome\"   },   {     \"type\": \"text\",     \"content\": \"The landing page successfully met the client's expectations, delivering an engaging user experience with blazing-fast load times. It effectively communicated the brand message, attracted significant traffic, and received positive feedback for its modern design and responsiveness.\"   } ]", "image": "/project-thumbnails/Hireflex.png", "featured": true, "technologies": "Next.js, React, JavaScript, Tailwind CSS", "githubLink": "https://github.com/username/flexyhire", "liveLink": "https://hireflex.vercel.app/", "createdAt": "2024-12-16T17:27:57.827Z", "updatedAt": "2024-12-16T17:27:57.827Z" }, { "id": 1, "title": "Pregsee - Flutter app", "category": "Mobile App", "description": "A comprehensive pregnancy tracking and health monitoring mobile application built with Flutter.", "content": "[{\"type\":\"title\",\"content\":\"Overview\"},{\"type\":\"text\",\"content\":\"Pregsee was a mobile application designed to empower expecting mothers by addressing their most pressing concerns during pregnancy. Built with Flutter and Firebase, the app aimed to deliver a seamless and engaging user experience.\"},{\"type\":\"title\",\"content\":\"Collaboration and Expertise\"},{\"type\":\"text\",\"content\":\"We collaborated with some of India’s top gynecologists to curate a highly valuable and credible content library. This partnership ensured that every resource within the app was medically accurate and aligned with the needs of expecting mothers.\"},{\"type\":\"title\",\"content\":\"Features and Functionality\"},{\"type\":\"text\",\"content\":\"1. Video Library: Comprehensive videos addressing common questions and concerns during pregnancy.\"},{\"type\":\"text\",\"content\":\"2. Interactive Quizzes: Educational and engaging quizzes to improve user knowledge.\"},{\"type\":\"text\",\"content\":\"3. Baby Growth Tracker: A simple yet effective tool to track the baby’s development week by week.\"},{\"type\":\"text\",\"content\":\"4. Push Notifications: Timely reminders and personalized tips to keep users informed and engaged.\"},{\"type\":\"title\",\"content\":\"Technical Implementation\"},{\"type\":\"text\",\"content\":\"Flutter: Leveraged for its cross-platform capabilities, allowing the app to run smoothly on both Android and iOS.\"},{\"type\":\"text\",\"content\":\"Firebase: Used for authentication, real-time data syncing, push notifications, and analytics.\"},{\"type\":\"title\",\"content\":\"Outcome and Learnings\"},{\"type\":\"text\",\"content\":\"Although Pregsee was launched with great potential and received initial positive feedback, it unfortunately faced challenges due to insufficient funding. This experience taught me valuable lessons in market analysis, user retention strategies, and the importance of sustainable funding for long-term success.\"}]", "image": "/project-thumbnails/Pregsee.png", "featured": true, "technologies": "Figma, Flutter, Dart, Firebase", "githubLink": "https://github.com/sreejithns-2002/pregsee", "liveLink": "https://pregsee.app", "createdAt": "2024-12-16T17:27:57.827Z", "updatedAt": "2024-12-16T17:27:57.827Z" },]

async function main() {
  await prisma.blogPost.createMany({
    data: blogPosts,
  });

  console.log("Database seeded!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });


