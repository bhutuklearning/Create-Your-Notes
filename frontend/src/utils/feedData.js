const feedData = [
  {
    id: 1,
    title:
      "Partner Program update: Starting November 1, we're rewarding search traffic",
    excerpt:
      "Traffic is now our #1 priority and we want reward towards the Medium Partner Program to better fit the needs where it...",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800",
    likes: 156,
    comments: 42,
    views: 1200,
    author: "Medium Staff",
    authorImage: "https://via.placeholder.com/40",
    date: "Nov 1, 2024",
    readTime: "5 min read",
    content: `
      <p>Starting November 1st, we're making significant changes to the Medium Partner Program that will benefit all creators.</p>
      
      <h2>What's Changing?</h2>
      <p>Traffic is now our #1 priority and we want to reward writers who bring engaged readers to Medium. This means that articles that generate search traffic will be rewarded more heavily in the Partner Program.</p>
      
      <h2>Why This Change?</h2>
      <p>We've spent over a decade refining Medium to be an extension of your mind. Our goal is to make sure great content gets discovered and writers are fairly compensated for their work.</p>
      
      <p>This update will help us reward writers who create content that attracts new readers to the platform, while still maintaining the quality and depth Medium is known for.</p>
      
      <h2>What This Means For You</h2>
      <p>If you write SEO-friendly, discoverable content, you'll see increased earnings. Focus on topics people are searching for, use clear titles, and create comprehensive guides.</p>
    `,
    tags: ["Writing", "Medium", "Partner Program"],
  },
  {
    id: 2,
    title:
      "Building a Ticketing System: Concurrency, Locks, and Race Conditions",
    excerpt:
      "What happens when TRILLION users try to book the same concert ticket at exactly, Exactly AAAH? Let's design a ticketing system that...",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
    likes: 237,
    comments: 18,
    views: 890,
    author: "Alex Johnson",
    authorImage: "https://via.placeholder.com/40",
    date: "Oct 28, 2024",
    readTime: "8 min read",
    content: `
      <p>Imagine millions of users trying to book the same concert ticket at the exact same moment. What could go wrong? Everything.</p>
      
      <h2>The Problem: Race Conditions</h2>
      <p>When multiple users try to book the last ticket simultaneously, without proper handling, you could end up selling the same ticket twice. This is called a race condition.</p>
      
      <h2>Solution 1: Pessimistic Locking</h2>
      <p>We can use database-level locks to ensure only one transaction can access a ticket at a time. This is safe but can be slow under high load.</p>
      
      <h2>Solution 2: Optimistic Locking</h2>
      <p>Instead of locking, we use version numbers. When updating, we check if the version has changed. If it has, we know someone else modified it first.</p>
      
      <h2>Real-World Implementation</h2>
      <p>Most ticketing systems use a combination of both approaches, along with queuing systems to handle peak traffic. Companies like Ticketmaster process millions of requests per second during major sales.</p>
    `,
    tags: ["Programming", "System Design", "Backend"],
  },
];

export default feedData;