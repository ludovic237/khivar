import { Dialog, DialogTitle, DialogPanel, DialogBackdrop } from '@headlessui/react';
import { useState, useEffect } from 'react';

function TaskModal({ onClose, onSave, task, showTaskModal, setShowTaskModal }) {
    const [description, setDescription] = useState('');

    useEffect(() => {
        // Initialise le champ de description si une tâche est passée pour modification
        setDescription(task ? task.description : '');
    }, [task]);

    const handleSubmit = () => {
        onSave(task ? task.id : null, description);  // Si task est présent, alors on modifie, sinon on ajoute
        onClose();
    };

    return (
        <Dialog open={showTaskModal} onClose={setShowTaskModal} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <DialogTitle as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                    {task ? 'Modifier une tâche' : 'Ajouter une tâche'}
                                </DialogTitle>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Description de la tâche"
                                        className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                // onClick={handleSubmit}
                                onClick={() => setShowTaskModal(false)}
                                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 sm:ml-3 sm:w-auto"
                            >
                                {task ? 'Modifier' : 'Ajouter'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowTaskModal(false)}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-gray-300 px-3 py-2 text-sm font-medium text-black hover:bg-gray-400 sm:mt-0 sm:w-auto"
                            >
                                Annuler
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}

export default TaskModal;