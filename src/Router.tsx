import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home/Index.tsx'
import { History } from './pages/History'
import { DefaltLayout } from './layouts/DefaltLayout'

export function Router() {
    return (
        <Routes>
            <Route path='/' element={<DefaltLayout/>}>
                <Route path="/" element={<Home />} />
                <Route path="/history" element={<History />} />
            </Route>
        </Routes>
    )
}