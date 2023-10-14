import React from 'react'

const Modal = ({ children, closeModal, onSubmit, isConfirm = false }) => {
    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="modal-container p-12 bg-white rounded-lg shadow-lg w-96">
                    {children}

                    <div className="flex justify-end">
                        <button
                            onClick={closeModal}
                            className="bg-gray-400 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                        {!isConfirm && <button
                            onClick={onSubmit}
                            className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
                        >
                            Create
                        </button>}
                        {isConfirm && <button
                            onClick={onSubmit}
                            className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
                        >
                            Confirm 
                        </button>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal
