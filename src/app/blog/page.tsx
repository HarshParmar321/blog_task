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

  // Fetch blog data from API
  const fetchBlogData = async (selectedTag: string = 'All', page: number = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12' // Fetch 12 posts for 4 rows (3x4)
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
      setTags(data.tagFilters.map((t: TagFilter) => ({ ...t, active: t.label === selectedTag || (t.id === 'all' && selectedTag === 'All')})));
      
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
    const updatedTags = tags.map(tag => ({
      ...tag,
      active: tag.label === tagLabel || (tag.id === 'all' && tagLabel === 'All')
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
                    Learn about the latest trends in GST, accounting automation, and CA best practices.
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
                     <Button onClick={() => fetchBlogData()} className="bg-global-1 text-white px-6 py-2 rounded-lg">
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
                 <Button onClick={() => fetchBlogData()} className="bg-global-1 text-white px-6 py-2 rounded-lg">
                   Try Again
                 </Button>
               </div>
             ) : (
                               // Display only 3 posts (1 row) with img_placeholder.png
                blogPosts.slice(1, 4).map((post) => (
                  <div key={post.id} className="flex flex-col justify-start items-center w-full rounded-[16px] overflow-hidden shadow-lg bg-global-4 h-[520px]">
                    <div className="w-full h-[200px] relative">
                      <Image
                        src="/images/img_placeholder.png"
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-[24px] justify-between items-start w-full bg-global-4 p-[24px] flex-1">
                      <div className="flex flex-col gap-[16px] justify-start items-start w-full">
                        <h4 className="text-[20px] sm:text-[24px] font-semibold leading-[24px] sm:leading-[29px] text-left text-global-1 font-inter w-full line-clamp-2 min-h-[58px]">
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
                <div key={index} className="flex flex-col justify-start items-center w-full rounded-[16px] overflow-hidden shadow-lg bg-global-4 animate-pulse">
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
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : error ? (
              <div className="col-span-full text-center py-20">
                <p className="text-red-500 mb-4">{error}</p>
                <Button onClick={() => fetchBlogData()} className="bg-global-1 text-white px-6 py-2 rounded-lg">
                  Try Again
                </Button>
              </div>
            ) : (
              // Display 12 blog posts (4 rows of 3 cards each) without images
              blogPosts.map((post, index) => (
                <div key={post.id} className="flex flex-col justify-start items-center w-full rounded-[16px] overflow-hidden shadow-lg bg-global-4 h-[320px]">
                  <div className="flex flex-col gap-[20px] justify-between items-start w-full bg-global-4 p-[24px] flex-1">
                    <div className="flex flex-col gap-[16px] justify-start items-start w-full">
                      <h4 className="text-[20px] sm:text-[24px] font-semibold leading-[24px] sm:leading-[29px] text-left text-global-1 font-inter w-full line-clamp-2 min-h-[58px]">
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
      <div className="w-full bg-[linear-gradient(135deg,#1a48d3_0%,#00b9fe_100%)] relative overflow-hidden">
                 {/* Background Pattern */}
         <div className="absolute inset-0 opacity-10">
           <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
         </div>
        
        <div className="relative p-[48px] lg:p-[80px] mb-[64px]">
          <div className="w-full max-w-[1200px] mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-[48px] lg:gap-[100px]">
              {/* Left Side - Text and Button */}
              <div className="flex flex-col gap-[40px] justify-start items-start w-full lg:w-[45%] animate-in slide-in-from-top-2">
                <div className="flex flex-col gap-[24px]">
                  <h2 className="text-[32px] sm:text-[36px] lg:text-[44px] font-bold leading-[39px] sm:leading-[44px] lg:leading-[52px] text-left text-white font-inter drop-shadow-lg">
                    Enjoy the Benefits of Suvit&apos;s Smart Automation Firsthand
                  </h2>
                  <p className="text-[18px] font-medium leading-[28px] text-left text-white/90 font-inter max-w-[500px]">
                    Experience the power of intelligent automation that transforms your accounting workflow and boosts productivity.
                  </p>
                </div>
                
                <Button className="group text-[16px] font-semibold leading-[20px] text-center text-white border-2 border-white rounded-[16px] py-[16px] px-[32px] hover:bg-white hover:text-[#1a48d3] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  <span className="flex items-center gap-[12px]">
                    Explore Insights
                    <Image
                      src="/images/img_arrowright.svg"
                      alt="Arrow right"
                      width={24}
                      height={24}
                      className="w-[24px] h-[24px] group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </span>
                </Button>
              </div>
              
              {/* Right Side - Feature Visualization */}
              <div className="relative w-full lg:w-[50%] h-[450px] lg:h-[500px] flex justify-center items-center animate-in slide-in-from-top-2">
                {/* Animated background gradient circles */}
                <div className="absolute inset-0 flex justify-center items-center">
                  <div className="relative w-[420px] h-[420px] bg-[linear-gradient(180deg,#ffffff25_0%,_#d8ffe125_100%)] rounded-full flex justify-center items-center animate-pulse">
                    <div className="relative w-[300px] h-[300px] bg-[linear-gradient(180deg,#ffffff35_0%,_#d8ffe135_100%)] rounded-full flex justify-center items-center animate-pulse" style={{animationDelay: '0.5s'}}>
                      <div className="w-[130px] h-[130px] bg-white rounded-[20px] shadow-2xl flex justify-center items-center p-[20px] transform hover:scale-110 transition-transform duration-300">
                        <Image
                          src="/images/img_frame_2147225766.png"
                          alt="Suvit Logo"
                          width={90}
                          height={98}
                          className="w-[90px] h-[98px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Feature bubbles with enhanced styling and animations */}
                {/* Top Center */}
                <div className="absolute top-[30px] left-1/2 transform -translate-x-1/2 bg-white rounded-[16px] shadow-xl p-[16px] hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 animate-in slide-in-from-top-2" style={{animationDelay: '0.2s'}}>
                  <span className="text-[15px] font-semibold leading-[20px] text-left text-[#1a48d3] font-inter whitespace-nowrap">
                    Client Communication
                  </span>
                </div>
                
                {/* Top Left */}
                <div className="absolute top-[80px] left-[70px] bg-white rounded-[16px] shadow-xl p-[16px] hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 animate-in slide-in-from-top-2" style={{animationDelay: '0.4s'}}>
                  <span className="text-[15px] font-semibold leading-[20px] text-left text-[#1a48d3] font-inter whitespace-nowrap">
                    GST automation
                  </span>
                </div>
                
                {/* Mid Left */}
                <div className="absolute top-[200px] left-[50px] bg-white rounded-[16px] shadow-xl p-[16px] hover:shadow-2xl transition-all duration-300 hover:scale-110 animate-in slide-in-from-top-2" style={{animationDelay: '0.6s'}}>
                  <Image
                    src="/images/img_tally_solutions.svg"
                    alt="Tally Solutions"
                    width={52}
                    height={26}
                    className="w-[52px] h-[26px]"
                  />
                </div>
                
                {/* Bottom Left */}
                <div className="absolute bottom-[140px] left-[70px] bg-white rounded-[16px] shadow-xl p-[16px] hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:translate-y-1 animate-in slide-in-from-top-2" style={{animationDelay: '0.8s'}}>
                  <span className="text-[15px] font-semibold leading-[20px] text-left text-[#1a48d3] font-inter whitespace-nowrap">
                    Data-entry Automation
                  </span>
                </div>
                
                {/* Bottom Right */}
                <div className="absolute bottom-[80px] right-[70px] bg-white rounded-[16px] shadow-xl p-[16px] hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:translate-y-1 animate-in slide-in-from-top-2" style={{animationDelay: '1s'}}>
                  <div className="w-[36px] h-[36px] bg-green-500 rounded-[10px] flex justify-center items-center shadow-lg">
                    <svg className="w-[22px] h-[22px] text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </div>
                </div>
                
                {/* Mid Right */}
                <div className="absolute top-[200px] right-[50px] bg-white rounded-[16px] shadow-xl p-[16px] hover:shadow-2xl transition-all duration-300 hover:scale-110 animate-in slide-in-from-top-2" style={{animationDelay: '1.2s'}}>
                  <span className="text-[15px] font-semibold leading-[20px] text-left text-[#1a48d3] font-inter whitespace-nowrap">
                    Chanakya AI
                  </span>
                </div>
                
                {/* Connecting lines (subtle) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 500">
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1"/>
                    </linearGradient>
                  </defs>
                  <line x1="250" y1="130" x2="250" y2="50" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="5,5"/>
                  <line x1="250" y1="370" x2="250" y2="450" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="5,5"/>
                  <line x1="130" y1="250" x2="50" y2="250" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="5,5"/>
                  <line x1="370" y1="250" x2="450" y2="250" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="5,5"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="w-full bg-[linear-gradient(180deg,#ffffff00_0%,_#d5f1ff_100%)] py-[40px]">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[40px]">
          <div className="flex flex-col gap-[6px] justify-start items-center w-full">
            {/* Footer Header */}
            <div className="flex flex-col gap-[16px] justify-start items-center w-full max-w-[1200px]">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4 sm:gap-0">
                <div className="flex justify-start items-center w-full sm:w-auto">
                  <Image
                    src="/images/img_image_2.png"
                    alt="Suvit Logo"
                    width={102}
                    height={32}
                    className="w-[102px] h-[32px]"
                  />
                  <span className="ml-[10px] text-[16px] font-normal leading-[20px] text-center text-global-1 font-inter self-end">
                    Powering CA&apos;s Office
                  </span>
                </div>
                <div className="flex justify-end items-center w-auto gap-[10px]">
                  <Image
                    src="/images/img_logo_ins_fill.svg"
                    alt="Instagram"
                    width={30}
                    height={30}
                    className="w-[30px] h-[30px]"
                  />
                  <Image
                    src="/images/img_logo_facebook_fill.svg"
                    alt="Facebook"
                    width={30}
                    height={30}
                    className="w-[30px] h-[30px]"
                  />
                  <Image
                    src="/images/img_logo_linkedin_fill.svg"
                    alt="LinkedIn"
                    width={30}
                    height={30}
                    className="w-[30px] h-[30px]"
                  />
                </div>
              </div>
              <div className="w-full h-[1px] bg-global-2" />
            </div>
            {/* Footer Content */}
            <div className="flex flex-col lg:flex-row justify-center items-start w-full max-w-[1200px] gap-[32px] lg:gap-0 mb-[14px]">
              {/* Company Info */}
              <div className="flex flex-col gap-[32px] justify-start items-start w-full lg:w-[24%]">
                <h3 className="text-[32px] sm:text-[36px] lg:text-[40px] font-medium leading-[39px] sm:leading-[44px] lg:leading-[48px] text-left text-global-2 font-inter w-full lg:w-[96%]">
                  Welcome to the world&apos;s largest CA Platform
                </h3>
                <Button className="text-[16px] font-semibold leading-[20px] text-center text-global-5 bg-[linear-gradient(135deg,#1a48d3_0%,_#00b9fe_100%)] rounded-[8px] py-[8px] pl-[24px] pr-[48px] flex items-center gap-[10px]">
                  Request Callback
                  <span className="flex items-center gap-[10px]">
                  <Image
                    src="/images/img_arrowright.svg"
                    alt="Arrow right"
                    width={24}
                    height={24}
                    className="w-[24px] h-[24px]"
                  />
                  </span>
                </Button>
              </div>
              {/* Footer Links */}
              <div className="flex flex-col sm:flex-row gap-[18px] justify-center items-start w-full lg:flex-1">
                {/* Product Features */}
                <div className="flex flex-col gap-[20px] justify-start items-start w-full sm:w-[34%]">
                  <h4 className="text-[20px] font-medium leading-[25px] text-left text-global-1 font-inter">
                    Product feature
                  </h4>
                  <div className="flex flex-col gap-[12px] justify-start items-start w-full sm:w-[64%]">
                    <span className="text-[16px] font-normal leading-[20px] text-left text-global-1 font-inter">
                      GST Filing & Compliance
                    </span>
                    <span className="text-[16px] font-normal leading-[19px] text-left text-global-1 font-inter w-full">
                      Client Communication & Practice Management
                    </span>
                    <span className="text-[16px] font-normal leading-[20px] text-left text-global-1 font-inter">
                      Data Automation
                    </span>
                  </div>
                </div>
                {/* Company & Resources */}
                <div className="flex flex-col sm:flex-row gap-[18px] w-full sm:flex-1">
                  {/* Company */}
                  <div className="flex flex-col gap-[18px] justify-start items-start w-full sm:w-[184px]">
                    <h4 className="text-[20px] font-medium leading-[25px] text-left text-global-1 font-inter">
                      Company
                    </h4>
                    <div className="flex flex-col gap-[10px] justify-start items-start w-auto">
                      <span className="text-[16px] font-normal leading-[20px] text-left text-global-1 font-inter">
                        Home
                      </span>
                      <span className="text-[16px] font-normal leading-[20px] text-left text-global-1 font-inter">
                        About
                      </span>
                      <span className="text-[16px] font-normal leading-[20px] text-left text-global-1 font-inter">
                        Carrers
                      </span>
                      <span className="text-[16px] font-normal leading-[20px] text-left text-global-1 font-inter">
                        Contact
                      </span>
                    </div>
                  </div>
                  {/* Resources */}
                  <div className="flex flex-col gap-[20px] justify-start items-start w-full sm:w-[186px]">
                    <h4 className="text-[20px] font-medium leading-[25px] text-left text-global-1 font-inter">
                      Resources
                    </h4>
                    <div className="flex flex-col gap-[10px] justify-start items-start w-full">
                      <span className="text-[16px] font-normal leading-[20px] text-left text-global-1 font-inter">
                        Blogs
                      </span>
                      <span className="text-[16px] font-normal leading-[20px] text-left text-global-1 font-inter">
                        Webinars
                      </span>
                      <span className="text-[16px] font-normal leading-[20px] text-left text-global-1 font-inter">
                        Calculator
                      </span>
                      <span className="text-[16px] font-normal leading-[20px] text-left text-global-1 font-inter">
                        Case Studies
                      </span>
                    </div>
                  </div>
                </div>
                {/* Additional Links */}
                <div className="flex flex-col gap-[10px] justify-start items-start w-auto">
                  <span className="text-[16px] font-normal leading-[20px] text-left text-global-1 font-inter">
                    Pricing
                  </span>
                  <span className="text-[16px] font-normal leading-[20px] text-left text-global-1 font-inter">
                    Use cases
                  </span>
                  <span className="text-[16px] font-normal leading-[20px] text-left text-global-1 font-inter">
                    Customers
                  </span>
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