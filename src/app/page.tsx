import DarkmodeToggle from '@/components/DarkmodeToggle'
import FAQ from '@/components/FAQ'
import GoogleSignin from '@/components/GoogleSignin'
import ItemSearch from '@/components/ItemSearch'
import Notifications from '@/components/Notifications'

export default function Home() {
    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Ane</h1>
                <div className="flex justify-end gap-2">
                    <DarkmodeToggle />
                    <GoogleSignin />
                </div>
            </div>
            <ItemSearch />
            <Notifications />
            <FAQ />
        </>
    )
}
