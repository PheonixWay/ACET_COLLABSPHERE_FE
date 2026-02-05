
# Temporary fix applied
- Replaced `@/store/app` import with relative path `../../store/app` in `src/components/organisms/Header.jsx`.
- Removed `framer-motion` usage from `src/pages/Landing.jsx` to avoid missing dependency.

If you want the animated headline back, run:
  npm i framer-motion

…then restore:
  import { motion } from 'framer-motion'
  <motion.h1 ...>...</motion.h1>
