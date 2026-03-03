import TopBar from '@/layouts/TopBar'
import Hero from './components/Hero'

const page = () => {
    return (
        <>
            <TopBar isLight buttonVariant='success' />
            <Hero />
        </>
    )
}

export default page