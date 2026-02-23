import React, { useEffect, useRef, useState } from 'react';
import { DocumentData, initialData, DocumentType } from './types';
import DocumentPreview from './components/DocumentPreview';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, FileText, Image as ImageIcon, Printer, RefreshCw } from 'lucide-react';

function App() {
  const [data, setData] = useState<DocumentData>(initialData);
  const previewRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('exporting', isExporting);
    return () => {
      document.body.classList.remove('exporting');
    };
  }, [isExporting]);

  const capturePreview = async () => {
    const target = previewRef.current;
    if (!target) return null;
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }
    const width = target.scrollWidth;
    const height = target.scrollHeight;
    return html2canvas(target, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      width,
      height,
      windowWidth: width,
      windowHeight: height
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    if (!isNaN(date.getTime())) {
      setData(prev => ({ ...prev, date }));
    }
  };

  const handleTypeChange = (type: DocumentType) => {
    setData(prev => ({ ...prev, type }));
  };

  const exportToImage = async () => {
    if (!previewRef.current) return;
    setIsExporting(true);
    await new Promise(requestAnimationFrame);
    try {
      const canvas = await capturePreview();
      if (!canvas) return;
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
      if (!blob) throw new Error('Không thể tạo ảnh.');
      const imageUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `${data.type}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(imageUrl);
    } catch (error) {
      console.error('Export failed', error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportToPDF = async () => {
    if (!previewRef.current) return;
    setIsExporting(true);
    await new Promise(requestAnimationFrame);
    try {
      const canvas = await capturePreview();
      if (!canvas) return;
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pdfWidth;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
      const offsetY = imgHeight < pdfHeight ? (pdfHeight - imgHeight) / 2 : 0;

      pdf.addImage(imgData, 'PNG', 0, offsetY, imgWidth, Math.min(imgHeight, pdfHeight));
      pdf.save(`${data.type}-${Date.now()}.pdf`);
    } catch (error) {
      console.error('Export failed', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row font-sans text-gray-800">
      {/* Sidebar Controls */}
      <div className="w-full md:w-96 bg-white shadow-xl flex-shrink-0 h-screen overflow-y-auto z-10 border-r border-gray-200">
        <div className="p-6 bg-blue-900 text-white sticky top-0 z-20 shadow-md">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <FileText className="w-6 h-6" /> VietDoc Gen
          </h1>
          <p className="text-blue-200 text-xs mt-1">Tạo giấy tờ hành chính nhanh chóng</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Document Type Selection */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">Loại giấy tờ</label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="showKinhGui"
                  checked={data.showKinhGui}
                  onChange={(e) => setData(prev => ({ ...prev, showKinhGui: e.target.checked }))}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="showKinhGui" className="text-xs text-gray-600">Hiện "Kính gửi"</label>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleTypeChange('giay-cong-tac')}
                className={`px-3 py-2 text-sm rounded-md border transition-colors ${data.type === 'giay-cong-tac' ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium' : 'border-gray-300 hover:bg-gray-50'}`}
              >
                Giấy đi đường
              </button>
              <button
                onClick={() => handleTypeChange('giay-gioi-thieu')}
                className={`px-3 py-2 text-sm rounded-md border transition-colors ${data.type === 'giay-gioi-thieu' ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium' : 'border-gray-300 hover:bg-gray-50'}`}
              >
                Giấy giới thiệu
              </button>
              <button
                onClick={() => handleTypeChange('giay-xac-nhan')}
                className={`px-3 py-2 text-sm rounded-md border transition-colors ${data.type === 'giay-xac-nhan' ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium' : 'border-gray-300 hover:bg-gray-50'}`}
              >
                Giấy xác nhận
              </button>
              <button
                onClick={() => handleTypeChange('giay-nghi-phep')}
                className={`px-3 py-2 text-sm rounded-md border transition-colors ${data.type === 'giay-nghi-phep' ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium' : 'border-gray-300 hover:bg-gray-50'}`}
              >
                Đơn nghỉ phép
              </button>
              <button
                onClick={() => handleTypeChange('giay-de-nghi-tam-ung')}
                className={`px-3 py-2 text-sm rounded-md border transition-colors ${data.type === 'giay-de-nghi-tam-ung' ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium' : 'border-gray-300 hover:bg-gray-50'}`}
              >
                Giấy tạm ứng
              </button>
              <button
                onClick={() => handleTypeChange('giay-de-nghi-thanh-toan')}
                className={`px-3 py-2 text-sm rounded-md border transition-colors ${data.type === 'giay-de-nghi-thanh-toan' ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium' : 'border-gray-300 hover:bg-gray-50'}`}
              >
                Giấy thanh toán
              </button>
              <button
                onClick={() => handleTypeChange('bien-ban-ban-giao')}
                className={`px-3 py-2 text-sm rounded-md border transition-colors ${data.type === 'bien-ban-ban-giao' ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium' : 'border-gray-300 hover:bg-gray-50'}`}
              >
                Biên bản bàn giao
              </button>
              <button
                onClick={() => handleTypeChange('giay-cu-di-cong-tac')}
                className={`px-3 py-2 text-sm rounded-md border transition-colors ${data.type === 'giay-cu-di-cong-tac' ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium' : 'border-gray-300 hover:bg-gray-50'}`}
              >
                Giấy cử đi công tác
              </button>
              <button
                onClick={() => handleTypeChange('giay-yeu-cau-truc')}
                className={`px-3 py-2 text-sm rounded-md border transition-colors ${data.type === 'giay-yeu-cau-truc' ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium' : 'border-gray-300 hover:bg-gray-50'}`}
              >
                Giấy yêu cầu trực
              </button>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Format Selection */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs border border-gray-300">#</span>
              Chọn mẫu (Format)
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((id) => (
                <button
                  key={id}
                  onClick={() => setData(prev => ({ ...prev, formatId: id }))}
                  className={`py-2 text-sm rounded-md border transition-colors ${data.formatId === id ? 'bg-blue-600 text-white border-blue-600 font-bold' : 'bg-white border-gray-300 hover:bg-gray-50 text-gray-700'}`}
                >
                  {id}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs border border-gray-300">1</span>
              Thông tin đơn vị
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Tên đơn vị (Công ty/Cơ quan)</label>
                <input
                  type="text"
                  name="companyName"
                  value={data.companyName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm uppercase"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Mã số thuế</label>
                  <input
                    type="text"
                    name="taxCode"
                    value={data.taxCode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Số văn bản</label>
                  <input
                    type="text"
                    name="documentNumber"
                    value={data.documentNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Địa điểm ký</label>
                  <input
                    type="text"
                    name="location"
                    value={data.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Ngày ký</label>
                  <input
                    type="date"
                    value={data.date.toISOString().split('T')[0]}
                    onChange={handleDateChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Personal Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs border border-gray-300">2</span>
              Thông tin cá nhân
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Họ và tên</label>
                <input
                  type="text"
                  name="fullName"
                  value={data.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm uppercase font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Chức vụ</label>
                <input
                  type="text"
                  name="position"
                  value={data.position}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              
              {data.type === 'giay-gioi-thieu' && (
                <div className="space-y-3 p-3 bg-gray-50 rounded-md border border-gray-200">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">CMND/CCCD</label>
                    <input
                      type="text"
                      name="idCard"
                      value={data.idCard}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Ngày cấp</label>
                      <input
                        type="text"
                        name="idDate"
                        value={data.idDate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Nơi cấp</label>
                      <input
                        type="text"
                        name="idPlace"
                        value={data.idPlace}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Content Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs border border-gray-300">3</span>
              Nội dung công tác
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  {data.type === 'bien-ban-ban-giao' ? 'Bên nhận (Ông/Bà)' : 
                   data.type === 'giay-yeu-cau-truc' ? 'Địa điểm trực' : 
                   data.type === 'giay-cu-di-cong-tac' ? 'Nơi đến công tác' : 'Nơi đến / Đơn vị đến'}
                </label>
                <input
                  type="text"
                  name="destination"
                  value={data.destination}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  disabled={data.type === 'giay-de-nghi-tam-ung' || data.type === 'giay-de-nghi-thanh-toan'}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  {data.type === 'giay-de-nghi-tam-ung' ? 'Lý do tạm ứng' : 
                   data.type === 'giay-de-nghi-thanh-toan' ? 'Nội dung thanh toán' :
                   data.type === 'bien-ban-ban-giao' ? 'Nội dung bàn giao' : 
                   data.type === 'giay-yeu-cau-truc' ? 'Nội dung công việc' : 'Về việc / Lý do'}
                </label>
                <textarea
                  name="reason"
                  value={data.reason}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    {data.type === 'giay-de-nghi-tam-ung' ? 'Ngày hoàn ứng' : 
                     data.type === 'giay-yeu-cau-truc' ? 'Ngày trực / Thời gian' : 'Từ ngày'}
                  </label>
                  <input
                    type="text"
                    name="durationFrom"
                    value={data.durationFrom}
                    onChange={handleInputChange}
                    placeholder="dd/mm/yyyy"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    disabled={data.type === 'giay-de-nghi-tam-ung' || data.type === 'giay-de-nghi-thanh-toan' || data.type === 'bien-ban-ban-giao'}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    {data.type === 'giay-de-nghi-tam-ung' ? 'Thời hạn thanh toán' : 
                     data.type === 'giay-gioi-thieu' ? 'Có giá trị đến' : 
                     data.type === 'giay-yeu-cau-truc' ? 'Ca trực' : 'Đến ngày'}
                  </label>
                  <input
                    type="text"
                    name="durationTo"
                    value={data.durationTo}
                    onChange={handleInputChange}
                    placeholder="dd/mm/yyyy"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    disabled={data.type === 'giay-de-nghi-thanh-toan' || data.type === 'bien-ban-ban-giao'}
                  />
                </div>
              </div>
              
              {(data.type === 'giay-de-nghi-tam-ung' || data.type === 'giay-de-nghi-thanh-toan') && (
                <div className="space-y-3 p-3 bg-yellow-50 rounded-md border border-yellow-200">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Số tiền</label>
                    <input
                      type="text"
                      name="amount"
                      value={data.amount || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Bằng chữ</label>
                    <textarea
                      name="amountInWords"
                      value={data.amountInWords || ''}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Signer Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs border border-gray-300">4</span>
              Người ký & Đóng dấu
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Chức danh người ký</label>
                  <input
                    type="text"
                    name="signerTitle"
                    value={data.signerTitle}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm uppercase"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Tên người ký</label>
                  <input
                    type="text"
                    name="signerName"
                    value={data.signerName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm uppercase font-bold"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="showSeal"
                    checked={data.showSeal}
                    onChange={(e) => setData(prev => ({ ...prev, showSeal: e.target.checked }))}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="showSeal" className="text-sm text-gray-700 font-medium">Đóng dấu đỏ</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="showSignature"
                    checked={data.showSignature}
                    onChange={(e) => setData(prev => ({ ...prev, showSignature: e.target.checked }))}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="showSignature" className="text-sm text-gray-700 font-medium">Ký tên</label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-6 pb-12 text-center text-xs text-gray-400">
            © 2024 VietDoc Gen. All rights reserved.
          </div>
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 bg-gray-100 h-screen overflow-y-auto flex flex-col">
        {/* Toolbar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
          <div className="text-sm text-gray-500">
            Xem trước tài liệu (Khổ A4)
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportToImage}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium shadow-sm disabled:opacity-50"
            >
              {isExporting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
              Xuất Ảnh (PNG)
            </button>
            <button
              onClick={exportToPDF}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm disabled:opacity-50"
            >
              {isExporting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              Xuất PDF
            </button>
          </div>
        </div>

        {/* Preview Canvas */}
        <div className="flex-1 p-8 overflow-auto flex justify-center items-start">
          <div
            data-export-wrapper="true"
            className="transform scale-75 origin-top md:scale-100 transition-transform duration-200"
          >
            <DocumentPreview ref={previewRef} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
