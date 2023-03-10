import Script from 'next/script'

const ScheduleConsultation = () => {
  return (
    <>
      <Script src="https://assets.calendly.com/assets/external/widget.js" />
      <div className="bg-white py-10 lg:py-28 px-4 lg:px-0 h-full min-h-screen">
        <div className="container mx-auto">
          <div className="text-center font-title text-4xl mb-10">
            Schedule Free Consultation with Senior Certified Health Coach
          </div>
          <div
            className="calendly-inline-widget w-full h-188 lg:h-160"
            data-url="https://calendly.com/azrawellnessexpert/30min?&hide_gdpr_banner=1"
          />
        </div>
      </div>
    </>
  )
}

export default ScheduleConsultation
