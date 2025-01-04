"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface DetailItemProps {
    id: string
    name: string
    description: string
}

export default function DetailPage() {
    const { id } = useParams()
    const router = useRouter()
    const [item, setItem] = useState<DetailItemProps | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const fetchItem = async () => {
        try {
            setLoading(true)
            const response = await fetch(`/api/${id}`)
            if (!response.ok) {
                throw new Error('Failed to fetch item')
            }
            const result = await response.json()
            console.log("API Response:", result)
            setItem(result)
        } catch (error) {
            console.error("Fetch error:", error)
            setError("Failed to fetch item")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchItem()
    }, [id])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!item) return

        try {
            setIsSubmitting(true)
            const response = await fetch(`/api/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: item.name,
                    description: item.description
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to update item')
            }

            const updatedItem = await response.json()
            setItem(updatedItem)
            router.refresh()
            alert('Item updated successfully!')
        } catch (error) {
            console.error("Update error:", error)
            setError("Failed to update item")
        } finally {
            setIsSubmitting(false)
        }
    }

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
                <h1 className="text-2xl font-bold text-black mb-4">Edit Item</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            value={item.name}
                            onChange={(e) => setItem({ ...item, name: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline min-h-[100px]"
                            id="description"
                            value={item.description}
                            onChange={(e) => setItem({ ...item, description: e.target.value })}
                            required
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`${isSubmitting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'
                                } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                        >
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                            type="button"
                            onClick={() => router.push('/')}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Back to List
                        </button>
                    </div>
                </form>

                <div className="mt-8 p-4 bg-gray-100 rounded">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Current Data:</h2>
                    <pre className="text-sm text-black">
                        {JSON.stringify(item, null, 2)}
                    </pre>
                </div>
            </div>
        </div>
    )
}