'use client'

import React, { useState } from 'react';
import { PDFViewer, pdf } from '@react-pdf/renderer';
import { PDFDocument } from '@/components/GenPdf';
import { FileDown } from 'lucide-react';

function App() {
  const [title, setTitle] = useState('Sample Document');
  const [content, setContent] = useState('Enter your content here...');
  const [showPreview, setShowPreview] = useState(false);

  // Função para imprimir o PDF
  const handlePrint = () => {
    const doc = pdf(<PDFDocument title={title} content={content} />);
    doc.toBlob().then((blob) => {
      const url = URL.createObjectURL(blob);
      const iframe = document.createElement('iframe');
      iframe.style.position = 'absolute';
      iframe.style.visibility = 'hidden';
      iframe.src = url;
      document.body.appendChild(iframe);
      iframe.contentWindow.print();
    });
  };

  // Função para baixar o PDF
  const handleDownload = () => {
    const doc = pdf(<PDFDocument title={title} content={content} />);
    doc.toBlob().then((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title}.pdf`; // Nome do arquivo de download
      link.click();
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto flex w-full">
        <div className="w-[50%] bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
            <FileDown className="w-8 h-8" />
            PDF Generator
          </h1>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Document Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>
          </div>
        </div>

        {showPreview && (
          <div className="w-[500px] bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between mb-4">
              <button
                onClick={handlePrint}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                Imprimir
              </button>
              <button
                onClick={handleDownload}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Baixar
              </button>
            </div>
            <div className="border border-gray-300 rounded-md" style={{ height: '600px' }}>
              <PDFViewer width="100%" height="100%" className="rounded-md">
                <PDFDocument title={title} content={content} />
              </PDFViewer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
