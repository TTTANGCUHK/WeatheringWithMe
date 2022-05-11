import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
function LocationPage() {

    const router = useRouter()
    const { locationid } = router.query

    // HTML + JS section
    return (
      <div>{locationid}</div>
    )
  }
  
  export default LocationPage