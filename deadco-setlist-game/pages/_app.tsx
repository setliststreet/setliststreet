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
              <link href="https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap" rel="stylesheet" />

        <title>Dead & Co Setlist Showdown</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className="app-container bg-white min-h-screen">
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
          className="fixed bottom-4 right-4 w-14 h-14 bg-purple-600 text-white rounded-full shadow-lg hover:shadow-xl z-50 flex items-center justify-center text-xl hover:bg-purple-700 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: "spring", bounce: 0.4 }}
          onClick={() => {
            // Future: Toggle background music
            console.log('Audio toggle (future feature)');
          }}
        >
          ♪
        </motion.button>
      </div>
    </DndProvider>
  );
} 