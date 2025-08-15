import { NextResponse } from 'next/server';
import { BlogPost, TagFilter } from '@/types/blog';

// Mock blog data - in a real app, this would come from a database
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: "Understanding GST Compliance: A Complete Guide for Businesses",
    description: "Learn the essential aspects of GST compliance and how to streamline your business processes for better efficiency and accuracy.",
    author: {
      name: "Suvit Team",
      avatar: "/images/img_picture_placeholder_32x32.png"
    },
    date: "2024-01-15",
    tags: ["GST", "Compliance", "Business"],
    image: "/images/img_image.png",
    featured: true
  },
  {
    id: '2',
    title: "Automating Invoice Processing: Best Practices for 2024",
    description: "Discover the latest trends in invoice automation and how AI-powered solutions can revolutionize your accounting workflow.",
    author: {
      name: "Priya Sharma",
      avatar: "/images/img_picture_placeholder_32x32.png"
    },
    date: "2024-01-10",
    tags: ["Automation", "Invoicing", "AI"],
    image: "/images/img_image_2.png",
    featured: false
  },
  {
    id: '3',
    title: "Expense Tracking Made Simple: Tools and Techniques",
    description: "Explore modern expense tracking solutions that help businesses maintain better financial control and transparency.",
    author: {
      name: "Rahul Kumar",
      avatar: "/images/img_picture_placeholder_32x32.png"
    },
    date: "2024-01-08",
    tags: ["Expense Tracking", "Finance", "Tools"],
    image: "/images/img_image_placeholder.png",
    featured: false
  },
  {
    id: '4',
    title: "Digital Transformation in Accounting: What CAs Need to Know",
    description: "Stay ahead of the curve with insights into digital transformation trends affecting the accounting profession.",
    author: {
      name: "Dr. Meera Patel",
      avatar: "/images/img_picture_placeholder_32x32.png"
    },
    date: "2024-01-05",
    tags: ["Digital Transformation", "CA", "Technology"],
    image: "/images/img_image.png",
    featured: false
  },
  {
    id: '5',
    title: "Cloud-Based Accounting Solutions: Benefits and Implementation",
    description: "Learn about the advantages of cloud-based accounting and how to successfully implement these solutions in your practice.",
    author: {
      name: "Suvit Team",
      avatar: "/images/img_picture_placeholder_32x32.png"
    },
    date: "2024-01-03",
    tags: ["Cloud", "Accounting", "Implementation"],
    image: "/images/img_image_2.png",
    featured: false
  },
  {
    id: '6',
    title: "Tax Planning Strategies for Small Businesses",
    description: "Discover effective tax planning strategies that can help small businesses optimize their tax liabilities and improve cash flow.",
    author: {
      name: "Amit Singh",
      avatar: "/images/img_picture_placeholder_32x32.png"
    },
    date: "2024-01-01",
    tags: ["Tax Planning", "Small Business", "Strategy"],
    image: "/images/img_image_placeholder.png",
    featured: false
  },
  {
    id: '7',
    title: "8 Top Open-Source LLMs for 2024 and Their Uses",
    description: "Join us for a full day of events sharing best practices from industry leaders and technology experts.",
    author: {
      name: "Rohit Kadam",
      avatar: "/images/img_picture_placeholder_32x32.png"
    },
    date: "2024-01-15",
    tags: ["AI", "Technology", "LLM"],
    image: "/images/img_image.png",
    featured: false
  },
  {
    id: '8',
    title: "Digital Transformation in Accounting Practices",
    description: "Explore how digital transformation is reshaping the accounting industry and what it means for your practice.",
    author: {
      name: "Priya Sharma",
      avatar: "/images/img_picture_placeholder_32x32.png"
    },
    date: "2024-01-12",
    tags: ["Digital Transformation", "Technology", "Innovation"],
    image: "/images/img_image_2.png",
    featured: false
  },
  {
    id: '9',
    title: "Automated Compliance Reporting: A Complete Guide",
    description: "Learn how to implement automated compliance reporting systems to streamline your regulatory requirements.",
    author: {
      name: "Rajesh Kumar",
      avatar: "/images/img_picture_placeholder_32x32.png"
    },
    date: "2024-01-10",
    tags: ["Compliance", "Automation", "Reporting"],
    image: "/images/img_image_placeholder.png",
    featured: false
  },
  {
    id: '10',
    title: "Financial Planning Strategies for Small Businesses",
    description: "Essential financial planning strategies that can help small businesses grow and succeed in competitive markets.",
    author: {
      name: "Neha Sharma",
      avatar: "/images/img_picture_placeholder_32x32.png"
    },
    date: "2024-01-08",
    tags: ["Financial Planning", "Small Business", "Strategy"],
    image: "/images/img_image_placeholder.png",
    featured: false
  },
  {
    id: '11',
    title: "Digital Banking Solutions for Modern Businesses",
    description: "Explore the latest digital banking solutions and how they can streamline your business financial operations.",
    author: {
      name: "Vikram Singh",
      avatar: "/images/img_picture_placeholder_32x32.png"
    },
    date: "2024-01-06",
    tags: ["Digital Banking", "Technology", "Finance"],
    image: "/images/img_image_placeholder.png",
    featured: false
  },
  {
    id: '12',
    title: "Tax Optimization Techniques for Entrepreneurs",
    description: "Advanced tax optimization techniques that entrepreneurs can use to maximize their business efficiency.",
    author: {
      name: "Anjali Patel",
      avatar: "/images/img_picture_placeholder_32x32.png"
    },
    date: "2024-01-04",
    tags: ["Tax Optimization", "Entrepreneurs", "Strategy"],
    image: "/images/img_image_placeholder.png",
    featured: false
  }
];

const tagFilters: TagFilter[] = [
  { id: 'all', label: "All", active: true },
  { id: 'gst', label: "GST", active: false },
  { id: 'automation', label: "Automation", active: false },
  { id: 'compliance', label: "Compliance", active: false },
  { id: 'technology', label: "Technology", active: false }
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get('tag');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const featured = searchParams.get('featured');

    let filteredPosts = [...blogPosts];

    // Filter by tag
    if (tag && tag !== 'All') {
      filteredPosts = filteredPosts.filter(post => 
        post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
      );
    }

    // Filter by featured
    if (featured === 'true') {
      filteredPosts = filteredPosts.filter(post => post.featured);
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    // Calculate pagination info
    const totalPosts = filteredPosts.length;
    const totalPages = Math.ceil(totalPosts / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    const response = {
      posts: paginatedPosts,
      pagination: {
        currentPage: page,
        totalPages,
        totalPosts,
        hasNextPage,
        hasPrevPage,
        limit
      },
      tagFilters,
      featured: blogPosts.filter(post => post.featured)
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Blog API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}
