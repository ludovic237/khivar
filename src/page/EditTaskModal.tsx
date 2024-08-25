import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import '../App.css'
import axios from "axios";
import DeleteModal from "./DeleteModal";
import {Dialog, DialogBackdrop, DialogDescription, DialogPanel, DialogTitle} from "@headlessui/react";
import {PlusCircleIcon} from "@heroicons/react/20/solid";

function EditTaskModal({ onClose, onUpdate, task , showEditTaskModal, setEditTaskModal}) {
    const [description, setDescription] = useState(task.description);

    const handleSubmit = () => {
        onUpdate(task.id, description);
        onClose();
    };

    return (
       /* <div className="modal">
            <div className="modal-content">
                <h4>Edit Task</h4>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Task description"
                />
                <button onClick={handleSubmit}>Update Task</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>*/
        <Dialog open={showEditTaskModal} onClose={setEditTaskModal} className="relative z-10">
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
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <PlusCircleIcon aria-hidden="true" className="h-6 w-6 text-green-600" />
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                        Modifier une tache
                                    </DialogTitle>
                                    <div className="mt-2">
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                Nom de la tache
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="taskName"
                                                    name="taskName"
                                                    placeholder="Nom de la tache"
                                                    required
                                                    autoComplete="taskName"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                onClick={() => setEditTaskModal(false)}
                                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                            >
                                Enregister
                            </button>
                            <button
                                type="button"
                                data-autofocus
                                onClick={() => setEditTaskModal(false)}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
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

export default EditTaskModal