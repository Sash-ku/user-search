import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HomePage } from './pages/HomePage';
import { UserProfilePage } from './pages/UserProfilePage';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/user/:username" element={<UserProfilePage />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;