'use client'

import { useMemo } from 'react'

interface MapIframeProps {
  address: string
}

export default function MapIframe({ address }: MapIframeProps) {
  const src = useMemo(() => {
    const query = encodeURIComponent(address)
    return `https://www.google.com/maps?q=${query}&output=embed`
  }, [address])

  return (
    <iframe
      title="Localiza\u00e7\u00e3o no mapa"
      src={src}
      className="w-full h-full border-0"
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
    />
  )
}
