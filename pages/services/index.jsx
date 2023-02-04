import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Header, ServiceCard, Splash } from '../../components'
import EnquiryForm from '../../components/EnquiryForm'
import { db } from '../../firebase-config'
import { SERVICES } from '../../utils/constants'

const Services = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(false)

  const getServices = async () => {
    setLoading(true)
    const servicesRef = collection(db, SERVICES)
    const q = query(servicesRef, orderBy('publishedDate'))
    const querySnapshot = await getDocs(q)
    let data = []
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      })
    })

    setServices(data)
    setLoading(false)
  }

  useEffect(() => {
    getServices()
  }, [])

  return (
    <>
      <Head>
        <title>Services - Azrah</title>
        <meta
          name="description"
          content="Azrah Website"
        />
      </Head>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script id="google-analytics-tag" strategy="afterInteractive">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script>
      <div className="bg-gray text-black">
        <Header title="Services" />
        <div className="container mx-auto ">
          {loading ? (
            <Splash />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full px-4 lg:px-0 mb-10">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  imageSrc={service.thumbnail.url}
                  title={service.title}
                  description={service.description}
                  buttonLink={`/services/${service.slug}`}
                />
              ))}
            </div>
          )}
          
        </div>
        <div className="w-full flex justify-center mt-[-2rem] ">
        <EnquiryForm/>
      </div>
      </div>
    </>
  )
}

export default Services
