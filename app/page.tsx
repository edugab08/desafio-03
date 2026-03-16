"use client"

import { useState } from "react"
import { Plus, Minus, Trash } from "lucide-react"

export default function Page() {

  const [produtos, setProdutos] = useState<any[]>([])
  const [nome, setNome] = useState("")

  function adicionarProduto() {
    if (!nome) return

    setProdutos([
      ...produtos,
      { id: Date.now(), nome, quantidade: 0 }
    ])

    setNome("")
  }

  function aumentar(id:number) {
    setProdutos(produtos.map(p =>
      p.id === id ? { ...p, quantidade: p.quantidade + 1 } : p
    ))
  }

  function diminuir(id:number) {
    setProdutos(produtos.map(p =>
      p.id === id && p.quantidade > 0
        ? { ...p, quantidade: p.quantidade - 1 }
        : p
    ))
  }

  function remover(id:number) {
    setProdutos(produtos.filter(p => p.id !== id))
  }

  return (
    <main className="flex flex-col items-center p-10 gap-6">

      <h1 className="text-3xl font-bold">
        Gerenciador de Estoque
      </h1>

      <div className="flex gap-2">
        <input
          className="border p-2 rounded"
          placeholder="Nome do produto"
          value={nome}
          onChange={(e)=>setNome(e.target.value)}
        />

        <button
          onClick={adicionarProduto}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus size={18}/>
          Adicionar
        </button>
      </div>

      <div className="w-full max-w-md flex flex-col gap-4">

        {produtos.map((p)=>(
          <div
            key={p.id}
            className="border p-4 rounded flex flex-col gap-2 shadow"
          >

            <h2 className="font-semibold">{p.nome}</h2>

            <p>Quantidade: {p.quantidade}</p>

            <div className="flex gap-2">

              <button
                onClick={()=>aumentar(p.id)}
                className="bg-green-500 text-white p-2 rounded"
              >
                <Plus size={16}/>
              </button>

              <button
                onClick={()=>diminuir(p.id)}
                className="bg-yellow-500 text-white p-2 rounded"
              >
                <Minus size={16}/>
              </button>

              <button
                disabled={p.quantidade > 0}
                onClick={()=>remover(p.id)}
                className="bg-red-500 text-white p-2 rounded disabled:bg-gray-400"
              >
                <Trash size={16}/>
              </button>

            </div>

            {p.quantidade < 3 && (
              <p className="text-red-500 font-semibold">
                ⚠ Estoque Baixo
              </p>
            )}

          </div>
        ))}

      </div>

    </main>
  )
}