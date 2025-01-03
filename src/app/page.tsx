"use client"

import Link from "next/link"
import React, { useEffect, useState } from "react"

interface Item {
    id: number
    name: string
    description: string
}

export default function Page() {
    const [items, setItems] = useState<Item[]>([])
    const [formData, setFormData] = useState({
        name: '',
        description: ""
    })

    // POST / CREATE
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await fetch("/api/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        fetchItems()
        setFormData({
            name: "",
            description: ""
        })
    }

    // GET
    const fetchItems = async () => {
        try {
            const response = await fetch("/api/")
            const data = await response.json()
            setItems(data)
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchItems()
    }, [])


    return (
        <div className="p-8 bg-white">
          <h1 className="text-2xl font-bold mb-4">item Management</h1>
          
          {/* Add item Form */}
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex flex-col gap-4 max-w-md">
              <input
                type="text"
                placeholder="item Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border p-2 rounded text-black"
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="border p-2 rounded text-black"
              />
              <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Add item
              </button>
            </div>
          </form>
    
          {/* items List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white">
            {items.map((item) => (
              <div key={item.id} className="border p-4 rounded">
                <h2 className="font-bold">{item.name}</h2>
                <Link href={`/${item.id}`}>
                    <p className="text-black">{item.description}</p>
                </Link>
                {/* <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white p-2 rounded mt-2"
                >
                  Delete
                </button> */}
              </div>
            ))}
          </div>
        </div>
      )
}