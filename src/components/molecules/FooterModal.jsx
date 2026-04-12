import React from 'react';
import { FiX } from 'react-icons/fi';

export default function FooterModal({ title, children, modalId }) {
  return (
    <dialog id={modalId} className="modal modal-bottom sm:modal-middle overflow-hidden">
      {/* 1. Added 'flex flex-col' and 'max-h-[80vh]' to force scrolling inside */}
      <div className="modal-box p-0 w-11/12 max-w-4xl max-h-[80vh] flex flex-col bg-base-100 shadow-2xl relative">
        
        {/* Header - Isko sticky rakha hai taaki hamesha top par dikhe */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100 sticky top-0 bg-base-100 z-50">
          <h3 className="font-bold text-xl text-gray-800">{title}</h3>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost focus:outline-none">
              <FiX size={24} />
            </button>
          </form>
        </div>

        {/* 2. Content Area - 'flex-grow' aur 'overflow-y-auto' hi isse scrollable banata hai */}
        <div className="flex-grow p-6 overflow-y-auto prose max-w-none bg-white">
          {children}
        </div>

      </div>

    </dialog>
  );
}