import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios, { delayResponse: 1000 }); // Simuler un délai réseau

// Simuler une réponse pour l'authentification
mock.onPost('/api/login').reply(200, {
    user: {
        id: 1,
        name: 'John Doe',
        token: 'fake-jwt-token'
    }
});

// Simuler une réponse pour récupérer les tâches
mock.onGet('/api/tasks').reply(200, [
    { id: 1, description: 'Task 1', status: 'Complet' },
    { id: 1, description: 'Task 2', status: 'En attente' },
    { id: 1, description: 'Task 3', status: 'Complet' },
    { id: 1, description: 'Task 4', status: 'En attente' },
    { id: 1, description: 'Task 5', status: 'En cours' },
    { id: 2, description: 'Task 6', status: 'En cours' }
]);
