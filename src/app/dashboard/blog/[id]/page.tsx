// src/app/blog/[id]/page.tsx
// এটি নিশ্চিত করার জন্য যে ডাইনামিক রুট কাজ করছে।

import React from 'react'; // React import টি নিশ্চিত করুন

interface PageProps {
  params: {
    id: string; 
  };
}

const ConfirmDynamicPage = async ({ params }: PageProps) => {
  const { id } = params;

  // এই লাইনটি আপনার টার্মিনালে id দেখাবে, যদি রুটটি হিট হয়।
  console.log("CONFIRMATION: Dynamic Page Received ID:", id); 

  return (
    <div style={{ 
        padding: '30px', 
        textAlign: 'center', 
        backgroundColor: '#e6ffe6', // হালকা সবুজ ব্যাকগ্রাউন্ড
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        border: '2px solid #28a745', // সবুজ বর্ডার
        borderRadius: '8px'
    }}>
      <h1 style={{ color: '#28a745', fontSize: '2.5em', marginBottom: '15px' }}>
        🚀 অভিনন্দন! এই ডাইনামিক পেজটি লোড হয়েছে।
      </h1>
      <p style={{ fontSize: '1.4em', color: '#333', marginBottom: '20px' }}>
        আপনি URL থেকে এই ID টি পেয়েছেন: <br />
        <strong style={{ color: '#0056b3', wordBreak: 'break-all', fontSize: '1.6em' }}>{id}</strong>
      </p>
      <p style={{ color: '#666', fontSize: '1em' }}>
        আপনার Next.js App Router-এর ডাইনামিক রাউটিং সেটআপ এখন কাজ করছে।
      </p>
    </div>
  );
};

export default ConfirmDynamicPage;