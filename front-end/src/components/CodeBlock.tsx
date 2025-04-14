'use client'

import React, { useState } from 'react'
import downChevron from "../assets/icons/down-chevron.svg";
import check from "../assets/icons/check.svg";

interface CodeBlockProps {
  code: string
  language?: string
}

export function CodeBlock({ code, language = 'plaintext' }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="relative">
      <pre className={`language-${language} p-4 rounded-lg bg-gray-800 text-white overflow-x-auto`}>
        <code className="text-sm">{code.trim()}</code>
      </pre>
      <button
        className="absolute top-2 right-2 bg-white hover:bg-gray-100"
        onClick={copyToClipboard}
      >
        {isCopied ? <img src={downChevron.src} alt="Previous page" className="text-amber-950 rotate-90" width={26} height={26} />
                  : <img src={check.src} alt="Previous page" className="text-amber-950 rotate-90" width={26} height={26} />
                  }
      </button>
    </div>
  )
}

