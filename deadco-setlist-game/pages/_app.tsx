import type { AppProps } from 'next/app';
import { motion, AnimatePresence } from 'framer-motion';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Head from 'next/head';
import '../styles/globals.css';

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <Head>
        <title>Dead & Co Setlist Showdown</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className="app-container">
        {/* Global Background Effects */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {/* Animated Lightning Background */}
          <motion.div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 10 L60 40 L40 40 L50 90 L30 60 L50 60 L50 10' fill='%23FFD700'/%3E%3C/svg%3E")`,
              backgroundSize: '200px 200px',
              backgroundRepeat: 'repeat'
            }}
            animate={{
              backgroundPosition: ['0px 0px', '200px 200px'],
              opacity: [0.02, 0.08, 0.02]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Floating Skulls */}
          <motion.div
            className="absolute top-1/4 left-1/4 text-6xl opacity-10 text-white"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              y: [-10, 10, -10]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            💀
          </motion.div>
          
          <motion.div
            className="absolute bottom-1/4 right-1/4 text-4xl opacity-10 text-white"
            animate={{
              rotate: [360, 0],
              scale: [1, 0.8, 1],
              x: [-15, 15, -15]
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🎸
          </motion.div>
          
          <motion.div
            className="absolute top-1/2 left-1/2 text-5xl opacity-10 text-white"
            animate={{
              rotate: [0, -360],
              scale: [1, 1.3, 1],
              x: [-20, 20, -20],
              y: [-20, 20, -20]
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ⚡
          </motion.div>
        </div>
        
        {/* Page Transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={router.route}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative z-10"
          >
        <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
        
        {/* Global Audio Button (Future Enhancement) */}
        <motion.button
          className="fixed bottom-4 right-4 w-14 h-14 bg-gradient-to-r from-[#C8102E] to-[#005BAC] text-white rounded-full shadow-lg hover:shadow-xl z-50 flex items-center justify-center text-xl backdrop-blur border border-white/20"
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: "spring", bounce: 0.4 }}
          onClick={() => {
            // Future: Toggle background music
            console.log('🎵 Audio toggle (future feature)');
          }}
        >
          🎵
        </motion.button>
      </div>
    </DndProvider>
  );
} 