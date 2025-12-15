
import { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { BLOG_POSTS } from '../lib/blogData';
import { ArrowLeft, Calendar, User, Clock } from '@phosphor-icons/react';
import { Button } from '../components/ui/Button';

export const BlogPostPage = () => {
    const { id } = useParams();
    const post = BLOG_POSTS.find(p => p.id === Number(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!post) {
        return <Navigate to="/blog" replace />;
    }

    return (
        <Layout>
            <article className="min-h-screen bg-background pb-24">
                {/* Hero / Header */}
                <div className="relative h-[400px] w-full overflow-hidden">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-6 pb-12">
                        <Link to="/blog">
                            <Button variant="ghost" className="mb-6 text-white hover:text-white/80 hover:bg-white/10 pl-0">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Blog
                            </Button>
                        </Link>
                        <div className="flex items-center gap-4 mb-4 text-sm text-white/80">
                            <span className="bg-primary/20 text-primary-foreground px-3 py-1 rounded-full backdrop-blur-sm border border-primary/20">
                                {post.category}
                            </span>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {post.readTime}
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-6 text-white/80">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                                    <User className="w-4 h-4" />
                                </div>
                                <span className="font-medium">{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{post.date}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-3xl mx-auto px-6 mt-12">
                    <div className="prose prose-lg dark:prose-invert prose-headings:font-serif prose-headings:font-bold prose-a:text-primary prose-img:rounded-xl">
                        {post.content}
                    </div>

                    <div className="mt-16 pt-8 border-t border-border">
                        <h3 className="text-xl font-bold text-text-primary mb-6">Read Next</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 2).map(nextPost => (
                                <Link key={nextPost.id} to={`/blog/${nextPost.id}`} className="group block">
                                    <div className="aspect-video rounded-lg overflow-hidden mb-3">
                                        <img src={nextPost.image} alt={nextPost.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    </div>
                                    <h4 className="font-bold text-text-primary group-hover:text-primary transition-colors">{nextPost.title}</h4>
                                    <p className="text-sm text-text-tertiary mt-1">{nextPost.date}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </article>
        </Layout>
    );
};
