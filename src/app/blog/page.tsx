'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { BlogPost, TagFilter } from '@/types/blog';

const BlogPage: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [email, setEmail] = useState<string>('');
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [tags, setTags] = useState<TagFilter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const features = [
    { type: 'text', label: 'Client Communication' },
    { type: 'text', label: 'GST automation' },
    { type: 'image', src: '/images/img_tally_solutions.svg', width: 50, height: 24 },
    { type: 'text', label: 'Data-entry Automation' },
    { type: 'image', src: '/images/Frame 2147226223.png', width: 50, height: 50 },
    { type: 'text', label: 'Chanakya AI' },
    { type: 'image', src: '/images/Frame 2147226226.png', width: 50, height: 50 },
    { type: 'image', src: '/images/whatsapp.svg', width: 32, height: 32 },
  ];

  // Fetch blog data from API
  const fetchBlogData = async (selectedTag: string = 'All', page: number = 1) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12', // Fetch 12 posts for 4 rows (3x4)
      });

      if (selectedTag && selectedTag !== 'All') {
        params.append('tag', selectedTag);
      }

      const response = await fetch(`/api/blog?${params}`);

      if (!response.ok) {
        throw new Error('Failed to fetch blog data');
      }

      const data = await response.json();

      setBlogPosts(data.posts);
      // The API provides a separate `featured` array. Let's use the first one.
      if (data.featured && data.featured.length > 0) {
        setFeaturedPost(data.featured[0]);
      } else if (data.posts.length > 0) {
        // Fallback to the first post if no specific featured post is found
        setFeaturedPost(data.posts[0]);
      }
      setCurrentPage(data.pagination.currentPage);
      setTotalPages(data.pagination.totalPages);
      setTags(
        data.tagFilters.map((t: TagFilter) => ({
          ...t,
          active: t.label === selectedTag || (t.id === 'all' && selectedTag === 'All'),
        }))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching blog data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchBlogData();
  }, []);

  const handleTagClick = (tagLabel: string) => {
    setSelectedTag(tagLabel);
    setCurrentPage(1); // Reset to first page when changing tags
    // Update tags active state
    const updatedTags = tags.map((tag) => ({
      ...tag,
      active: tag.label === tagLabel || (tag.id === 'all' && tagLabel === 'All'),
    }));
    setTags(updatedTags);
    fetchBlogData(tagLabel, 1);
  };
  const handleSubscribe = () => {
    console.log('Subscribe with email:', email);
    setEmail('');
  };
  const handleNewsletterSubscribe = () => {
    console.log('Newsletter subscribe with email:', newsletterEmail);
    setNewsletterEmail('');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchBlogData(selectedTag, page);
  };
  return (
    <div className="flex flex-col justify-start items-center w-full bg-global-4">
      {/* Hero Section with Background */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: "url('/images/img_ellipse_903.png')" }}
      >
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[40px]">
          <div className="flex flex-col gap-[72px] sm:gap-[96px] lg:gap-[120px] justify-start items-center w-full py-[60px] sm:py-[80px] lg:py-[120px]">
            {/* Hero Content */}
            <div className="flex flex-col gap-[38px] sm:gap-[48px] lg:gap-[38px] justify-start items-center w-full max-w-[956px] mx-auto">
              <div className="flex flex-col gap-[22px] justify-start items-center w-full">
                <div className="flex flex-col gap-[10px] justify-start items-center w-full">
                  <h1 className="text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-semibold leading-[30px] sm:leading-[40px] md:leading-[50px] lg:leading-[59px] text-center text-global-1 font-inter">
                    Stay Updated with Suvit&apos;s Expert Insights
                  </h1>
                  <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-medium leading-[20px] sm:leading-[23px] lg:leading-[25px] text-center text-global-3 font-inter">
                    Learn about the latest trends in GST, accounting automation, and CA best
                    practices.
                  </p>
                </div>
                {/* Email Subscription */}
                <div className="flex flex-col sm:flex-row justify-center items-center w-full sm:w-[42%] bg-global-4 rounded-[10px] p-[10px] shadow-[0px_1px_1px_#00000026]">
                  <div className="flex justify-start items-center w-full flex-1 py-[10px]">
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-[16px] font-medium leading-[20px] text-center text-global-4 bg-transparent outline-none placeholder:text-global-4 px-[4px]"
                    />
                  </div>
                  <Button
                    onClick={handleSubscribe}
                    className="text-[16px] font-semibold leading-[20px] text-center text-global-5 bg-[linear-gradient(135deg,#1a48d3_0%,_#00b9fe_100%)] rounded-[8px] py-[10px] px-[24px] w-full sm:w-auto mt-2 sm:mt-0"
                  >
                    Subscribe
                  </Button>
                </div>
              </div>
              {/* Tag Filters */}
              <div className="flex flex-col gap-[10px] justify-start items-center w-full max-w-[574px] mx-auto">
                <h2 className="text-[20px] sm:text-[24px] font-semibold leading-[25px] sm:leading-[30px] text-center text-global-1 font-inter">
                  Filters based on tags
                </h2>
                <div className="flex flex-wrap gap-[16px] justify-center items-center w-full">
                  {tags.map((tag, index) => (
                    <React.Fragment key={tag.id}>
                      <button
                        onClick={() => handleTagClick(tag.label)}
                        className={`text-[16px] font-medium leading-[20px] text-center rounded-[8px] py-[4px] px-[16px] transition-all duration-200 ${
                          tag.active
                            ? 'text-button-2 bg-global-4 shadow-[0px_1px_2px_#00000026]'
                            : 'text-global-3 bg-global-5'
                        }`}
                      >
                        {tag.label}
                      </button>
                      {index === 0 && (
                        <div className="w-[2px] h-[20px] bg-global-3 rounded-[1px]" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
            {/* Featured Article */}
            <div className="flex flex-col lg:flex-row justify-start items-stretch w-full gap-0 rounded-[16px] overflow-hidden shadow-lg bg-global-4">
              <div className="w-[10px] h-auto bg-cover bg-center bg-no-repeat lg:block hidden">
                <Image
                  src="/images/img_section_02.png"
                  alt="Section decoration"
                  width={10}
                  height={400}
                  className="w-[10px] h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-[24px] justify-start items-center w-full flex-1 bg-global-4 p-[24px] sm:p-[32px] lg:p-[42px] min-h-[400px]">
                <div className="flex flex-col gap-[16px] justify-start items-start w-full">
                  {loading ? (
                    <div className="w-full flex justify-center items-center py-20">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-global-1"></div>
                    </div>
                  ) : error ? (
                    <div className="w-full text-center py-20">
                      <p className="text-red-500 mb-4">{error}</p>
                      <Button
                        onClick={() => fetchBlogData()}
                        className="bg-global-1 text-white px-6 py-2 rounded-lg"
                      >
                        Try Again
                      </Button>
                    </div>
                  ) : blogPosts.length > 0 ? (
                    <>
                      <h3 className="text-[24px] sm:text-[28px] lg:text-[32px] font-semibold leading-[29px] sm:leading-[34px] lg:leading-[38px] text-left text-global-1 font-inter w-full">
                        {blogPosts[0].title}
                      </h3>
                      <div className="flex flex-wrap gap-[8px] justify-start items-center w-full">
                        {blogPosts[0].tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[16px] font-medium leading-[20px] text-center text-global-3 bg-global-2 rounded-[8px] py-[4px] px-[16px] shadow-[0px_1px_2px_#00000026]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-[16px] font-medium leading-[24px] text-left text-global-3 font-inter w-full">
                        {blogPosts[0].description}
                      </p>
                    </>
                  ) : (
                    <div className="w-full text-center py-20">
                      <p className="text-global-3">No blog posts available</p>
                    </div>
                  )}
                </div>
                {blogPosts.length > 0 && (
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4 sm:gap-0 mt-auto">
                    <div className="flex justify-start items-center w-full">
                      <Image
                        src={blogPosts[0].author.avatar}
                        alt={blogPosts[0].author.name}
                        width={42}
                        height={42}
                        className="w-[42px] h-[42px] rounded-[20px]"
                      />
                      <span className="ml-[16px] text-[16px] font-semibold leading-[20px] text-left text-global-3 font-inter">
                        {blogPosts[0].author.name}
                      </span>
                    </div>
                    <div className="flex justify-end items-center w-auto py-[8px]">
                      <span className="text-[16px] font-medium leading-[20px] text-left text-global-3 font-inter">
                        {blogPosts[0].date}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className="w-full lg:w-[400px] h-[300px] lg:h-[400px] relative">
                <Image
                  src="/images/img_image.png"
                  alt="Featured article"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Blog Posts Grid */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[40px] py-[60px] sm:py-[80px] lg:py-[120px]">
        <div className="flex flex-col gap-[60px] sm:gap-[80px] lg:gap-[120px] justify-start items-center w-full">
          {/* Three Column Blog Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] w-full max-w-[1200px]">
            {loading ? (
              <div className="col-span-full flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-global-1"></div>
              </div>
            ) : error ? (
              <div className="col-span-full text-center py-20">
                <p className="text-red-500 mb-4">{error}</p>
                <Button
                  onClick={() => fetchBlogData()}
                  className="bg-global-1 text-white px-6 py-2 rounded-lg"
                >
                  Try Again
                </Button>
              </div>
            ) : (
              // Display only 3 posts (1 row) with img_placeholder.png
              blogPosts.slice(1, 4).map((post) => (
                <div
                  key={post.id}
                  className="flex flex-col justify-start items-center w-full rounded-[16px] overflow-hidden shadow-lg bg-global-4 h-[520px]"
                >
                  <div className="w-full h-[200px] relative">
                    <Image
                      src="/images/img_placeholder.png"
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-[24px] justify-between items-start w-full bg-global-4 pt-6 px-6 pb-8 sm:p-6 flex-1">
                    <div className="flex flex-col gap-[16px] justify-start items-start w-full">
                      <h4 className="text-[20px] sm:text-[24px] font-semibold leading-8 text-left text-global-1 font-inter w-full line-clamp-2 min-h-[64px]">
                        {post.title}
                      </h4>
                      <p className="text-[16px] font-medium leading-[24px] text-left text-global-3 font-inter w-full line-clamp-3 min-h-[72px]">
                        {post.description}
                      </p>
                    </div>
                    <div className="flex justify-between items-center w-full mt-auto">
                      <div className="flex justify-start items-center w-full">
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          width={32}
                          height={32}
                          className="w-[32px] h-[32px] rounded-[16px]"
                        />
                        <span className="ml-[10px] text-[16px] font-semibold leading-[20px] text-left text-global-1 font-inter">
                          {post.author.name}
                        </span>
                      </div>
                      <div className="flex justify-center items-center w-auto">
                        <span className="text-[16px] font-medium leading-[20px] text-left text-global-3 font-inter whitespace-nowrap">
                          {post.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-[8px] bg-global-1" />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Newsletter Section - Full Width */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat relative overflow-hidden"
        style={{ backgroundImage: "url('/images/img_image_placeholder.png')" }}
      >
        <div className="w-full bg-[linear-gradient(135deg,#1a48d3_0%,_#00b9fe_100%)] bg-opacity-90 p-[32px] sm:p-[48px] lg:p-[54px]">
          <div className="flex flex-col lg:flex-row justify-center items-center w-full max-w-[1200px] mx-auto gap-[32px] lg:gap-0">
            <div className="flex flex-col justify-start items-start w-full lg:w-auto flex-1 ml-0 lg:ml-[14px]">
              <h2 className="text-[32px] sm:text-[36px] lg:text-[40px] font-semibold leading-[39px] sm:leading-[44px] lg:leading-[49px] text-left text-global-5 font-inter">
                Stay Up-to-date!
              </h2>
              <p className="text-[16px] font-normal leading-[24px] text-left text-global-5 font-inter w-full sm:w-[50%] mt-[8px]">
                The industry insights you need delivered to your inbox monthly.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center w-full sm:w-[38%] bg-global-4 rounded-[12px] p-[10px] shadow-[0px_1px_1px_#00000026]">
              <div className="flex justify-start items-center w-full flex-1 py-[10px]">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full text-[16px] font-medium leading-[20px] text-center text-global-4 bg-transparent outline-none placeholder:text-global-4 px-[4px]"
                />
              </div>
              <Button
                onClick={handleNewsletterSubscribe}
                className="text-[16px] font-semibold leading-[20px] text-center text-global-5 bg-[linear-gradient(135deg,#1a48d3_0%,_#00b9fe_100%)] rounded-[8px] py-[10px] px-[24px] w-full sm:w-auto mt-2 sm:mt-0"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid Section - After Newsletter */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[40px] py-[64px]">
        <div className="flex flex-col gap-[48px] justify-start items-center w-full">
          {/* Section Header */}
          <div className="flex flex-col gap-[16px] justify-start items-center w-full">
            <h2 className="text-[32px] sm:text-[36px] lg:text-[40px] font-semibold leading-[39px] sm:leading-[44px] lg:leading-[49px] text-center text-global-1 font-inter">
              Latest Blog Posts
            </h2>
            <p className="text-[18px] font-medium leading-[24px] text-center text-global-3 font-inter max-w-[600px]">
              Discover insights, tips, and best practices from our experts
            </p>
          </div>

          {/* Blog Posts Grid - 4 rows (12 posts) without images */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px] w-full">
            {loading ? (
              // Loading state for 12 cards
              Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-start items-center w-full rounded-[16px] overflow-hidden shadow-lg bg-global-4 animate-pulse"
                >
                  <div className="flex flex-col gap-[32px] justify-between items-start w-full bg-global-4 p-[24px] min-h-[280px]">
                    <div className="flex flex-col gap-[22px] justify-start items-start w-full">
                      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      <div className="flex gap-2">
                        <div className="h-6 bg-gray-200 rounded w-16"></div>
                        <div className="h-6 bg-gray-200 rounded w-16"></div>
                        <div className="h-6 bg-gray-200 rounded w-16"></div>
                      </div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </div>
                    <div className="flex justify-between items-center w-full mt-auto">
                      <div className="flex justify-start items-center w-full">
                        <div className="w-[32px] h-[32px] bg-gray-200 rounded-full"></div>
                        <div className="ml-[10px] h-4 bg-gray-200 rounded w-24"></div>
                      </div>
                      <div className="h-4 bg-gray-200 rounded w-19"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : error ? (
              <div className="col-span-full text-center py-20">
                <p className="text-red-500 mb-4">{error}</p>
                <Button
                  onClick={() => fetchBlogData()}
                  className="bg-global-1 text-white px-6 py-2 rounded-lg"
                >
                  Try Again
                </Button>
              </div>
            ) : (
              // Display 12 blog posts (4 rows of 3 cards each) without images
              blogPosts.map((post, index) => (
                <div
                  key={post.id}
                  className="flex flex-col justify-start items-center w-full rounded-[16px] overflow-hidden shadow-lg bg-global-4 h-[320px]"
                >
                  <div className="flex flex-col gap-[20px] justify-between items-start w-full bg-global-4 pt-6 px-6 pb-8 sm:p-6 flex-1">
                    <div className="flex flex-col gap-[16px] justify-start items-start w-full">
                      <h4 className="text-[20px] sm:text-[24px] font-semibold leading-8 text-left text-global-1 font-inter w-full line-clamp-2 min-h-[64px]">
                        {post.title}
                      </h4>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-[8px] justify-start items-center w-full">
                        <span className="text-[12px] font-medium leading-[15px] text-center text-global-3 bg-gray-100 rounded-[6px] py-[4px] px-[8px]">
                          Tag 1
                        </span>
                        <span className="text-[12px] font-medium leading-[15px] text-center text-global-3 bg-gray-100 rounded-[6px] py-[4px] px-[8px]">
                          Tag 2
                        </span>
                        <span className="text-[12px] font-medium leading-[15px] text-center text-global-3 bg-gray-100 rounded-[6px] py-[4px] px-[8px]">
                          Tag 3
                        </span>
                      </div>
                      <p className="text-[16px] font-medium leading-[24px] text-left text-global-3 font-inter w-full line-clamp-2 min-h-[48px]">
                        {post.description}
                      </p>
                    </div>
                    <div className="flex justify-between items-center w-full mt-auto">
                      <div className="flex justify-start items-center w-full">
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          width={32}
                          height={32}
                          className="w-[32px] h-[32px] rounded-[16px]"
                        />
                        <span className="ml-[10px] text-[16px] font-semibold leading-[20px] text-left text-global-1 font-inter">
                          {post.author.name}
                        </span>
                      </div>
                      <div className="flex justify-center items-center w-auto">
                        <span className="text-[16px] font-medium leading-[20px] text-left text-global-3 font-inter whitespace-nowrap">
                          {post.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-[8px] bg-global-1" />
                </div>
              ))
            )}
          </div>

          {/* Pagination - Mobile Responsive */}
          {!loading && !error && totalPages > 1 && (
            <div className="flex flex-col sm:flex-row justify-center items-center gap-[16px] w-full mt-[32px]">
              <div className="flex justify-center items-center gap-[8px]">
                <Button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="text-[14px] font-medium leading-[18px] text-center text-global-3 bg-global-4 rounded-[8px] py-[8px] px-[12px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </Button>
                <span className="text-[14px] font-medium leading-[18px] text-center text-global-1">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="text-[14px] font-medium leading-[18px] text-center text-global-3 bg-global-4 rounded-[8px] py-[8px] px-[12px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Smart Automation Section */}
      <div className="w-full relative overflow-hidden">
        <div className="relative p-[32px] lg:p-[48px] mb-[32px]">
          {' '}
          {/* reduced padding + margin */}
          <div className="w-full max-w-[1200px] mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-[32px] lg:gap-[64px] rounded-[20px] bg-gradient-to-r from-[#2B56D6] via-[#499EF0] to-[#5CC9FF] p-[32px]">
              {/* Left Side */}
              <div className="flex flex-col gap-[16px] justify-start items-start w-full lg:w-[45%]">
                <h2 className="text-[28px] sm:text-[32px] lg:text-[38px] font-bold leading-[38px] lg:leading-[44px] text-left text-white font-inter">
                  Enjoy the Benefits of Suvit&apos;s Smart <br />
                  Automation Firsthand
                </h2>
                <Button className="group text-[15px] font-semibold leading-[20px] text-center text-white border-2 border-white rounded-[12px] py-[10px] px-[20px] hover:bg-white hover:text-[#1a48d3] transition-all duration-300 shadow-md">
                  <span className="flex items-center gap-[8px]">
                    Explore Insights
                    <Image
                      src="/images/img_arrowright.svg"
                      alt="Arrow right"
                      width={20}
                      height={20}
                      className="w-[20px] h-[20px] group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </span>
                </Button>
              </div>

              {/* Right Side - Circular Orbit */}
              <div className="relative w-full lg:w-[50%] h-[320px] flex justify-center items-center">
                {/* Concentric Circles */}
                <div className="absolute w-[320px] h-[320px] rounded-full bg-white/10"></div>
                <div className="absolute w-[160px] h-[160px] rounded-full bg-white/15"></div>

                {/* Center Logo */}
                <div className="relative w-[80px] h-[80px] bg-white rounded-[16px] shadow-lg flex justify-center items-center">
                  <Image
                    src="/images/img_frame_2147225766.png"
                    alt="Suvit Logo"
                    width={55}
                    height={55}
                  />
                </div>

                {/* Orbiting Features */}
                {[
                  { type: 'image', src: '/images/Frame%202147226223.png', width: 50, height: 50 },
                  { type: 'text', label: 'Chanakya AI' },
                  { type: 'image', src: '/images/Frame%202147226226.png', width: 50, height: 30 },
                  { type: 'text', label: 'Data-entry Automation' },
                  { type: 'image', src: '/images/img_tally_solutions.svg', width: 50, height: 20 },
                  { type: 'text', label: 'GST automation' },
                  { type: 'text', label: 'Client Communication' },
                ].map((item, i, arr) => {
                  const angle = (i / arr.length) * 2 * Math.PI;
                  const radius = 150;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;

                  return (
                    <div
                      key={i}
                      className={`absolute flex items-center justify-center
                  ${item.type === 'text' ? 'bg-white rounded-[10px] shadow-md px-[10px] py-[6px]' : ''}
                `}
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                      }}
                    >
                      {item.type === 'text' ? (
                        <span className="text-[12px] font-semibold text-[#1a48d3] whitespace-nowrap">
                          {item.label}
                        </span>
                      ) : (
                        <Image
                          src={item.src}
                          alt="Feature"
                          width={item.width}
                          height={item.height}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-[linear-gradient(180deg,#ffffff00_0%,_#d5f1ff_100%)] py-[40px]">
        <div className="w-full px-4 sm:px-6 lg:px-[40px]">
          <div className="flex flex-col gap-[6px] w-full">
            {/* Footer Header */}
            <div className="flex flex-col gap-[16px] w-full">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4 sm:gap-0">
                <div className="flex justify-start items-center">
                  <Image
                    src="/images/img_image_2.png"
                    alt="Suvit Logo"
                    width={102}
                    height={32}
                    className="w-[102px] h-[32px]"
                  />
                  <span className="ml-[10px] text-[16px] font-normal leading-[20px] text-global-1 font-inter self-end">
                    Powering CA&apos;s Office
                  </span>
                </div>
                <div className="flex justify-end items-center gap-[10px]">
                  <Image
                    src="/images/img_logo_ins_fill.svg"
                    alt="Instagram"
                    width={30}
                    height={30}
                  />
                  <Image
                    src="/images/img_logo_facebook_fill.svg"
                    alt="Facebook"
                    width={30}
                    height={30}
                  />
                  <Image
                    src="/images/img_logo_linkedin_fill.svg"
                    alt="LinkedIn"
                    width={30}
                    height={30}
                  />
                </div>
              </div>
              <div className="w-full h-[1px] bg-global-2" />
            </div>

            {/* Footer Content */}
            <div className="flex flex-col lg:flex-row justify-between items-start w-full gap-[32px] mb-[14px]">
              {/* Left Column */}
              <div className="flex flex-col gap-[32px] w-full lg:w-[30%]">
                <h3 className="text-[32px] sm:text-[36px] lg:text-[40px] font-medium leading-[44px] text-global-2 font-inter">
                  Welcome to the world&apos;s largest CA Platform
                </h3>
                <Button
                  className="text-[16px] font-semibold text-global-5 
  bg-[linear-gradient(135deg,#1a48d3_0%,_#00b9fe_100%)] 
  rounded-[8px] py-[8px] px-[16px] flex items-center gap-[6px] w-fit"
                >
                  Request Callback
                  <Image
                    src="/images/img_arrowright.svg"
                    alt="Arrow right"
                    width={18}
                    height={18}
                    className="inline-block"
                  />
                </Button>
              </div>

              {/* Right Links Section */}
              <div className="flex flex-wrap lg:flex-nowrap gap-[40px] w-full lg:w-[70%] justify-between">
                {/* Product Features */}
                <div className="flex flex-col gap-[20px] min-w-[200px]">
                  <h4 className="text-[20px] font-medium text-global-1 font-inter">
                    Product feature
                  </h4>
                  <div className="flex flex-col gap-[12px]">
                    <span>GST Filing & Compliance</span>
                    <span>Client Communication & Practice Management</span>
                    <span>Data Automation</span>
                  </div>
                </div>

                {/* Company */}
                <div className="flex flex-col gap-[18px] min-w-[180px]">
                  <h4 className="text-[20px] font-medium text-global-1 font-inter">Company</h4>
                  <div className="flex flex-col gap-[10px]">
                    <span>Home</span>
                    <span>About</span>
                    <span>Careers</span>
                    <span>Contact</span>
                  </div>
                </div>

                {/* Resources */}
                <div className="flex flex-col gap-[20px] min-w-[180px]">
                  <h4 className="text-[20px] font-medium text-global-1 font-inter">Resources</h4>
                  <div className="flex flex-col gap-[10px]">
                    <span>Blogs</span>
                    <span>Webinars</span>
                    <span>Calculator</span>
                    <span>Case Studies</span>
                  </div>
                </div>

                {/* Extra Links */}
                <div className="flex flex-col gap-[10px] min-w-[160px]">
                  <span>Pricing</span>
                  <span>Use cases</span>
                  <span>Customers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogPage;
