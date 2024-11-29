import { forwardRef } from 'react';
import { Link } from '@remix-run/react';
import { Image } from '@shopify/hydrogen';
import type { Article } from '@shopify/hydrogen/storefront-api-types';
import type {
  HydrogenComponentProps,
  HydrogenComponentSchema,
} from "@weaverse/hydrogen";

// Placeholder image URLs (using placehold.co)
const placeholderImages = [
  'https://placehold.co/800x600.png?text=Blog+Post+1',
  'https://placehold.co/800x600.png?text=Blog+Post+2',
  'https://placehold.co/800x600.png?text=Blog+Post+3',
  'https://placehold.co/800x600.png?text=Blog+Post+4',
  'https://placehold.co/800x600.png?text=Blog+Post+5',
  'https://placehold.co/800x600.png?text=Blog+Post+6'
];

// Function to generate fictional blog posts
const generateFictionalPosts = (limit: number): Article[] => {
  const fictionalPosts: Article[] = [];
  const authors = ['Jane Doe', 'John Smith', 'Alex Johnson', 'Emma Wilson', 'Michael Brown', 'Sarah Lee'];
  const titles = [
    'Top 10 Tips for Success',
    'The Future of Technology',
    'Wellness and Mindfulness',
    'Sustainable Living Strategies',
    'Innovation in Business',
    'Exploring Creative Paths'
  ];

  for (let i = 0; i < limit; i++) {
    const randomDate = new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000));
    const post: Article = {
      id: `fictional-post-${i}`,
      title: titles[i] || 'Untitled Post',
      handle: `fictional-post-${i}`,
      publishedAt: randomDate.toISOString(),
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      author: {
        name: authors[i] || 'Anonymous'
      },
      image: {
        url: placeholderImages[i] || placeholderImages[0],
        altText: 'Blog post placeholder image',
        width: 800,
        height: 600
      }
    } as Article;
    fictionalPosts.push(post);
  }

  return fictionalPosts;
};

interface RecentBlogPostsProps extends HydrogenComponentProps {
  articles?: Article[];
  limit?: number;
  showPlaceholders?: boolean;
  imageAspectRatio?: string;  // New image aspect ratio prop
}

const RecentBlogPosts = forwardRef<HTMLElement, RecentBlogPostsProps>((props, ref) => {
  const { 
    articles = [], 
    limit = 3,
    showPlaceholders = true,
    imageAspectRatio = 'auto',  // Default aspect ratio
    className = '',
    ...rest 
  } = props;

  // Determine the posts to display
  const postsToDisplay = articles.length > 0 
    ? articles.slice(0, limit)
    : showPlaceholders 
      ? generateFictionalPosts(limit)
      : [];

  return (
    <section ref={ref} {...rest} className={`recent-blog-posts ${className}`}>
    {postsToDisplay.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto max-w-7xl">
        {postsToDisplay.map((article, index) => (
          <div 
            key={article.id} 
            className={`border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 w-full p-2 ${
              index === 0 ? '' : 'hidden md:block'
            }`} // Esconde posts extras em telas pequenas e adiciona padding interno
          >
            {article.image && (
              <Link to={`/blog/${article.handle}`}>
                <Image
                  data={article.image}
                  className="w-full object-cover aspect-square" // Força a imagem a ser quadrada
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </Link>
            )}
            <div className="p-3 space-y-2">
              <h6 className="text-xs line-clamp-2">
                <Link to={`/blog/${article.handle}`}>
                  {article.title}
                </Link>
              </h6>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{article.author?.name}</span>
                <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
              </div>
              {article.excerpt && (
                <p className="text-gray-500 line-clamp-3">
                  {article.excerpt}
                </p>
              )}
              <Link 
                to={`/blog/${article.handle}`} 
                className="inline-block mt-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-12 text-gray-500">
        No blog posts available
      </div>
    )}
  </section>
  
  );
});

RecentBlogPosts.displayName = 'RecentBlogPosts';

export const schema: HydrogenComponentSchema = {
  type: 'recent-blog-posts',
  title: 'Recent Blog Posts',
  inspector: [
    {
      group: 'Layout',
      inputs: [
        {
          type: 'range',
          label: 'Number of Posts',
          name: 'limit',
          configs: {
            min: 1,
            max: 6,
            step: 1,
          },
          defaultValue: 3,
        },
        {
          type: 'switch',
          label: 'Show Placeholders',
          name: 'showPlaceholders',
          defaultValue: true,
        },
      ],
    },
    {
      group: 'Blog Post Image',
      inputs: [
        {
          type: 'select',
          label: 'Image Aspect Ratio',
          name: 'imageAspectRatio',
          configs: {
            options: [
              { value: 'auto', label: 'Adapt to image' },
              { value: '1/1', label: '1/1' },
              { value: '3/4', label: '3/4' },
              { value: '4/3', label: '4/3' },
              { value: '16/9', label: '16/9' },
            ],
          },
          defaultValue: 'auto',
        },
      ],
    },
  ],
};

export default RecentBlogPosts;
