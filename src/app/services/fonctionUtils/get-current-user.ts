export function getCurrentUser(): any | null {
    try {
        const userJson = localStorage.getItem('userAuth');
        if (!userJson) return null;

        const userAuth = JSON.parse(userJson);
        const user = userAuth.userInfo;
        // vérifier que certaines propriétés clés existent
        if (user && typeof user === 'object' && 'username' in user && 'active' in user) {
        return user;
        }

        return null;
    } catch (error) {
        console.error('Erreur lors de la lecture de currentUser dans le localStorage:', error);
        return null;
    }
}

