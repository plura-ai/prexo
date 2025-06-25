import { motion } from 'framer-motion';
import Logo from '../site/logo';

interface GreetingMsgProps {
  name?: string;
}


export const GreetingMsg = ({name}: GreetingMsgProps) => {
  return (
    <div
      key="overview"
      className="max-w-3xl mx-auto md:mt-10 px-8 size-full flex flex-col justify-center"
    >
      <div className="flex items-center gap-3">
        <div className="size-8 flex items-center rounded-full justify-center shrink-0">
          <Logo isTextVisible={false} />
        </div>
        <div className='flex flex-col mt-8'>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.5 }}
          className="text-2xl font-semibold"
        >
          Yo, {name}!
        </motion.div>
        <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.6 }}
        className="text-xl text-muted-foreground"
      >
        Ready to onboard?
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.7 }}
        className="text-sm text-muted-foreground/60"
      >
        Reply with <span className="text-blue-500">&quot;Start or Yes&quot;</span> to begin.
      </motion.div>
        </div>
      </div>
    </div>
  );
};