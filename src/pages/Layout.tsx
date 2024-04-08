import { useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export default function Layout() {
  const location = useLocation();

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        <AnimatedOutlet key={location.pathname} />
      </motion.div>
    </AnimatePresence>
  );
}

function AnimatedOutlet() {
  const outlet = useOutlet();
  const [context] = useState(outlet);
  return context;
}
