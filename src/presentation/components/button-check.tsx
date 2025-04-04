// import { motion } from "framer-motion";
// import { useState } from "react";

// export default function LayoutAnimation() {
//   const [isOn, setIsOn] = useState(false);

//   const toggleSwitch = () => setIsOn(!isOn);

//   return (
//     <button
//       type="button"
//       className={`toggle-container flex items-center w-14 h-8 rounded-full p-1 ${
//         isOn ? "bg-gray-300" : "bg-[#0A192F]"
//       }`}
//       style={{
//         justifyContent: isOn ? "flex-start" : "flex-end",
//       }}
//       onClick={toggleSwitch}
//     >
//       <motion.div
//         className="toggle-handle w-6 h-6 bg-white rounded-full shadow-md"
//         layout
//         transition={{
//           type: "spring",
//           duration: 0.2,
//           bounce: 0.2,
//         }}
//       />
//     </button>
//   );
// }