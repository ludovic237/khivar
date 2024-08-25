import { useEffect, useState } from 'react';
import axios from "axios";
import { TrashIcon } from "@heroicons/react/16/solid"; // Importation des icônes nécessaires pour les actions.
import TaskModal from "./TaskModal"; // Importation des modales pour la gestion des tâches.
import DeleteModal from './DeleteModal'; // Importation de la modale de suppression.
import '../App.css'; // Feuilles de style principales.
import '../MyDesign.css'; // Feuilles de style supplémentaires.

// Le composant TaskPage gère l'affichage et la manipulation des tâches.
function TaskPage() {
    // État pour stocker les tâches, les tâches filtrées, et divers indicateurs de contrôle d'interface.
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [statusFilter, setStatusFilter] = useState('Tout');
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    // Charger les tâches au montage du composant.
    useEffect(() => {
        fetchTasks();
    }, []);

    // Filtrer les tâches à chaque modification des tâches ou du filtre de statut.
    useEffect(() => {
        filterTasks();
    }, [statusFilter, tasks]);

    // Fonction pour récupérer les tâches depuis l'API.
    const fetchTasks = async () => {
        try {
            const response = await axios.get('/api/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Failed to fetch tasks', error);
        }
    };

    // Fonction pour ajouter ou mettre à jour une tâche.
    const handleSave = async (id, description) => {
        if (id) {
            await updateTask(id, description);
        } else {
            await addTask(description);
        }
        setShowTaskModal(false);
    };

    // Ajouter une tâche via une requête POST.
    const addTask = async (description) => {
        try {
            const response = await axios.post('/api/tasks', {description});
            setTasks([...tasks, response.data]);
        } catch (error) {
            console.error('Failed to add task', error);
        }
    };

    // Mettre à jour une tâche existante via une requête PUT.
    const updateTask = async (id, description) => {
        try {
            const response = await axios.put(`/api/tasks/${id}`, {description});
            setTasks(tasks.map(task => task.id === id ? response.data : task));
        } catch (error) {
            console.error('Failed to update task', error);
        }
    };

    // Supprimer une tâche via une requête DELETE.
    const deleteTask = async (id) => {
        try {
            await axios.delete(`/api/tasks/${id}`);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
            console.error('Failed to delete task', error);
        }
    };

    // Filtrer les tâches en fonction du statut sélectionné.
    const filterTasks = () => {
        if (statusFilter === 'Tout') {
            setFilteredTasks(tasks);
        } else {
            setFilteredTasks(tasks.filter(task => task.status === statusFilter));
        }
    };

    // Fonctions pour ouvrir les modales d'ajout et de modification.
    const openModalToAdd = () => {
        setCurrentTask(null);
        setShowTaskModal(true);
    };

    const openModalToEdit = (task) => {
        setCurrentTask(task);
        setShowTaskModal(true);
    };

    // Rendu du composant avec un tableau de tâches et des boutons pour les actions.
    return (
        <>
            <div className="bg-white px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl">
                    <div className="flex justify-end m-4">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded"
                                onClick={openModalToAdd}>Add Task</button>
                        <select
                            className="ml-2 block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                            <option value="Tout">Tout</option>
                            <option value="Complet">Complet</option>
                            <option value="En attente">En attente</option>
                            <option value="En cours">En cours</option>
                        </select>
                    </div>
                    <div className="overflow-x-auto m-4">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {filteredTasks.map(task => (
                                <tr key={task.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{task.description}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {task.status === 'Complet' ? (
                                            <span
                                                className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">{task.status}</span>
                                        ) : task.status === 'En attente' ? (
                                            <span
                                                className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">{task.status}</span>
                                        ) : task.status === 'En cours' ? (
                                            <span
                                                className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">{task.status}</span>
                                        ) : (
                                            <span>{task.status}</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-indigo-600 hover:text-indigo-900" onClick={() => openModalToEdit(task)}>
                                            Edit
                                        </button>
                                        <button className="text-red-600 hover:text-red-900 ml-4" onClick={() => {
                                            setCurrentTask(task);
                                            setShowDeleteModal(true);
                                        }}>
                                            <TrashIcon className="size-6 text-red-500"></TrashIcon>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <TaskModal
                onClose={() => setShowTaskModal(false)}
                onSave={handleSave}
                task={currentTask}
                showTaskModal={showTaskModal}
                setShowTaskModal={setShowTaskModal}
            />
            {showDeleteModal && <DeleteModal onClose={() => setShowDeleteModal(false)} onDelete={deleteTask} taskId={currentTask?.id} setShowDeleteModal={setShowDeleteModal} showDeleteModal={showDeleteModal}/>}
        </>
    );
}

export default TaskPage;