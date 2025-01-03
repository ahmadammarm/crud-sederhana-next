"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

interface DetailItemProps {
    id: string
    name: string
    description: string
}

export default function DetailPage() {
    const { id } = useParams()
    const [item, setItem] = useState<DetailItemProps | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchItem = async () => {
        try {
            setLoading(true)
            const response = await fetch(`/api/${id}`)
            const result = await response.json()
            
            // Tambahkan log untuk debugging
            console.log("API Response:", result)
            
            // Pastikan data yang diset sesuai dengan struktur response
            setItem(result)
            // Tidak menggunakan result.data karena tidak mengembalikan data melalui property "data" (langsung)
        } catch(error) {
            console.error("Fetch error:", error)
            setError("Failed to fetch item")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchItem()
    }, [id])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-black">Loading...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-red-500">{error}</p>
            </div>
        )
    }

    if (!item) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-black">Item not found</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
                <h1 className="text-2xl font-bold text-black mb-4">
                    {item.name}
                </h1>
                <p className="text-gray-600">
                    {item.description}
                </p>
                {/* Tambahkan debugging info */}
                <pre className="mt-4 p-4 bg-gray-100 rounded text-black">
                    {JSON.stringify(item, null, 2)}
                </pre>
            </div>
        </div>
    )
}