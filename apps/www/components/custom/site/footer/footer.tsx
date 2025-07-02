
import React from 'react'

export default function SiteFooter() {
  return (
    <footer className="w-full py-6 border-t text-center text-sm text-muted-foreground bg-background">
      <span>
        © {new Date().getFullYear()} PREXO AI. All rights reserved.
      </span>
        
    </footer>
  )
}
