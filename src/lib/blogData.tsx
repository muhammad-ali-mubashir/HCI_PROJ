
import React from 'react';

export interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    category: string;
    readTime: string;
    image: string;
    content?: React.ReactNode;
}

export const BLOG_POSTS: BlogPost[] = [
    {
        id: 1,
        title: "Introducing AutoM8: The Future of Workflow Automation",
        excerpt: "We're excited to launch AutoM8, the first AI-powered workflow builder that understands your business context. Learn how we built it and what's coming next.",
        author: "Sarah Chen",
        date: "Dec 15, 2024",
        category: "Product",
        readTime: "5 min read",
        image: "/assets/blog1.jpg",
        content: (
            <>
                <p className="mb-6" >
                    Today marks a significant milestone in our journey to democratize automation. We are thrilled to introduce <strong>AutoM8</strong>, a platform designed from the ground up to make complex workflow automation accessible to everyone.
                </p>
                <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">Why we built AutoM8</h2>
                <p className="mb-6">
                    Traditional automation tools are powerful but often require a steep learning curve. You need to understand APIs, data structures, and logic flow. We believed there had to be a better way—a way where the tool understands your intent.
                </p>
                <p className="mb-6">
                    With AutoM8, we've integrated advanced LLMs directly into the workflow builder. This allows you to describe what you want to achieve in plain English, and have the system build the skeleton of your automation for you.
                </p>
                <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">Key Features</h2>
                <ul className="list-disc list-inside space-y-2 mb-6">
                    <li><strong>AI-First Design:</strong> Context-aware suggestions and generation.</li>
                    <li><strong>Visual Builder:</strong> A beautiful, intuitive canvas for mapping out logic.</li>
                    <li><strong>Enterprise Security:</strong> Built with SOC 2 compliance in mind.</li>
                </ul>
                <p>
                    We're just getting started. Join us as we redefine what's possible with automation.
                </p>
            </>
        )
    },
    {
        id: 2,
        title: "5 Way to Automate your Daily Tasks",
        excerpt: "Discover how to reclaim 10+ hours a week by automating repetitive tasks like email sorting, data entry, and report generation using simple workflows.",
        author: "Mike Ross",
        date: "Dec 12, 2024",
        category: "Tutorial",
        readTime: "8 min read",
        image: "/assets/blog2.jpg",
        content: (
            <>
                <p className="mb-6">
                    We all have those tasks that eat up our day—the repetitive, mundane chores that distract us from high-value work. Here are five simple ways you can use AutoM8 to reclaim your time.
                </p>
                <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">1. Smart Email Sorting</h2>
                <p className="mb-6">
                    Instead of manually tagging emails, set up a workflow that analyzes incoming messages using AI and automatically categories them, archiving the noise and highlighting the urgent.
                </p>
                <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">2. Daily Standup Reports</h2>
                <p className="mb-6">
                    Connect your project management tool (like Linear or Jira) to Slack. Have AutoM8 summarize the tickets closed yesterday and post a formatted report to your team channel every morning.
                </p>
                <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">3. Lead Enrichment</h2>
                <p className="mb-6">
                    When a new user signs up, automatically fetch their public company data and enrich your CRM profile before your sales team even sees the lead.
                </p>
                <p>
                    These are just a few examples. The possibilities are endless when you start thinking in workflows.
                </p>
            </>
        )
    },
    {
        id: 3,
        title: "Integrating with Linear, GitHub, and Slack",
        excerpt: "A deep dive into connecting your development tools to create seamless feedback loops. Monitor issues, deployments, and alerts in one place.",
        author: "Alex Kim",
        date: "Dec 10, 2024",
        category: "Engineering",
        readTime: "6 min read",
        image: "/assets/blog3.jpg",
        content: (
            <>
                <p className="mb-6">
                    DevOps is all about flow. In this technical deep dive, we'll explore how to build a unified notification system that connects your code, your operational tasks, and your communication.
                </p>
                <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">The Stack</h2>
                <p className="mb-6">
                    We'll be using GitHub for version control, Linear for issue tracking, and Slack for notifications. The glue holding them together? AutoM8.
                </p>
                <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">Handling Webhooks</h2>
                <p className="mb-6">
                    First, we set up a webhook trigger in AutoM8 to listen for `pull_request` events from GitHub. We can filter these events to only trigger on "merged" actions to the "main" branch.
                </p>
                <pre className="bg-surface-active p-4 rounded-lg overflow-x-auto mb-6 text-sm">
                    <code>
                        {`if (event.action === 'closed' && event.pull_request.merged) {
  // Trigger deployment workflow
}`}
                    </code>
                </pre>
                <p>
                    Once triggered, we can look up the associated Linear issue from the PR body and automatically move it to "Done", then post a celebration message in #engineering-wins.
                </p>
            </>
        )
    }
];
