import { Layout } from '../components/Layout';
import { Calendar, User } from '@phosphor-icons/react';

const BLOG_POSTS = [
    {
        id: 1,
        title: "Introducing AutoM8: The Future of Workflow Automation",
        excerpt: "We're excited to launch AutoM8, the first AI-powered workflow builder that understands your business context. Learn how we built it and what's coming next.",
        author: "Sarah Chen",
        date: "Dec 15, 2024",
        category: "Product",
        readTime: "5 min read",
        image: "/assets/blog1.jpg"
    },
    {
        id: 2,
        title: "5 Way to Automate your Daily Tasks",
        excerpt: "Discover how to reclaim 10+ hours a week by automating repetitive tasks like email sorting, data entry, and report generation using simple workflows.",
        author: "Mike Ross",
        date: "Dec 12, 2024",
        category: "Tutorial",
        readTime: "8 min read",
        image: "/assets/blog2.jpg"
    },
    {
        id: 3,
        title: "Integrating with Linear, GitHub, and Slack",
        excerpt: "A deep dive into connecting your development tools to create seamless feedback loops. Monitor issues, deployments, and alerts in one place.",
        author: "Alex Kim",
        date: "Dec 10, 2024",
        category: "Engineering",
        readTime: "6 min read",
        image: "/assets/blog3.jpg"
    }
];

export const BlogPage = () => {
    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">The AutoM8 Blog</span>
                    <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mt-4 mb-6 font-serif">
                        Insights, tutorials, and updates
                    </h1>
                    <p className="text-lg text-text-secondary">
                        Stay up to date with the latest features, automation tips, and engineering deep dives from the AutoM8 team.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {BLOG_POSTS.map((post) => (
                        <div key={post.id} className="group rounded-xl border border-black/5 dark:border-white/5 bg-surface hover:border-black/10 dark:hover:border-white/10 transition-all hover:shadow-lg overflow-hidden flex flex-col h-full">
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex items-center justify-between text-xs text-text-tertiary mb-3">
                                    <span className="font-medium text-primary bg-primary/10 px-2 py-1 rounded-md">{post.category}</span>
                                    <span>{post.readTime}</span>
                                </div>
                                <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-primary transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-text-secondary leading-relaxed mb-6 flex-1">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center justify-between pt-4 border-t border-black/5 dark:border-white/5">
                                    <div className="flex items-center gap-2 text-xs text-text-tertiary">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                            <User className="w-3 h-3 text-gray-500" />
                                        </div>
                                        <span>{post.author}</span>
                                        <span className="w-1 h-1 rounded-full bg-current opacity-50" />
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            <span>{post.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};
