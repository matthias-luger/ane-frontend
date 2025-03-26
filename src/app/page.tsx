'use client'

import { Configuration, FilterApi } from '@/_generated/api'
import DarkmodeToggle from '@/components/DarkmodeToggle'
import GoogleSignin from '@/components/GoogleSignin'
import ItemSearch from '@/components/ItemSearch'
import Notifications from '@/components/Notifications'
import { useEffect } from 'react'

export default function Home() {
    useEffect(() => {
        loadData()
    }, [])

    async function loadData() {
        let configuration: Configuration = new Configuration({
            basePath: 'https://ane.coflnet.com'
        })
        const api = new FilterApi(configuration)
        const options = await api.getOptions();
        console.log(options)
    }

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">eBay Search Notifier</h1>
                <div className="flex justify-end gap-2">
                    <DarkmodeToggle />
                    <GoogleSignin />
                </div>
            </div>
            <ItemSearch />
            <Notifications />
        </>
    )
}
