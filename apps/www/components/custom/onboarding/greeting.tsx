import { motion } from "framer-motion";
import Logo from "../site/logo";
import { useMyProfileStore } from "@prexo/store";

export const GreetingMsg = () => {
  const { myProfile } = useMyProfileStore();

  return (
    <div
      key="overview"
      className="max-w-3xl mx-auto px-4 size-full flex flex-col justify-center"
    >
      <div className="flex items-center gap-3">
        <div className="size-8 flex items-center rounded-full justify-center shrink-0">
          <Logo isTextVisible={false} />
        </div>
        <div className="flex flex-col mt-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.5 }}
            className="text-xl font-semibold"
          >
            Hey, {myProfile?.name}!
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-muted-foreground"
          >
            Ready to onboard?
          </motion.div>
        </div>
      </div>
    </div>
  );
};
