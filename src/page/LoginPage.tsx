import { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importation de useNavigate pour la redirection après connexion.

// Composant LoginPage pour gérer la connexion des utilisateurs.
function LoginPage() {
    // État local pour stocker les valeurs de l'email et du mot de passe.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialisation de useNavigate.

    // Fonction handleLogin pour gérer le processus de connexion.
    const handleLogin = async () => {
        console.log("email : "+email); // Affichage de l'email pour le débogage.
        console.log("password : "+password); // Affichage du mot de passe pour le débogage.
        try {
            // Tentative de connexion via une requête POST à l'API.
            const response = await axios.post('/api/login', { email, password });
            console.log(response.data); // Affichage des données reçues pour le débogage.

            // Redirection vers la page des tâches après une connexion réussie.
            navigate('/tasks');
        } catch (error) {
            console.error('Erreur de connexion', error); // Gestion des erreurs de connexion.
        }
    };

    // Rendu du formulaire de connexion.
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Your Company"
                    src="https://i.pngimg.me/thumb/f/350/compngwingnlknx.jpg?color=indigo&shade=600"
                    className="mx-auto h-10 w-auto"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Connectez vous a votre compte
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action="#" method="POST" className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Adresse mail
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email" value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                                autoComplete="email"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Mot de passe
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Mot de passe oublie
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={handleLogin}
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Connexion
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;