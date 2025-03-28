'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import Container from '@/components/ui/Container';
import Navbar from '@/components/ui/Navbar';

export default function LandingPage() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden min-h-screen flex items-center">
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-accent-rose/5 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(244, 63, 94, 0.1) 0%, transparent 50%)',
              opacity: 0.5,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <Container>
            <div className="flex flex-col items-center text-center space-y-8 py-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative p-8 rounded-2xl bg-background-secondary/30 backdrop-blur-sm border border-accent-rose/20"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: 'linear-gradient(45deg, #f43f5e, #8b5cf6, #3b82f6, #10b981)',
                    backgroundSize: '400% 400%',
                    animation: 'gradient 15s ease infinite',
                    opacity: 0.1,
                    zIndex: -1,
                  }}
                />
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-6xl md:text-8xl font-bold text-foreground leading-tight"
                >
                  Share Your
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-accent-rose inline-block"
                  >
                    {" "}Story
                  </motion.span>
                  <br />
                  with the World
                </motion.h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-xl md:text-2xl text-foreground-secondary max-w-2xl leading-relaxed"
              >
                Create, share, and discover stories that inspire, educate, and connect people around the globe.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 mt-8"
              >
                <Link href="/explore">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    whileTap={{ scale: 0.95 }}
                    className="group px-8 py-4 bg-accent-rose text-white rounded-lg text-lg font-semibold hover:bg-accent-rose/90 transition-all duration-300 hover:shadow-lg hover:shadow-accent-rose/20 relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      View Blogs
                      <motion.span
                        className="ml-2"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-accent-rose/0 via-accent-rose/20 to-accent-rose/0"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  </motion.div>
                </Link>
                <Link href="/create">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: -1 }}
                    whileTap={{ scale: 0.95 }}
                    className="group px-8 py-4 bg-background-secondary text-foreground rounded-lg text-lg font-semibold hover:bg-background-secondary/80 transition-all duration-300 hover:shadow-lg hover:shadow-foreground/5 relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      Create Blog
                      <motion.span
                        className="ml-2"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-foreground/0 via-foreground/5 to-foreground/0"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* Features Section */}
        <section className="py-20 relative">
          <motion.div
            style={{ y, opacity }}
            className="absolute inset-0 bg-gradient-to-b from-background to-accent-rose/5"
          />
          <Container>   
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
            >
              {[
                {
                  title: "Create Beautiful Stories",
                  description: "Write and format your content with our rich text editor. Make your stories stand out with beautiful typography and layouts.",
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  ),
                },
                {
                  title: "Engage with Readers",
                  description: "Connect with your audience through comments and discussions. Build a community around your content.",
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                  ),
                },
                {
                  title: "Reach Global Audience",
                  description: "Share your stories with readers from around the world. Make your voice heard on a global platform.",
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  ),
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group text-center p-8 rounded-2xl bg-background-secondary/30 backdrop-blur-sm border border-accent-rose/20 relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: 'linear-gradient(45deg, #f43f5e, #8b5cf6, #3b82f6, #10b981)',
                      backgroundSize: '400% 400%',
                      animation: 'gradient 15s ease infinite',
                      opacity: 0.1,
                      zIndex: -1,
                    }}
                  />
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 bg-accent-rose/10 rounded-full flex items-center justify-center mx-auto mb-6 relative"
                  >
                    <svg
                      className="w-8 h-8 text-accent-rose"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {feature.icon}
                    </svg>
                  </motion.div>
                  <h3 className="text-2xl font-semibold mb-4 relative">{feature.title}</h3>
                  <p className="text-foreground-secondary leading-relaxed relative">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>
      </main>
    </div>
  );
}
