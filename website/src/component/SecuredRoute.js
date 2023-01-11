// Composant Guard qui vérifie si l'utilisateur est connecté
function SecuredRoute({ element, ...rest }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const checkAuth = () => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    };

    return (
        <Route {...rest}
            element={
                isAuthenticated
                    ? element
                    : <Login onLogin={checkAuth} />
            }
        />
    );
};

export default SecuredRoute