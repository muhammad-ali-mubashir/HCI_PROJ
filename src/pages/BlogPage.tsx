import { Layout } from '../components/Layout';
import { Calendar, User } from '@phosphor-icons/react';

import { BLOG_POSTS } from '../lib/blogData';
import { Link } from 'react-router-dom';

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
                        <Link to={`/blog/${post.id}`} key={post.id} className="block h-full">
                            <article className="group rounded-xl border border-black/5 dark:border-white/5 bg-surface hover:border-black/10 dark:hover:border-white/10 transition-all hover:shadow-lg overflow-hidden flex flex-col h-full cursor-pointer">
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
                            </article>
                        </Link>
                    ))}
                </div>
            </div>
        </Layout>
    );
};
