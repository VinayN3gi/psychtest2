'use client'
import React, { useRef, useState } from 'react'
import { MaxWidthWrapper } from '../components/MaxWidthWrapper'
import { Button } from '@/components/ui/button'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import ReportComponent from '../components/ReportComponent'
import ReportComponentPage2 from '../components/ReportComponentPage2'
import ReportComponentPage3 from '../components/ReportComponentPage3'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'


const Page = () => {
  const [loader,setLoader] = useState(false)
  const reportRefPage1=useRef(null)
  const reportRefPage2=useRef(null)
  const reportRefPage3=useRef(null)

  const captureOptions = {
    scale: 3,
    useCORS: true,
    backgroundColor: '#f8fafc',
    onclone: (documentClone: Document) => {
      documentClone
        .querySelectorAll('[data-pdf-solid-text="true"]')
        .forEach((element) => {
          const htmlElement = element as HTMLElement
          htmlElement.style.color = '#2563eb'
          htmlElement.style.backgroundImage = 'none'
          htmlElement.style.webkitTextFillColor = '#2563eb'
        })
    },
  }

  const downloadPDF = async () => {
    const capture = reportRefPage1.current as unknown as HTMLElement;
    setLoader(true)
     try {
      const canvas = await html2canvas(capture, captureOptions)
      const imgData = canvas.toDataURL('image/jpeg',1.0)
      const pdf = new jsPDF('p', 'px', 'a4', true)
      const margin = 15; // Define margin size
      const pageWidth = pdf.internal.pageSize.getWidth() - (margin * 2); 
      const pageHeight = pdf.internal.pageSize.getHeight() - (margin * 2); 
      const width = pageWidth;
      const height = (canvas.height * width) / canvas.width; 
      const finalHeight = height > pageHeight ? pageHeight : height;
      pdf.addImage(imgData, 'JPEG', margin, margin, width, finalHeight, '', 'FAST');

      {/*Adding page two */}


      pdf.addPage()
      const tableCapture = reportRefPage2.current as unknown as HTMLElement;
      const tableCanvas = await html2canvas(tableCapture, captureOptions)
      const tableImgData = tableCanvas.toDataURL('image/jpeg',1.0)
      const widthPage2=pageWidth
      const heightPage2 = (tableCanvas.height * widthPage2) / tableCanvas.width;
      const finalHeightPage2 = heightPage2 > pageHeight ? pageHeight : heightPage2;
      pdf.addImage(tableImgData, 'JPEG', margin, margin, widthPage2, finalHeightPage2, '', 'FAST');
     

      {/*Adding page three */}
      pdf.addPage()
      const tableCapturePage3 = reportRefPage3.current as unknown as HTMLElement;
      const tableCanvasPage3 = await html2canvas(tableCapturePage3, captureOptions)
      const tableImgDataPage3 = tableCanvasPage3.toDataURL('image/jpeg',1.0)
      const widthPage3=pageWidth
      const heightPage3 = (tableCanvasPage3.height * widthPage3) / tableCanvasPage3.width;
      const finalHeightPage3 = heightPage3 > pageHeight ? pageHeight : heightPage3;
      pdf.addImage(tableImgDataPage3, 'JPEG', margin, margin, widthPage3, finalHeightPage3, '', 'FAST');
      



      pdf.save('report.pdf')
    } catch (error) {
      console.log(error)
    } finally {
      setLoader(false)
    }
  }

  return (
    <MaxWidthWrapper className=' mx-auto'>
      <div ref={reportRefPage1}>
      <ReportComponent/>
      </div>

      <div ref={reportRefPage2}>
        <ReportComponentPage2/>
      </div>

       <div ref={reportRefPage3}>
        <ReportComponentPage3/>
       </div>

      <Button className='mt-5 w-full' onClick={downloadPDF}
      disabled={!(loader===false)}
      >
      {
        loader ? 
          <Loader2 className='h-5 w-5 animate-spin' />
         : 'Download Report'
      }
      </Button> 

      <div className=' mt-8 font-serif text-xl '>
        <p>Click to view some <span className=' text-blue-600 font-semibold hover:cursor-pointer hover:underline'>
          <Link href="/careerPage">
            career
          </Link>
          </span> options </p>
      </div>
    </MaxWidthWrapper>
  )
}

export default Page
