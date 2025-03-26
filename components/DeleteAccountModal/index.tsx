// "use client";
// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { AlertTriangle, X } from "lucide-react";
// import { useDeleteAccount } from "../../app/hooks/useDeleteAccount";

// interface DeleteAccountModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
//   isOpen,
//   onClose,
// }) => {
//   const [confirmText, setConfirmText] = useState("");
//   const { mutate: deleteAccount, isPending } = useDeleteAccount();

//   const handleDelete = () => {
//     if (confirmText === "DELETE") {
//       deleteAccount();
//     }
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           {/* Backdrop */}
//           <motion.div
//             className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//           />

//           {/* Modal */}
//           <motion.div
//             className="fixed inset-0 flex items-center justify-center z-50 p-4"
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.95 }}
//             transition={{ type: "spring", damping: 30, stiffness: 400 }}
//           >
//             <div className="bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-xl shadow-2xl max-w-md w-full border border-gray-700 p-6 relative">
//               {/* Close button */}
//               <button
//                 onClick={onClose}
//                 className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
//                 disabled={isPending}
//               >
//                 <X size={20} />
//               </button>

//               <div className="text-center mb-6">
//                 <div className="w-16 h-16 bg-[#C28F49]/20 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <AlertTriangle size={32} className="text-[#C28F49]" />
//                 </div>
//                 <h3 className="text-xl font-bold text-white">Delete Account</h3>
//                 <p className="text-gray-300 mt-2">
//                   This action is permanent and cannot be undone. All your data
//                   will be permanently deleted.
//                 </p>
//               </div>

//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-1">
//                     Type DELETE to confirm
//                   </label>
//                   <input
//                     type="text"
//                     className="block w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C28F49] focus:border-transparent"
//                     value={confirmText}
//                     onChange={(e) => setConfirmText(e.target.value)}
//                     disabled={isPending}
//                   />
//                 </div>

//                 <div className="flex space-x-3 pt-4">
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     className="flex-1 py-2 rounded-lg bg-gradient-to-r from-[#2D9642] to-[#42a85a] text-white font-medium transition-colors hover:from-[#27833a] hover:to-[#389050]"
//                     onClick={onClose}
//                     disabled={isPending}
//                   >
//                     Cancel
//                   </motion.button>
//                   <motion.button
//                     whileHover={confirmText === "DELETE" ? { scale: 1.02 } : {}}
//                     whileTap={confirmText === "DELETE" ? { scale: 0.98 } : {}}
//                     className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
//                       confirmText === "DELETE"
//                         ? "bg-gradient-to-r from-[#C28F49] to-[#d9a55c] text-white hover:from-[#b3813f] hover:to-[#c79652]"
//                         : "bg-gradient-to-r from-[#C28F49]/30 to-[#d9a55c]/30 text-gray-300 cursor-not-allowed"
//                     }`}
//                     onClick={handleDelete}
//                     disabled={confirmText !== "DELETE" || isPending}
//                   >
//                     {isPending ? (
//                       <span className="flex items-center justify-center">
//                         <svg
//                           className="animate-spin h-5 w-5 mr-2"
//                           viewBox="0 0 24 24"
//                         >
//                           <circle
//                             className="opacity-25"
//                             cx="12"
//                             cy="12"
//                             r="10"
//                             stroke="currentColor"
//                             strokeWidth="4"
//                             fill="none"
//                           ></circle>
//                           <path
//                             className="opacity-75"
//                             fill="currentColor"
//                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                           ></path>
//                         </svg>
//                         Deleting...
//                       </span>
//                     ) : (
//                       "Delete Account"
//                     )}
//                   </motion.button>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// export default DeleteAccountModal;
